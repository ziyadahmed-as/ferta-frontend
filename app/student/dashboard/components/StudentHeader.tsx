"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Bell, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface StudentHeaderProps {
  user: any;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ user }) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center md:hidden">
          <BookOpen size={16} className="text-white" />
        </div>
        <span className="font-bold text-slate-800 dark:text-white md:hidden">Fatra Academy</span>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <ThemeToggle />
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
        <button 
          title="Notifications" 
          aria-label="View recent notifications"
          className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-white leading-none">{user?.username}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </div>
        <Link 
          href="/" 
          title="Sign Out"
          aria-label="Exit to landing page"
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <LogOut size={16} />
        </Link>
      </div>
    </header>
  );
};
