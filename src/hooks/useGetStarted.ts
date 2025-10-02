// src/hooks/useGetStarted.ts
'use client';

import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useGetStarted = () => {
    const router = useRouter();
    const [isAuthed, setIsAuthed] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                await getCurrentUser();
                setIsAuthed(true);
            } catch {
                setIsAuthed(false);
            }
        })();
    }, []);

    const handleGetStarted = useCallback(() => {
        if (isAuthed) {
            router.push('/dashboard');
        } else {
            // No Hosted UI. We use the built-in Authenticator page.
            router.push('/auth');
        }
    }, [isAuthed, router]);

    return { isAuthed, handleGetStarted };
};
