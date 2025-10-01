"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "How do I start a therapy session?",
            answer:
                "Simply log in to your account, go to 'Start Session', and choose your preferred communication method (video, audio, or chat). You'll be connected with a licensed therapist based on availability.",
        },
        {
            question: "Are my sessions confidential?",
            answer:
                "Absolutely. All sessions are 100% confidential and HIPAA compliant. We use end-to-end encryption to protect your privacy and personal information.",
        },
        {
            question: "What if wait times are long?",
            answer:
                "If wait times are longer than expected, you'll have the option to request a callback or switch to text chat. We'll notify you when a therapist becomes available.",
        },
        {
            question: "Can I choose my therapist?",
            answer:
                "Premium plan members can request a dedicated therapist. For other plans, we match you with licensed professionals based on availability and your needs.",
        },
        {
            question: "How are documents handled?",
            answer:
                "All documents are stored securely with encryption. You can upload, view, and share documents with your therapist. Only authorized healthcare providers have access.",
        },
        {
            question: "What happens in a crisis?",
            answer:
                "For immediate crises, please call 911 or visit your nearest emergency room. We also provide 24/7 access to crisis hotlines through our Crisis Resources page.",
        },
        {
            question: "Can I cancel my subscription?",
            answer:
                "Yes, you can cancel anytime with no penalties. Your access continues until the end of your current billing period.",
        },
        {
            question: "Do you accept insurance?",
            answer:
                "We're working on insurance partnerships. Currently, we offer affordable self-pay options with superbills available for reimbursement from your insurance provider.",
        },
    ] as const;

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-600">Everything you need to know about PsyHelp</p>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-900">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl">
                        <CardContent className="p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                            <p className="text-blue-50 text-lg mb-6">Our support team is here to help you</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium transition-colors">
                                    Contact Support
                                </button>
                                <button className="bg-blue-700 hover:bg-blue-800 px-8 py-3 rounded-xl font-medium transition-colors">
                                    Schedule a Demo
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
