// src/components/dashboard/AdminDashboard.tsx
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">System overview and management.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Users /> Manage Users</CardTitle></CardHeader>
                    <CardContent>
                        <Link href="/admin/users"><Button className="w-full">Open Users</Button></Link>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Users /> Manage Doctors</CardTitle></CardHeader>
                    <CardContent>
                        <Link href="/admin/doctors"><Button className="w-full">Open Doctors</Button></Link>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Settings /> App Settings</CardTitle></CardHeader>
                    <CardContent>
                        <Link href="/admin/settings"><Button variant="outline" className="w-full">Configure</Button></Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
export default AdminDashboard;
