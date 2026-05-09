"use client";

import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, LogOut } from "lucide-react";

interface AdminHeaderProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  user: any;
  logout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeModule,
  setActiveModule,
  user,
  logout,
}) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActiveModule("courses")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeModule === "courses" 
              ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" 
              : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          Courses
        </button>
        <button 
          onClick={() => setActiveModule("live")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeModule === "live" 
              ? "bg-rose-600 text-white shadow-lg shadow-rose-500/20" 
              : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          Live Sessions
        </button>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
        <button title="Notifications" className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.username}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
        <button onClick={logout} title="Sign Out" className="p-2 text-slate-400 hover:text-red-500 transition-colors">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};
