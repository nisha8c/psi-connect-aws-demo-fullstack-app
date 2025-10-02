import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import AmplifyInit from "@/components/AmplifyInit";
import { AppShell } from "@/components/app-shell/AppShell";
import {Authenticator} from "@aws-amplify/ui-react";

export const metadata: Metadata = {
    title: "PsyConnect App",
    description: "Your sessions, documents, and more",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        {/* ensures Amplify is configured on the client */}
        <AmplifyInit />

        {/* 👇 Protects everything in the (app)/ area */}
        <Authenticator loginMechanisms={['email']} signUpAttributes={['email']}>
            {({ user, signOut }) => (
                <AppShell user={user} signOut={signOut}>
                    {children}
                </AppShell>
            )}
        </Authenticator>
        </body>
        </html>
    );
}
