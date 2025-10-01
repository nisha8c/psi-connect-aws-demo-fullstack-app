"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Heart, AlertTriangle, Clock, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Crisis: React.FC = () => {
    const emergencyContacts: Array<{
        name: string;
        phone: string;
        available: string;
        description: string;
        color: string;
    }> = [
        {
            name: "National Suicide Prevention Lifeline",
            phone: "988",
            available: "24/7",
            description: "Free and confidential support for people in distress",
            color: "from-red-500 to-red-600",
        },
        {
            name: "Crisis Text Line",
            phone: "Text HOME to 741741",
            available: "24/7",
            description: "Free crisis counseling via text message",
            color: "from-blue-500 to-blue-600",
        },
        {
            name: "SAMHSA National Helpline",
            phone: "1-800-662-4357",
            available: "24/7",
            description: "Treatment referral and information service",
            color: "from-purple-500 to-purple-600",
        },
        {
            name: "Veterans Crisis Line",
            phone: "1-800-273-8255 (Press 1)",
            available: "24/7",
            description: "Support for veterans and their families",
            color: "from-green-500 to-green-600",
        },
    ];

    const selfCareResources: Array<{
        title: string;
        description: string;
        icon: React.ComponentType<{ className?: string }>;
    }> = [
        {
            title: "Breathing Exercises",
            description: "Practice deep breathing to calm your nervous system",
            icon: Heart,
        },
        {
            title: "Grounding Techniques",
            description: "Use your senses to connect with the present moment",
            icon: Shield,
        },
        {
            title: "Reach Out",
            description: "Contact a trusted friend or family member",
            icon: MessageSquare,
        },
        {
            title: "Safety Plan",
            description: "Create a personalized crisis response plan",
            icon: Clock,
        },
    ];

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Alert Banner */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                    <AlertTriangle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-red-900 mb-2">If you are in immediate danger</h3>
                                    <p className="text-red-800 mb-4">
                                        Please call 911 or go to your nearest emergency room. Your safety is the top priority.
                                    </p>
                                    <Button
                                        size="lg"
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                        onClick={() => (window.location.href = "tel:911")}
                                    >
                                        <Phone className="mr-2 w-5 h-5" />
                                        Call 911 Now
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Crisis Resources</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        You are not alone. Help is available 24/7. Reach out to trained professionals who care.
                    </p>
                </motion.div>

                {/* Emergency Contacts */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Immediate Support Lines</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {emergencyContacts.map((contact, index) => (
                            <motion.div
                                key={contact.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <CardHeader>
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center mb-4`}
                                        >
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">{contact.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">{contact.phone}</div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-medium">{contact.available}</span>
                                            </div>
                                            <p className="text-gray-600">{contact.description}</p>
                                            <Button
                                                className={`w-full bg-gradient-to-r ${contact.color} hover:opacity-90 text-white`}
                                                onClick={() => {
                                                    const tel = contact.phone.replace(/[^0-9]/g, "");
                                                    if (tel) window.location.href = `tel:${tel}`;
                                                }}
                                            >
                                                Call Now
                                                <Phone className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Self-Care Resources */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Immediate Coping Strategies</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {selfCareResources.map((resource, index) => {
                            const Icon = resource.icon;
                            return (
                                <motion.div
                                    key={resource.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center mx-auto mb-4">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                                            <p className="text-sm text-gray-600">{resource.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Resources */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl">
                        <CardContent className="p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
                            <p className="text-blue-50 mb-8 max-w-2xl mx-auto text-lg">
                                Find more mental health resources, support groups, and educational materials
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                                    Find Support Groups
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                                    Mental Health Education
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                                    Wellness Resources
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Crisis;
