import React from 'react';

import { Users, Zap, ShieldCheck, Trophy } from 'lucide-react';


const HomeFooter = () => {
    const features = [
        {
            id: 1,
            icon: <Users className="w-6 h-6 text-purple-600" />,
            iconBg: "bg-purple-100",
            title: "Community Driven",
            description: "Collaborate and get feedback from creators."
        },
        {
            id: 2,

            icon: <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />,
            iconBg: "bg-amber-50",
            title: "Validate Faster",
            description: "Test and improve ideas with real insights."
        },
        {
            id: 3,
            icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
            iconBg: "bg-emerald-50",
            title: "Secure & Trusted",
            description: "Your ideas are safe and respected here."
        },
        {
            id: 4,
            icon: <Trophy className="w-6 h-6 text-orange-500" />,
            iconBg: "bg-orange-50",
            title: "Build the Future",
            description: "Turn ideas into impactful startups together."
        }
    ];

    return (
        <div className="container mx-auto p-6">

            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">


                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Why IdeaVault?
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div key={feature.id} className="flex items-start gap-4">


                            <div className={`flex-shrink-0 p-3 rounded-xl ${feature.iconBg}`}>
                                {feature.icon}
                            </div>


                            <div className="flex flex-col gap-1">
                                <h3 className="text-base font-semibold text-gray-900 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HomeFooter;