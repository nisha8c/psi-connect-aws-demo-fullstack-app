"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users,
    Calendar,
    FileText,
    Phone,
    Video,
    MessageSquare,
    Clock,
    AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SessionLite = {
    id: string;
    session_type: "video" | "audio" | "chat";
    status: "pending" | "in_progress" | "completed" | "cancelled";
    created_date: string | number | Date;
};

type Stats = {
    patients: number;
    todaySessions: number;
    pendingSessions: number;
    callbackRequests: number;
};

const DoctorDashboard: React.FC = () => {
    const [doctorName, setDoctorName] = React.useState<string | null>(null);
    const [stats, setStats] = React.useState<Stats>({
        patients: 0,
        todaySessions: 0,
        pendingSessions: 0,
        callbackRequests: 0,
    });
    const [recentSessions, setRecentSessions] = React.useState<SessionLite[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // TODO: Replace this block with your real data calls (AppSync/GraphQL/etc.)


        const timer = setTimeout(() => {
            setDoctorName("Amelia Carter");
            setStats({
                patients: 42,
                todaySessions: 4,
                pendingSessions: 2,
                callbackRequests: 3,
            });
            setRecentSessions([
                {
                    id: "s1",
                    session_type: "video",
                    status: "completed",
                    created_date: new Date(),
                },
                {
                    id: "s2",
                    session_type: "audio",
                    status: "in_progress",
                    created_date: new Date(),
                },
                {
                    id: "s3",
                    session_type: "chat",
                    status: "pending",
                    created_date: new Date(),
                },
            ]);
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const statCards = [
        {
            title: "Today's Sessions",
            value: stats.todaySessions,
            icon: Calendar,
            color: "from-blue-500 to-blue-600",
            href: "/doctor/sessions",
        },
        {
            title: "Pending Sessions",
            value: stats.pendingSessions,
            icon: Clock,
            color: "from-purple-500 to-purple-600",
            href: "/doctor/sessions",
        },
        {
            title: "My Patients",
            value: stats.patients,
            icon: Users,
            color: "from-green-500 to-green-600",
            href: "/doctor/patients",
        },
        {
            title: "Callback Requests",
            value: stats.callbackRequests,
            icon: Phone,
            color: "from-orange-500 to-orange-600",
            href: "/doctor/sessions",
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Welcome, Dr. {doctorName?.split(" ")[0] ?? "User"}
                    </h1>
                    <p className="text-gray-600">Here&apos;s your practice overview</p>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
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

                {/* Recent & Quick Actions */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Sessions */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    Recent Sessions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentSessions.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentSessions.map((session) => {
                                            const Icon =
                                                session.session_type === "video"
                                                    ? Video
                                                    : session.session_type === "audio"
                                                        ? Phone
                                                        : MessageSquare;
                                            return (
                                                <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <Icon className="w-5 h-5 text-gray-400" />
                                                            <div>
                                                                <p className="font-medium text-gray-900 capitalize">
                                                                    {session.session_type} Session
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {new Date(session.created_date).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                session.status === "completed"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : session.status === "in_progress"
                                                                        ? "bg-blue-100 text-blue-800"
                                                                        : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {session.status}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-center py-8">No sessions yet</p>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Actions (gradient card) */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl text-white">
                            <CardContent className="p-8">
                                <AlertCircle className="w-12 h-12 mb-4 opacity-90" />
                                <h3 className="text-2xl font-bold mb-2">Quick Actions</h3>
                                <p className="text-blue-50 mb-6">Access your most used features</p>
                                <div className="space-y-3">
                                    <Link href="/doctor/patients">
                                        <Button variant="secondary" className="w-full justify-start">
                                            <Users className="mr-2 w-4 h-4" />
                                            View Patients
                                        </Button>
                                    </Link>
                                    <Link href="/doctor/documents">
                                        <Button variant="secondary" className="w-full justify-start">
                                            <FileText className="mr-2 w-4 h-4" />
                                            Manage Documents
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
