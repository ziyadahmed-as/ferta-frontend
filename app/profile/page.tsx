"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { UserCircle, Mail, MapPin, Calendar, Edit, Shield } from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) return <div className="h-screen flex items-center justify-center font-black">IDENTITY_REQUIRED_PROTOCOL</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-28 px-6 pb-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 mb-16 px-8 py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-[4rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] -z-1 group-hover:scale-150 transition-all duration-1000" />
                    
                    <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-xl shadow-indigo-600/20 group-hover:rotate-6 transition-all">
                        {user.username?.[0].toUpperCase()}
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                           <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter italic">{user.username}</h1>
                           <span className="px-3 py-1 bg-indigo-600/10 text-indigo-500 border border-indigo-600/20 rounded-lg text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                        </div>
                        <p className="text-zinc-500 font-medium italic">Verified Scholar Node</p>
                    </div>

                    <button className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-xl">
                        <Edit size={16} /> Modify Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProfileCard 
                        title="Contact Information" 
                        icon={<Mail size={20} />} 
                        details={[
                            { label: "Institutional Email", value: user.email || "N/A" },
                            { label: "Sync Status", value: "Verified Active" }
                        ]} 
                    />
                    <ProfileCard 
                        title="Security Layer" 
                        icon={<Shield size={20} />} 
                        details={[
                            { label: "Clearance Level", value: user.role === 'ADMIN' ? 'Supreme Admin' : 'Standard Node' },
                            { label: "MFA Status", value: "Inactive" }
                        ]} 
                    />
                </div>
            </div>
        </div>
    );
};

const ProfileCard = ({ title, icon, details }: any) => (
    <div className="p-10 bg-zinc-50 dark:bg-zinc-900/40 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-8 text-indigo-600">
            {icon}
            <h3 className="text-sm font-black uppercase tracking-widest italic">{title}</h3>
        </div>
        <div className="space-y-6">
            {details.map((d: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{d.label}</span>
                    <p className="text-sm font-black text-zinc-900 dark:text-white italic">{d.value}</p>
                </div>
            ))}
        </div>
    </div>
);

export default ProfilePage;
