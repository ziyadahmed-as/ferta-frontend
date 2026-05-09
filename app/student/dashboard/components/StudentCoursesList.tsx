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
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("video")}
            title="View Video Courses"
            aria-label="Switch to Video Courses tab"
            className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "video"
                ? "text-cyan-600 border-cyan-600"
                : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
          >
            Video Courses
          </button>
          <button
            onClick={() => setActiveTab("live")}
            title="View Live Sessions"
            aria-label="Switch to Live Sessions tab"
            className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "live"
                ? "text-cyan-600 border-cyan-600"
                : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
          >
            Live Sessions
          </button>
        </div>
        <Link href="/courses" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
          Browse More <ChevronRight size={16} />
        </Link>
      </div>

      {activeTab === "video" ? (
        courses.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No video courses enrolled yet.</p>
            <Link href="/courses" className="px-6 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold inline-block hover:opacity-90">
              Explore Courses
            </Link>
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
                <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <Image
                    src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <PlayCircle size={40} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-2">{course.title}</h4>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                    <div className="h-full gradient-primary rounded-full w-[45%]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{course.completion_percentage || 0}% Complete</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setItemForRating(course); setItemTypeForRating("course"); setShowRatingModal(true); }}
                        className="text-xs text-amber-500 font-semibold hover:text-amber-600"
                      >
                        Rate
                      </button>
                      <Link href={`/courses/${course.id}/learn`} className="text-xs text-cyan-600 font-semibold hover:text-cyan-700">Continue →</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      ) : (
        liveStreams.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No live sessions joined yet.</p>
            <Link href="/courses?type=live" className="px-6 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold inline-block hover:opacity-90">
              Join a Live Stream
            </Link>
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
                <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <Image
                    src={stream.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80"}
                    alt={stream.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full animate-pulse uppercase tracking-wider">
                    Live Soon
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-1">{stream.title}</h4>
                  <p className="text-xs text-slate-500 mb-3">With Prof. {stream.instructor_name}</p>
                  <div className="space-y-2 mb-4">
                    {stream.live_sessions?.slice(0, 1).map((session: any) => (
                      <div key={session.id} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                        <Calendar size={12} className="text-cyan-500" />
                        Next: {new Date(session.scheduled_at).toLocaleDateString()}
                      </div>
                    ))}
                  </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setItemForRating(stream); setItemTypeForRating("stream"); setShowRatingModal(true); }}
                        title="Rate Stream"
                        aria-label={`Submit rating for ${stream.title}`}
                        className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Rate
                      </button>
                      <button 
                        onClick={() => { setSelectedStreamForLearn(stream); setShowLearnModal(true); }}
                        title="Knowledge Hub"
                        aria-label={`Open learning hub for ${stream.title}`}
                        className="flex-1 text-center px-4 py-1.5 gradient-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all font-bold"
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
