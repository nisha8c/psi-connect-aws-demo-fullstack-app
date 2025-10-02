"use client";

import * as React from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";
import PatientDashboard from "@/components/dashboard/PatientDashboard";

// lightweight role helper (same logic as AppShell)
type Role = "admin" | "doctor" | "user";
const mapGroupsToRole = (groups?: string[]): Role => {
    if (!groups?.length) return "user";
    if (groups.includes("admin")) return "admin";
    if (groups.includes("doctor")) return "doctor";
    return "user";
};

const DashboardPage = () => {
    const [role, setRole] = React.useState<Role | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                // throws if not signed in (but this page is inside (app) shell anyway)
                await getCurrentUser();
                const { tokens } = await fetchAuthSession();
                const payload = tokens?.idToken?.payload ?? {};
                const groups = (payload["cognito:groups"] as string[] | undefined) ?? [];
                setRole(mapGroupsToRole(groups));
            } catch {
                setRole("user");
            }
        })();
    }, []);

    if (!role) {
        return (
            <div className="min-h-[60vh] grid place-items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    switch (role) {
        case "admin":
            return <AdminDashboard />;
        case "doctor":
            return <DoctorDashboard />;
        default:
            return <PatientDashboard />;
    }
}
export default DashboardPage;
