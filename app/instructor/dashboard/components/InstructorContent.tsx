"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Users, Settings, BarChart3, Clock } from "lucide-react";

interface InstructorContentProps {
  user: any;
  activeTab: "video" | "live";
  setActiveTab: (tab: "video" | "live") => void;
  courses: any[];
  liveStreams: any[];
  setSelectedStream: (stream: any) => void;
  setShowManageModal: (show: boolean) => void;
}

export const InstructorContent: React.FC<InstructorContentProps> = ({
  user, activeTab, setActiveTab, courses, liveStreams,
  setSelectedStream, setShowManageModal
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 p-10 shadow-2xl shadow-slate-200/10 dark:shadow-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("video")}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-all ${activeTab === "video"
                ? "bg-white dark:bg-slate-800 text-teal-600 shadow-xl border border-teal-100 dark:border-teal-900/50"
                : "text-slate-400 hover:text-slate-600"
              }`}
          >
            Video Artifacts
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-all ${activeTab === "live"
                ? "bg-white dark:bg-slate-800 text-teal-600 shadow-xl border border-teal-100 dark:border-teal-900/50"
                : "text-slate-400 hover:text-slate-600"
              }`}
          >
            Live Synchronous
          </button>
        </div>
        <Link href="/instructor/courses" className="text-[10px] font-black uppercase tracking-[3px] text-teal-600 hover:text-teal-700 flex items-center gap-2 group">
          Master Registry <BarChart3 size={16} className="group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      {activeTab === "video" ? (
        courses.length === 0 ? (
          <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <BookOpen size={64} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 font-bold text-lg mb-8 tracking-tight">No video artifacts provisioned.</p>
            {user?.is_approved_instructor ? (
              <Link href="/instructor/courses/create" className="px-10 py-4 gradient-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
                Initialize Course Node
              </Link>
            ) : (
              <p className="text-xs text-rose-500 font-black uppercase tracking-widest bg-rose-50 dark:bg-rose-900/20 px-6 py-2 rounded-full inline-block border border-rose-100 dark:border-rose-800">Faculty Registry Pending Approval</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any, idx: number) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden hover:border-teal-500/30 transition-all group flex flex-col shadow-sm hover:shadow-2xl hover:shadow-teal-500/5"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl backdrop-blur-xl ${
                    course.is_approved ? "bg-emerald-500/90 text-white" : "bg-amber-500/90 text-white"
                  }`}>
                    {course.is_approved ? "Active Node" : "Pending Sync"}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="font-black text-slate-800 dark:text-white text-base tracking-tight leading-tight mb-6 line-clamp-2">{course.title}</h4>
                  
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Users size={14} className="text-teal-600" /> {course.enrollment_count || 0} Scholars
                    </div>
                    <Link 
                      href={`/instructor/courses/${course.id}/edit`} 
                      className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-teal-600 border border-slate-100 dark:border-slate-700 transition-all"
                    >
                      <Settings size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      ) : (
        liveStreams.length === 0 ? (
          <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <BarChart3 size={64} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 font-bold text-lg mb-8 tracking-tight">No synchronous nodes assigned.</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[3px]">Waiting for Administrative Registry Dispatch</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveStreams.map((stream: any, idx: number) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden hover:border-teal-500/30 transition-all group flex flex-col shadow-sm hover:shadow-2xl hover:shadow-teal-500/5"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={stream.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80"}
                    alt={stream.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-xl text-white text-[9px] font-black rounded-xl uppercase tracking-widest shadow-xl">
                      {stream.group_type} Node
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl text-[10px] font-black text-teal-600 shadow-xl">
                    {Math.round((stream.enrollment_count / (stream.max_students || 1)) * 100)}% Density
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="font-black text-slate-800 dark:text-white text-base tracking-tight leading-tight mb-2 line-clamp-1">{stream.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <Clock size={14} className="text-teal-600" /> {stream.live_sessions?.length || 0} Sequences Provisioned
                  </p>
                  <button 
                    onClick={() => { setSelectedStream(stream); setShowManageModal(true); }}
                    className="w-full py-4 gradient-primary text-white text-[10px] font-black uppercase tracking-[3px] rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Manage Hub
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
