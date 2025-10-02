// src/components/dashboard/DoctorDashboard.tsx
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DoctorDashboard = () => {
    // TODO: bind to your GraphQL: today's queue, next appointments, quick links
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
                <p className="text-gray-600">Manage today’s patients, sessions, and documents.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Users /> Today’s Queue</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No patients queued.</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Calendar /> Upcoming Appointments</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
                        <Link href="/appointments"><Button variant="outline" className="mt-4 w-full">View schedule</Button></Link>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Video /> Start a Session</CardTitle></CardHeader>
                    <CardContent>
                        <Link href="/doctor/sessions">
                            <Button className="w-full">Open Sessions Console</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
export default DoctorDashboard;
