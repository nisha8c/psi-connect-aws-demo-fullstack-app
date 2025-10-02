// src/components/dashboard/PatientDashboard.tsx
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, Video, MessageSquare, FileText, Calendar, Heart, Clock } from "lucide-react";

const PatientDashboard = () => {
    // TODO: wire to your API (Sessions, Documents)
    const sessions: Array<{ id: string; session_type: string; status: string; createdAt: string }> = [];
    const documents: Array<{ id: string; title: string; createdAt: string }> = [];

    const quickActions = [
        { title: "Video Call", desc: "Start a video session", icon: Video, color: "from-blue-500 to-blue-600", href: "/start-session" },
        { title: "Audio Call", desc: "Connect via phone", icon: Phone, color: "from-purple-500 to-purple-600", href: "/start-session" },
        { title: "Chat", desc: "Send a message", icon: MessageSquare, color: "from-green-500 to-green-600", href: "/start-session" },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-600">How are you feeling today?</p>
                </div>
            </div>

            {/* Quick actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                {quickActions.map((a) => (
                    <Link key={a.title} href={a.href}>
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <a.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{a.title}</h3>
                                <p className="text-gray-600">{a.desc}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Sessions */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            Recent Sessions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {sessions.length ? (
                            <div className="space-y-3">
                                {sessions.map((s) => (
                                    <div key={s.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900 capitalize">{s.session_type} Session</p>
                                            <p className="text-sm text-gray-600">{new Date(s.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{s.status}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-8">No sessions yet</p>
                        )}
                        <Link href="/appointments">
                            <Button variant="outline" className="w-full mt-4">View All Sessions</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Documents */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-500" />
                            My Documents
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {documents.length ? (
                            <div className="space-y-3">
                                {documents.map((d) => (
                                    <div key={d.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{d.title}</p>
                                            <p className="text-sm text-gray-600">{new Date(d.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <FileText className="w-5 h-5 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-8">No documents yet</p>
                        )}
                        <Link href="/documents">
                            <Button variant="outline" className="w-full mt-4">View All Documents</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
export default PatientDashboard;
