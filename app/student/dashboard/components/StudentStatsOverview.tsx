"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface StudentStatsOverviewProps {
  courses: any[];
  liveStreams: any[];
  stats: { label: string; value: any; icon: any; iconClass: string }[];
  masteryData: { name: string; value: number; color: string }[];
}

export const StudentStatsOverview: React.FC<StudentStatsOverviewProps> = ({ courses, liveStreams, stats, masteryData }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-900 rounded-[40px] p-8 text-white shadow-2xl shadow-teal-500/20 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-125 transition-all duration-1000" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 flex items-center justify-center p-2 shrink-0">
              <div className="w-full h-full bg-white/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                ⚡
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[3px] text-teal-200">Next Recommended Node</p>
              </div>
              <h2 className="text-3xl font-black mb-3 tracking-tighter">
                {courses[0]?.title || liveStreams[0]?.title || "Explore New Frontiers"}
              </h2>
              <p className="text-teal-100/70 text-sm font-medium mb-6 line-clamp-2">
                Your learning velocity is increasing. Jump back into the curriculum and maintain your streak.
              </p>
              <button className="px-8 py-3 bg-white text-teal-600 rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Resume Mission →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none">Curriculum Mastery</h3>
            <Star size={16} className="text-amber-500 fill-amber-500" />
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="h-40 w-full relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie 
                      data={masteryData} 
                      innerRadius={50} 
                      outerRadius={75} 
                      paddingAngle={5} 
                      dataKey="value"
                    >
                      {masteryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <p className="text-3xl font-black text-slate-800 dark:text-white leading-none">82%</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery</p>
                </div>
             </div>
             
             <div className="flex gap-4 mt-6">
                {masteryData.slice(0, 2).map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{item.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="stat-card flex items-center gap-4"
            >
              <div className={`w-12 h-12 ${stat.iconClass} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
