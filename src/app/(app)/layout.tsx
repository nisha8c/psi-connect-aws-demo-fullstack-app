import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import AmplifyInit from "@/components/AmplifyInit";
import { AppShell } from "@/components/app-shell/AppShell";

export const metadata: Metadata = {
    title: "PsyConnect App",
    description: "Your sessions, documents, and more",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AmplifyInit />
        <AppShell>{children}</AppShell>
        </body>
        </html>
    );
}
