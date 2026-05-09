"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Clock } from "lucide-react";

interface InstructorStatsProps {
  user: any;
  statCards: { label: string; value: any; sub: string; icon: any; iconClass: string }[];
}

export const InstructorStats: React.FC<InstructorStatsProps> = ({ user, statCards }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="welcome-banner p-6 flex flex-col sm:flex-row items-center justify-between rounded-2xl gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
            Faculty Hub 🎓
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            {user?.is_approved_instructor 
              ? "Orchestrate your knowledge nodes and manage your teaching cycles"
              : "Your application is currently under review by our academic board."}
          </p>
        </div>
        
        {user?.is_approved_instructor ? (
          <div className="flex gap-3">
            <Link
              href="/instructor/live-streams/create"
              className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white text-cyan-600 rounded-xl font-bold text-sm hover:bg-cyan-50 transition-all border border-cyan-100"
            >
              <Plus size={18} />
              Live Hub
            </Link>
            <Link
              href="/instructor/courses/create"
              className="hidden sm:flex items-center gap-2 px-5 py-3 gradient-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-cyan-500/20"
            >
              <Plus size={18} />
              Video Course
            </Link>
          </div>
        ) : (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-3 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Awaiting Approval</p>
              <p className="text-xs text-amber-600 dark:text-amber-500">Access to creation tools is restricted.</p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="stat-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-11 h-11 ${stat.iconClass} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{stat.value}</p>
              <p className="text-xs text-emerald-600 font-medium">{stat.sub}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
