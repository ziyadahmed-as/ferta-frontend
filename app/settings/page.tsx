"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Settings, Shield, Bell, Eye, LogOut, Key } from "lucide-react";

const SettingsPage = () => {
    const { user, logout } = useAuth();
    if (!user) return <div className="h-screen flex items-center justify-center font-black italic tracking-widest bg-zinc-950 text-white animate-pulse">INIT_SETTINGS_PROTOCOL...</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-28 px-6 pb-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 mb-16 px-8 py-12 bg-white dark:bg-zinc-900/50 rounded-[4rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -z-1 group-hover:scale-150 transition-all duration-1000" />
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 group-hover:rotate-12 transition-all">
                        <Settings size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tighter italic leading-none mb-2">Global System Settings</h1>
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Operational Configuration Registry</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <SettingGroup icon={<Shield size={18} />} title="Security Protocols">
                        <SettingItem title="Multi-Factor Authentication" description="Add an extra layer of structural integrity to your login protocol." action="Inactive" />
                        <SettingItem title="Password Rotation" description="Update your primary access key." action="Update Portal" />
                        <SettingItem title="Session Visibility" description="View all currently synchronized nodes." action="Manage" />
                    </SettingGroup>

                    <SettingGroup icon={<Bell size={18} />} title="System Signals">
                        <SettingItem title="Artifact Updates" description="Notifications for new knowledge nodes and mentor signals." action="Enabled" />
                        <SettingItem title="Governance Alerts" description="Institutional updates and system status trajectories." action="Enabled" />
                    </SettingGroup>

                    <div className="pt-12 border-t border-zinc-100 dark:border-zinc-800">
                        <button 
                            onClick={logout}
                            className="w-full flex items-center justify-between p-8 bg-rose-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] italic hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-rose-600/20"
                        >
                            <div className="flex items-center gap-4">
                               <LogOut size={24} /> Full System Termination
                            </div>
                            <span className="opacity-50">SHUTDOWN_CMD</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SettingGroup = ({ icon, title, children }: any) => (
    <div className="p-10 bg-white dark:bg-zinc-900/40 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-10 text-indigo-600">
            {icon}
            <h3 className="text-sm font-black uppercase tracking-widest italic">{title}</h3>
        </div>
        <div className="space-y-10">
            {children}
        </div>
    </div>
);

const SettingItem = ({ title, description, action }: any) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800/80 last:border-0 last:pb-0">
        <div className="max-w-xl">
            <h4 className="text-sm font-black text-zinc-900 dark:text-white italic mb-2">{title}</h4>
            <p className="text-xs text-zinc-500 font-medium italic leading-relaxed">{description}</p>
        </div>
        <button className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white text-zinc-700 dark:text-zinc-300 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
            {action}
        </button>
    </div>
);

export default SettingsPage;
