"use client";

import React from "react";
import { Bell, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface InstructorHeaderProps {
  user: any;
  logout: () => void;
}

export const InstructorHeader: React.FC<InstructorHeaderProps> = ({ user, logout }) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div></div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
        <button 
          title="Notifications" 
          aria-label="View notifications"
          className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.username}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.instructor_type?.toLowerCase()?.replace('_', ' ') || 'Instructor'}</p>
          </div>
        </div>
        <button 
          onClick={logout} 
          title="Sign Out" 
          aria-label="Sign out of account"
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};
