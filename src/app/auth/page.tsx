// src/app/auth/page.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator } from '@aws-amplify/ui-react';


const RedirectToDashboard = () => {
    const router = useRouter();
    React.useEffect(() => {
        router.replace('/dashboard');
    }, [router]);
    return (
        <div className="text-center text-sm text-muted-foreground">
            Redirecting to your dashboard…
        </div>
    );
}

const AuthPage = () => {

    return (
        <div className="min-h-screen grid place-items-center p-6">
            <div className="w-full max-w-md">
                <Authenticator
                    // optional: tweak which fields are shown
                    loginMechanisms={['email']}
                    signUpAttributes={['email']}
                    // when user signs in, send them to dashboard
                    // (Authenticator renders children only when signed in)
                >
                    {({ user }) => (
                        // Always return a ReactElement
                        <>
                            {/* This fragment renders only when signed in.
                                When signed out, Authenticator shows its own UI */}
                            {user && <RedirectToDashboard />}
                        </>
                    )}
                </Authenticator>
            </div>
        </div>
    );
}
export default AuthPage;
