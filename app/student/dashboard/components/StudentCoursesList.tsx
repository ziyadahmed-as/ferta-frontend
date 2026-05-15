"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, PlayCircle, Calendar } from "lucide-react";

interface StudentCoursesListProps {
  activeTab: "video" | "live";
  setActiveTab: (tab: "video" | "live") => void;
  courses: any[];
  liveStreams: any[];
  setItemForRating: (item: any) => void;
  setItemTypeForRating: (type: "stream" | "course") => void;
  setShowRatingModal: (show: boolean) => void;
  setSelectedStreamForLearn: (stream: any) => void;
  setShowLearnModal: (show: boolean) => void;
}

export const StudentCoursesList: React.FC<StudentCoursesListProps> = ({
  activeTab, setActiveTab, courses, liveStreams,
  setItemForRating, setItemTypeForRating, setShowRatingModal,
  setSelectedStreamForLearn, setShowLearnModal
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 p-10 shadow-2xl shadow-slate-200/20 dark:shadow-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("video")}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-all ${activeTab === "video"
                ? "bg-white dark:bg-slate-800 text-teal-600 shadow-xl border border-teal-100 dark:border-teal-900/50"
                : "text-slate-400 hover:text-slate-600"
              }`}
          >
            Recorded Artifacts
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
        <Link href="/courses" className="text-[10px] font-black uppercase tracking-[3px] text-teal-600 hover:text-teal-700 flex items-center gap-2 group">
          Expand Registry <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {activeTab === "video" ? (
        courses.length === 0 ? (
          <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <GraduationCap size={64} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 font-bold text-lg mb-8 tracking-tight">No recorded artifacts provisioned.</p>
            <Link href="/courses" className="px-10 py-4 gradient-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
              Initialize Enrollment
            </Link>
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
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500">
                    <PlayCircle size={56} className="text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-lg text-[9px] font-black uppercase tracking-widest text-teal-600 shadow-xl">
                      {course.category_name || "Knowledge"}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="font-black text-slate-800 dark:text-white text-base tracking-tight leading-tight mb-6 line-clamp-2">{course.title}</h4>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Mastery</p>
                      <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{course.completion_percentage || 0}% Complete</p>
                    </div>
                    <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800">
                      <div 
                        className="h-full gradient-primary rounded-full transition-all duration-1000" 
                        style={{ width: `${course.completion_percentage || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4">
                    <button 
                      onClick={() => { setItemForRating(course); setItemTypeForRating("course"); setShowRatingModal(true); }}
                      className="px-4 py-2 text-[10px] font-black text-amber-500 uppercase tracking-widest hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all"
                    >
                      Rate
                    </button>
                    <Link href={`/courses/${course.id}/learn`} className="flex-1 text-center py-3.5 gradient-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                      Sync Node
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
            <Calendar size={64} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 font-bold text-lg mb-8 tracking-tight">No synchronous cohorts active.</p>
            <Link href="/courses?type=live" className="px-10 py-4 gradient-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
              Join Cohort
            </Link>
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
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-rose-500 text-white text-[9px] font-black rounded-xl animate-pulse uppercase tracking-widest shadow-xl">
                      Live Sync
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="font-black text-slate-800 dark:text-white text-base tracking-tight leading-tight mb-2 line-clamp-1">{stream.title}</h4>
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-6">Faculty: @{stream.instructor_name}</p>
                  
                  <div className="space-y-3 mb-8">
                    {stream.live_sessions?.slice(0, 1).map((session: any) => (
                      <div key={session.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-teal-600 shadow-sm">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Next Sequence</p>
                          <p className="text-xs font-black text-slate-800 dark:text-white">{new Date(session.scheduled_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-4">
                    <button 
                      onClick={() => { setItemForRating(stream); setItemTypeForRating("stream"); setShowRatingModal(true); }}
                      className="px-4 py-2 text-[10px] font-black text-amber-500 uppercase tracking-widest hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all"
                    >
                      Rate
                    </button>
                    <button 
                      onClick={() => { setSelectedStreamForLearn(stream); setShowLearnModal(true); }}
                      className="flex-1 py-3.5 gradient-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Knowledge Hub
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
