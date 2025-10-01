// src/components/app-shell/AppShell.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Heart, FileText, Calendar, Users, Settings, Phone, Video,
    Home as HomeIcon, LifeBuoy, DollarSign, HelpCircle, LogOut, LayoutDashboard,
} from "lucide-react";
import {
    SidebarProvider, Sidebar, SidebarContent, SidebarGroup,
    SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarHeader, SidebarFooter, SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { fetchAuthSession, getCurrentUser, signOut } from "aws-amplify/auth";

type Role = "admin" | "doctor" | "user";

type AppUser = {
    full_name?: string;
    role?: Role;
    email?: string;
    avatar_url?: string;
    specialty?: string;
};

const mapGroupsToRole = (groups: string[] | undefined): Role => {
    if (!groups || groups.length === 0) return "user";
    if (groups.includes("admin")) return "admin";
    if (groups.includes("doctor")) return "doctor";
    return "user";
};

const me = async (): Promise<AppUser | null> => {
    try {
        // Throws if not signed in
        await getCurrentUser();
        const { tokens } = await fetchAuthSession();
        const idToken = tokens?.idToken;
        const payload = idToken?.payload ?? {};

        const groups = (payload["cognito:groups"] as string[] | undefined) ?? [];
        return {
            full_name: (payload["name"] as string) || (payload["given_name"] as string),
            email: payload["email"] as string | undefined,
            role: mapGroupsToRole(groups),
            // add your own avatar pipeline if you have one
            avatar_url: undefined,
            specialty: undefined,
        };
    } catch {
        return null;
    }
};

type NavItem = { title: string; url: string; icon: React.ComponentType<{ className?: string }> };

const publicNav: NavItem[] = [
    { title: "Home", url: "/", icon: HomeIcon },
    { title: "Crisis Resources", url: "/crisis", icon: LifeBuoy },
    { title: "Pricing", url: "/pricing", icon: DollarSign },
    { title: "FAQ", url: "/faq", icon: HelpCircle },
];

const patientNav: NavItem[] = [
    { title: "Home", url: "/", icon: HomeIcon },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Start Session", url: "/start-session", icon: Phone },
    { title: "My Documents", url: "/documents", icon: FileText },
    { title: "Appointments", url: "/appointments", icon: Calendar },
];

const doctorNav: NavItem[] = [
    { title: "Home", url: "/", icon: HomeIcon },
    { title: "Dashboard", url: "/doctor/dashboard", icon: LayoutDashboard },
    { title: "My Patients", url: "/doctor/patients", icon: Users },
    { title: "Sessions", url: "/doctor/sessions", icon: Video },
    { title: "Documents", url: "/doctor/documents", icon: FileText },
];

const adminNav: NavItem[] = [
    { title: "Home", url: "/", icon: HomeIcon },
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "Doctors", url: "/admin/doctors", icon: Users },
    { title: "Settings", url: "/admin/settings", icon: Settings },
];

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const [user, setUser] = React.useState<AppUser | null | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            const u = await me();
            setUser(u);
            setLoading(false);
        })();
    }, []);

    const handleLogout = async () => {
        await signOut();
        window.location.assign("/");
    };

    const navItems = React.useMemo(() => {
        if (!user) return publicNav;
        if (user.role === "admin") return adminNav;
        if ((user.email && user.email.includes("doctor")) || user.specialty) return doctorNav;
        return patientNav;
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen grid place-items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    // Not logged in → no sidebar, just render children on gradient bg
    if (!user) {
        return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">{children}</div>;
    }

    // Logged in → full app shell with sidebar
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <Sidebar className="border-r border-white/60 bg-white/80 backdrop-blur-xl">
                    <SidebarHeader className="border-b border-gray-100 p-6">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-xl text-gray-900">PsyHelp</h2>
                                <p className="text-xs text-gray-500">Mental Health Support</p>
                            </div>
                        </Link>
                    </SidebarHeader>

                    <SidebarContent className="p-3">
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {navItems.map(({ title, url, icon: Icon }) => {
                                        const active = pathname === url;
                                        return (
                                            <SidebarMenuItem key={title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className={`transition-all duration-200 rounded-xl mb-1 ${
                                                        active
                                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                                            : "hover:bg-white hover:shadow-md"
                                                    }`}
                                                >
                                                    <Link href={url} className="flex items-center gap-3 px-4 py-3">
                                                        <Icon className="w-5 h-5" />
                                                        <span className="font-medium">{title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-gray-100 p-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 px-2">
                                <Avatar className="w-10 h-10 ring-2 ring-blue-100">
                                    <AvatarImage src={user?.avatar_url || ""} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                                        {user?.full_name?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm truncate">{user?.full_name || "User"}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.role || "user"}</p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white/80 backdrop-blur-xl border-b border-white/60 px-6 py-4 md:hidden">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors" />
                            <h1 className="text-xl font-bold text-gray-900">PsyHelp</h1>
                        </div>
                    </header>
                    <div className="flex-1 overflow-auto">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    );
};
