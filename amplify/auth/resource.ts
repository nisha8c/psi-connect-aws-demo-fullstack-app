// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
    loginWith: { email: true },
    groups: ['admin', 'doctor', 'user'],
});
