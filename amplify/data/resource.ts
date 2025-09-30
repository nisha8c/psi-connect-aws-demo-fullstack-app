// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// ----- Enums -----
const schema = a.schema({
    DocumentCategory: a.enum([
        'assessment',
        'treatment_plan',
        'prescription',
        'lab_results',
        'consent_form',
        'other',
    ]),
    SessionType: a.enum(['chat', 'audio', 'video']),
    SessionStatus: a.enum(['pending', 'in_progress', 'completed', 'cancelled']),
    CallbackStatus: a.enum(['pending', 'scheduled', 'completed', 'cancelled']),
    CallbackPriority: a.enum(['low', 'medium', 'high', 'urgent']),

    // ----- Models -----

    PatientNote: a
        .model({
            patient_id: a.string().required(),
            doctor_id: a.string().required(),
            title: a.string().required(),
            content: a.string().required(),
            session_date: a.date(),
            is_confidential: a.boolean().default(true),
            tags: a.string().array(),
            // owner field lets us do owner-based rules easily if you want
            owner: a.string(), // (optional) Cognito sub of creator
        })
        .authorization((allow) => [
            // Admin full
            allow.groups(['admin']),
            // Doctors can create/read/update their own notes and read notes for patients they treat.
            // If you want strict owner-only, use allow.owner() and set owner on create.
            allow.groups(['doctor']).to(['read', 'create', 'update']),
            // Patients can read their own notes if you add an owner relationship and enforce it in resolvers/functions.
            // Uncomment if desired:
            // allow.owner().to(['read']),
        ]),

    Document: a
        .model({
            title: a.string().required(),
            file_url: a.string().required(),
            file_type: a.string(),
            file_size: a.integer(),
            owner_id: a.string().required(),
            uploaded_by_doctor_id: a.string(),
            patient_id: a.string(),
            shared_with: a.string().array(),
            category: a.ref('DocumentCategory'),
            description: a.string(),
            is_private: a.boolean().default(true),
        })
        .authorization((allow) => [
            allow.groups(['admin']),
            // Owner can CRUD own documents
            // If you want strict owner rules via owner field, add an owner attribute and use allow.owner().
            allow.groups(['user', 'doctor']).to(['read', 'create', 'update']),
        ]),

    Session: a
        .model({
            patient_id: a.string().required(),
            doctor_id: a.string(),
            session_type: a.ref('SessionType').required(),
            status: a.ref('SessionStatus'),
            started_at: a.datetime(),
            ended_at: a.datetime(),
            duration_minutes: a.integer(),
            queue_position: a.integer(),
            estimated_wait_time: a.integer(),
            notes: a.string(),
        })
        .authorization((allow) => [
            allow.groups(['admin']),
            allow.groups(['doctor']).to(['read', 'create', 'update']),
            allow.groups(['user']).to(['read', 'create']),
        ]),

    CallbackRequest: a
        .model({
            patient_id: a.string().required(),
            phone_number: a.string().required(),
            preferred_time: a.datetime(),
            reason: a.string(),
            status: a.ref('CallbackStatus'),
            assigned_doctor_id: a.string(),
            priority: a.ref('CallbackPriority'),
        })
        .authorization((allow) => [
            allow.groups(['admin']),
            allow.groups(['doctor']).to(['read', 'update']),
            allow.groups(['user']).to(['read', 'create', 'update']),
        ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        // Switch default to userPool to avoid deprecated IAM/guest paths
        defaultAuthorizationMode: 'userPool',
        // (Optional) also support identityPool for specific public use-cases:
        // additionalAuthorizationModes: ['identityPool'],
    },
});
