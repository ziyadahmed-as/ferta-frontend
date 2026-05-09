"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, LogOut } from "lucide-react";

interface StudentSidebarProps {
  user: any;
  logout: () => void;
  navItems: { id: string; label: string; icon: any }[];
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ user, logout, navItems, activeNav, setActiveNav }) => {
  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
            <BookOpen size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-800 dark:text-white">Fatra<span className="text-cyan-600"> Academy</span></span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              title={`Go to ${item.label}`}
              aria-label={`Navigate to ${item.label}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? "sidebar-active" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{user.username}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role?.toLowerCase()}</p>
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign Out"
          aria-label="Sign out of student account"
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
};
