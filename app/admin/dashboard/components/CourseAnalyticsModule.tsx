"use client";

import React from "react";
import { BarChart3, TrendingUp, Award } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface CourseAnalyticsModuleProps {
  stats: any;
  setActiveModule: (module: string) => void;
}

export const CourseAnalyticsModule: React.FC<CourseAnalyticsModuleProps> = ({ stats, setActiveModule }) => {
  return (
    <div className="space-y-8">
      <div className="welcome-banner p-10 rounded-[40px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 tracking-tighter flex items-center gap-3">
            <BarChart3 className="text-teal-600" size={32} />
            Course Insights Engine
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Deep analytics and performance metrics for knowledge artifacts</p>
        </div>
      </div>

      {/* Course Specific Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Enrollments</p>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{stats?.courses?.total_enrollments || "0"}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-teal-600">
            <TrendingUp size={14} />
            <span>+12% vs last month</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Course Rating</p>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{stats?.courses?.avg_rating || "4.8"}</p>
          <div className="mt-4 flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Award key={i} size={12} fill={i < 4 ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Revenue Yield</p>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{stats?.revenue?.total ? `${Math.round(stats.revenue.total).toLocaleString()} ETB` : "0 ETB"}</p>
          <div className="mt-4 text-xs font-bold text-slate-400">Total processed volume</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completion Rate</p>
          <p className="text-3xl font-black text-slate-800 dark:text-white">68%</p>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-[68%]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Taxonomy Density</h3>
            <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Artifact Distribution</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.category_distribution || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }} width={100} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }} />
                <Bar dataKey="courses" radius={[0, 10, 10, 0]} barSize={20}>
                  {(stats?.category_distribution || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#0ea5e9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Nodes */}
        <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">High-Yield Artifacts</h3>
            <button onClick={() => setActiveModule("courses")} className="text-[10px] font-black text-teal-600 uppercase tracking-[2px] hover:underline">Full Registry →</button>
          </div>
          <div className="space-y-6">
            {(stats?.top_courses || []).map((c: any, idx: number) => (
              <div key={c.id} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-700 dark:text-slate-200 line-clamp-1">{c.title}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{c.enrollments} Scholars</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-teal-600">{(c.revenue || 0).toLocaleString()} ETB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
