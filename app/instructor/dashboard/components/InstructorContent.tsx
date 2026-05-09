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
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("video")}
            title="View Video Content"
            aria-label="Switch to Video Content tab"
            className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "video"
                ? "text-cyan-600 border-cyan-600"
                : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
          >
            Video Content
          </button>
          <button
            onClick={() => setActiveTab("live")}
            title="View Live Stream Hub"
            aria-label="Switch to Live Stream Hub tab"
            className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "live"
                ? "text-cyan-600 border-cyan-600"
                : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
          >
            Live Stream Hub
          </button>
        </div>
        <Link href="/instructor/courses" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          Manage All Hubs →
        </Link>
      </div>

      {activeTab === "video" ? (
        courses.length === 0 ? (
          <div className="text-center py-10">
            <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 mb-4">No video courses created yet.</p>
            {user?.is_approved_instructor ? (
              <Link href="/instructor/courses/create" className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold inline-block">
                Create First Course
              </Link>
            ) : (
              <p className="text-xs text-amber-600 font-medium">Creation tools locked until approval.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course: any, idx: number) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="relative h-36 bg-slate-100 dark:bg-slate-700">
                  <Image
                    src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    course.is_approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {course.is_approved ? "Approved" : "Pending"}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-2">{course.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Users size={13} /> {course.enrollment_count || 0} Scholars
                    </div>
                    <Link 
                      href={`/instructor/courses/${course.id}/edit`} 
                      title="Edit Course" 
                      aria-label={`Edit course ${course.title}`}
                      className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                    >
                      <Settings size={14} className="text-slate-500 hover:text-cyan-600" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      ) : (
        liveStreams.length === 0 ? (
          <div className="text-center py-10">
            <BarChart3 size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 mb-4">No live streams assigned yet.</p>
            <p className="text-xs text-slate-400">Admins will assign you to live teaching cohorts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((stream: any, idx: number) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="relative h-36 bg-slate-100 dark:bg-slate-700">
                  <Image
                    src={stream.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80"}
                    alt={stream.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-cyan-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {stream.group_type}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-slate-800/90 rounded-full text-xs font-bold text-slate-800 dark:text-white">
                    {Math.round((stream.enrollment_count / stream.max_students) * 100)}% Full
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-2">{stream.title}</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={13} /> {stream.live_sessions?.length || 0} Sessions
                    </div>
                    <button 
                      onClick={() => { setSelectedStream(stream); setShowManageModal(true); }}
                      title="Manage Hub"
                      aria-label={`Manage live hub for ${stream.title}`}
                      className="px-4 py-1.5 bg-cyan-600 text-white text-xs font-bold rounded-lg hover:bg-cyan-700 transition-all"
                    >
                      Manage Hub
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
