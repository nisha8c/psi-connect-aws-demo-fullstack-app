// src/components/AmplifyInit.tsx
'use client';

import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';

// guard against double config
let configured = false;

export default function AmplifyInit() {
    useEffect(() => {
        if (configured) return;

        (async () => {
            try {
                // 👇 type the import instead of `any`
                const mod: { default?: unknown } = await import('../../amplify_outputs.json');
                const outputs = (mod.default ?? mod) as Record<string, unknown>;

                Amplify.configure(outputs);
                configured = true;
            } catch (err) {
                console.error('Amplify init failed', err);
            }
        })();
    }, []);

    return null;
}
