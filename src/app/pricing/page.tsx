"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type Plan = {
    name: string;
    price: string;
    description: string;
    features: string[];
    color: string;
    popular?: boolean; // <- optional
};

export default function Pricing() {
    const plans: Plan[] = [
        {
            name: "Basic",
            price: "49",
            description: "Perfect for individuals seeking occasional support",
            features: [
                "2 sessions per month",
                "Text chat support",
                "Secure document storage",
                "Crisis resources access",
                "Basic progress tracking",
            ],
            color: "from-blue-400 to-blue-600",
        },
        {
            name: "Standard",
            price: "99",
            description: "Most popular for regular therapy sessions",
            features: [
                "4 sessions per month",
                "Video, audio & text options",
                "Priority scheduling",
                "Unlimited document storage",
                "Progress tracking & insights",
                "Between-session messaging",
            ],
            popular: true, // <-- now OK
            color: "from-purple-400 to-purple-600",
        },
        {
            name: "Premium",
            price: "199",
            description: "Comprehensive care for intensive support",
            features: [
                "8 sessions per month",
                "All communication methods",
                "Immediate scheduling",
                "Dedicated therapist",
                "Advanced analytics",
                "Family session options",
                "24/7 crisis support",
            ],
            color: "from-pink-400 to-pink-600",
        },
    ];

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Affordable mental health care that fits your needs and budget
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                className={`relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                                    plan.popular ? "ring-4 ring-purple-300 scale-105" : ""
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader className="text-center pt-8">
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                                    >
                                        <span className="text-2xl font-bold text-white">{plan.name[0]}</span>
                                    </div>
                                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                                        <span className="text-gray-600">/month</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white shadow-lg`} size="lg">
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl">
                        <CardContent className="p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">All Plans Include</h2>
                            <div className="grid md:grid-cols-4 gap-6 mt-8">
                                {["Licensed Professionals", "HIPAA Compliant", "Cancel Anytime", "Money-Back Guarantee"].map(
                                    (item, idx) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            <CheckCircle className="w-8 h-8 mb-2" />
                                            <p className="font-medium">{item}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
