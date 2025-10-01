"use client";

import { getCurrentUser, signInWithRedirect } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

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

    const handleGetStarted = useCallback(async () => {
        if (isAuthed) {
            router.push("/dashboard");
        } else {
            try {
                await signInWithRedirect();
            } catch (e) {
                console.error("signInWithRedirect failed", e);
            }
        }
    }, [isAuthed, router]);

    return { isAuthed, handleGetStarted };
};
