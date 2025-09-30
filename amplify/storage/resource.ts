// amplify/storage/resource.ts
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'psyhelpStorage',
    access: (allow) => ({
        // Public (avoid PHI) — guests can read; admins can fully manage
        'public/*': [
            allow.guest.to(['read']),
            allow.groups(['admin']).to(['read', 'write', 'delete']),
        ],

        // Identity-scoped areas (entity_id must be right before /*)
        'user/documents/{entity_id}/*': [
            allow.entity('identity').to(['read', 'write', 'delete']),
            allow.groups(['admin']).to(['read', 'write', 'delete']),
        ],
        'user/exports/notes/{entity_id}/*': [
            allow.entity('identity').to(['read', 'write', 'delete']),
            allow.groups(['admin']).to(['read', 'write', 'delete']),
        ],
        'doctor/uploads/{entity_id}/*': [
            allow.entity('identity').to(['read', 'write', 'delete']),
            allow.groups(['admin']).to(['read', 'write', 'delete']),
        ],

        // Server-mediated areas (use presigned URLs via your API)
        'sessions/*': [allow.groups(['admin']).to(['read', 'write', 'delete'])],
        'callbacks/*': [allow.groups(['admin']).to(['read', 'write', 'delete'])],

        // Quarantine (admin only)
        'quarantine/*': [allow.groups(['admin']).to(['read', 'write', 'delete'])],

        // IMPORTANT: do NOT add 'user/*' or 'doctor/*' catch-alls here,
        // because they'd be prefixes of the {entity_id}-scoped paths above.
    }),
});
