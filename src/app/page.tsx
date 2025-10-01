"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Heart, Shield, Clock, Users, Video, MessageSquare, Phone, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetStarted } from "@/hooks/useGetStarted";
// or inline the hook right here if you prefer

const Home: React.FC = () => {
    const { handleGetStarted } = useGetStarted();

    const features = [
        { icon: Video, title: "Video Sessions", description: "Connect face-to-face with licensed therapists from anywhere", color: "from-blue-500 to-blue-600" },
        { icon: Phone, title: "Audio Calls", description: "Speak with a counselor when you need immediate support", color: "from-purple-500 to-purple-600" },
        { icon: MessageSquare, title: "Secure Messaging", description: "Chat with your therapist anytime between sessions", color: "from-green-500 to-green-600" },
        { icon: Shield, title: "100% Confidential", description: "Your privacy is our priority with end-to-end encryption", color: "from-indigo-500 to-indigo-600" },
        { icon: Clock, title: "24/7 Availability", description: "Get help when you need it, day or night", color: "from-pink-500 to-pink-600" },
        { icon: Users, title: "Licensed Professionals", description: "Connect with verified, experienced mental health experts", color: "from-orange-500 to-orange-600" },
    ];

    const stats = [
        { value: "10K+", label: "Happy Patients" },
        { value: "500+", label: "Licensed Therapists" },
        { value: "50K+", label: "Sessions Completed" },
        { value: "4.9", label: "Average Rating" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Hero */}
            <section className="relative overflow-hidden py-24 px-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-60" />
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob" />
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000" />
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000" />
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }} className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium text-gray-700">
                Professional Mental Health Support
              </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Your Mental Health
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Matters
              </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Connect with licensed therapists through video, audio, or chat. Get the support you need, whenever you need it.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={handleGetStarted}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                Get Started Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <Link href="/crisis">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="px-8 py-6 text-lg rounded-2xl border-2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
                                >
                                    Crisis Resources
                                    <Shield className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center bg-white/70 backdrop-blur rounded-xl p-6 shadow"
                        >
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How We Help You</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Multiple ways to connect with mental health professionals
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                                    <div className="p-8">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 shadow-lg`}>
                                            <f.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{f.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple Steps to Support</h2>
                        <p className="text-xl text-gray-600">Getting help has never been easier</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Sign Up", desc: "Create your secure account in minutes" },
                            { step: "2", title: "Choose How to Connect", desc: "Select video, audio, or chat based on your comfort" },
                            { step: "3", title: "Start Your Session", desc: "Connect with a licensed professional immediately" },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="text-center bg-white/70 backdrop-blur rounded-2xl p-8 shadow">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-xl">
                                        {item.step}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl overflow-hidden rounded-2xl">
                            <div className="p-8 md:p-12 text-center text-white">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
                                <p className="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
                                    Join thousands who have found the support they need. Your first session is just a click away.
                                </p>
                                <div className="flex justify-center">
                                    <Button
                                        size="lg"
                                        onClick={handleGetStarted}
                                        className="bg-white text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
                                    >
                                        Start Your First Session
                                        <Heart className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* page-local styles */}
            <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
        </div>
    );
};

export default Home;
