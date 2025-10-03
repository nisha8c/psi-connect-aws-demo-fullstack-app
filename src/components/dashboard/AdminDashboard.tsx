"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users,
    FileText,
    Calendar,
    TrendingUp,
    UserCheck,
    Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// If you have data APIs, import & use them here.
// import { User, Session, Document } from "@/api/entities";

type AdminStats = {
    totalUsers: number;
    totalDoctors: number;
    totalSessions: number;
    totalDocuments: number;
    activeSessions: number;
};

const AdminDashboard: React.FC = () => {
    //const [admin /* , setAdmin */] = React.useState<any>(null);
    const [stats, setStats] = React.useState<AdminStats>({
        totalUsers: 0,
        totalDoctors: 0,
        totalSessions: 0,
        totalDocuments: 0,
        activeSessions: 0,
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // TODO: Replace with your real data calls (AppSync/GraphQL/etc.)
        // Example (Base44 style):
        // const currentAdmin = await User.me();
        // const allUsers = await User.list();
        // const doctors = allUsers.filter(u => u.specialty || u.email.includes("doctor"));
        // const patients = allUsers.filter(u => u.role === "user" || (!u.role && !u.specialty));
        // const allSessions = await Session.list();
        // const active = allSessions.filter(s => s.status === "in_progress");
        // const allDocs = await Document.list();
        // setAdmin(currentAdmin);
        // setStats({
        //   totalUsers: patients.length,
        //   totalDoctors: doctors.length,
        //   totalSessions: allSessions.length,
        //   totalDocuments: allDocs.length,
        //   activeSessions: active.length,
        // });

        // For now, demo values:
        const timer = setTimeout(() => {
            setStats({
                totalUsers: 1248,
                totalDoctors: 56,
                totalSessions: 2410,
                totalDocuments: 783,
                activeSessions: 17,
            });
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const statCards = [
        {
            title: "Total Patients",
            value: stats.totalUsers,
            icon: Users,
            color: "from-blue-500 to-blue-600",
            href: "/admin/users",
        },
        {
            title: "Total Doctors",
            value: stats.totalDoctors,
            icon: UserCheck,
            color: "from-purple-500 to-purple-600",
            href: "/admin/doctors",
        },
        {
            title: "Active Sessions",
            value: stats.activeSessions,
            icon: Activity,
            color: "from-green-500 to-green-600",
            href: "/admin/sessions",
        },
        {
            title: "Total Sessions",
            value: stats.totalSessions,
            icon: Calendar,
            color: "from-orange-500 to-orange-600",
            href: "/admin/sessions",
        },
        {
            title: "Documents",
            value: stats.totalDocuments,
            icon: FileText,
            color: "from-pink-500 to-pink-600",
            href: "/admin/documents",
        },
        {
            title: "Growth",
            value: "+12%",
            icon: TrendingUp,
            color: "from-indigo-500 to-indigo-600",
            href: "/admin/analytics",
        },
    ] as const;

    if (loading) {
        return (
            <div className="min-h-[60vh] grid place-items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Platform overview and management</p>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={stat.href}>
                                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div
                                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                                            >
                                                <stat.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900">
                                                {stat.value}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 font-medium">{stat.title}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
