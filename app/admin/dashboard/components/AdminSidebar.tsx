"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, LayoutDashboard, FileText, ChevronRight, BarChart3,
  Users, Tag, DollarSign, Bell, Cpu, LogOut
} from "lucide-react";

interface AdminSidebarProps {
  user: any;
  logout: () => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  isCourseManagementOpen: boolean;
  setIsCourseManagementOpen: (isOpen: boolean) => void;
  setRoleFilter: (filter: string) => void;
  setUserTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  user,
  logout,
  activeModule,
  setActiveModule,
  isCourseManagementOpen,
  setIsCourseManagementOpen,
  setRoleFilter,
  setUserTab,
}) => {
  return (
    <aside className="w-72 shrink-0 bg-[#0B1120] text-slate-300 flex flex-col hidden md:flex h-screen sticky top-0 overflow-y-auto custom-scrollbar">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <BookOpen size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Fatra<span className="text-teal-500"> Academy</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <button
          onClick={() => setActiveModule("overview")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            activeModule === "overview" 
              ? "bg-teal-600/10 text-teal-500" 
              : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <div className="pt-4 pb-2">
          <button 
            onClick={() => setIsCourseManagementOpen(!isCourseManagementOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-[11px] font-black uppercase tracking-[2px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} />
              Course Management
            </div>
            <motion.div
              animate={{ rotate: isCourseManagementOpen ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={14} className="rotate-90" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isCourseManagementOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-1 mt-2"
              >
                <button
                  onClick={() => setActiveModule("course_analytics")}
                  className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeModule === "course_analytics"
                      ? "text-teal-500 bg-teal-500/5" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <BarChart3 size={18} />
                  Course Dashboard
                </button>

                <button
                  onClick={() => { setActiveModule("users"); setRoleFilter("all"); setUserTab("all"); }}
                  className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeModule === "users"
                      ? "text-teal-500 bg-teal-500/5" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <Users size={18} />
                  All Users
                </button>

                <button
                  onClick={() => setActiveModule("courses")}
                  className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeModule === "courses" 
                      ? "text-teal-500" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <BookOpen size={18} />
                  Courses
                </button>

                <button
                  onClick={() => setActiveModule("categories")}
                  className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeModule === "categories" 
                      ? "text-teal-500" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <Tag size={18} />
                  Course Categories
                </button>

                <button
                  onClick={() => setActiveModule("revenue")}
                  className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeModule === "revenue" 
                      ? "text-teal-500" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <DollarSign size={18} />
                  Course Payments
                </button>

                <button
                  onClick={() => setActiveModule("notifications")}
                  className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeModule === "notifications" 
                      ? "text-teal-500" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <Bell size={18} />
                  Notification
                </button>

                <button
                  onClick={() => setActiveModule("withdrawals")}
                  className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeModule === "withdrawals" 
                      ? "text-teal-500" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <DollarSign size={18} />
                  Payouts
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-4 border-t border-slate-800/50 mt-4">
          <button
            onClick={() => setActiveModule("knowledge")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeModule === "knowledge" 
                ? "bg-teal-600/10 text-teal-500" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <FileText size={18} />
            Knowledge Base
          </button>
          <button
            onClick={() => setActiveModule("live")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeModule === "live" 
                ? "bg-teal-600/10 text-teal-500" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <Cpu size={18} />
            Live Sessions
          </button>
        </div>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-teal-500/20">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.username}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Protocol Admin</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all group"
          >
            <LogOut size={14} className="group-hover:translate-x-0.5 transition-transform" /> 
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};
