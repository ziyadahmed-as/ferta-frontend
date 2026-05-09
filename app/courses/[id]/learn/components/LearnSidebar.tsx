"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, CheckCircle2 } from "lucide-react";

interface LearnSidebarProps {
  course: any;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentLesson: any;
  handleLessonSelect: (lesson: any) => void;
  completedLessons: number[];
}

export const LearnSidebar: React.FC<LearnSidebarProps> = ({
  course, sidebarOpen, setSidebarOpen, currentLesson, handleLessonSelect, completedLessons
}) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 350 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className={`flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto z-20 absolute lg:relative h-full transition-all`}
      >
        <div className="p-6">
          <h2 className="text-sm font-black uppercase text-slate-400 tracking-[0.2em] mb-6">Course Curriculum</h2>

          <div className="space-y-6">
            {course?.chapters?.map((chapter: any, idx: number) => (
              <div key={chapter.id}>
                <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] text-cyan-600">
                    {idx + 1}
                  </span>
                  {chapter.title}
                </h3>
                <div className="space-y-1 ml-3 border-l-2 border-slate-100 dark:border-slate-800 pl-4">
                  {chapter.lessons.map((lesson: any) => {
                    const isActive = currentLesson?.id === lesson.id;
                    const isDone = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all group text-left ${isActive
                          ? "bg-white dark:bg-slate-800 shadow-md ring-1 ring-cyan-500/10"
                          : "hover:bg-white dark:hover:bg-slate-800"
                          }`}
                      >
                        <div className={`mt-0.5 shrink-0 ${isDone ? "text-green-500" : isActive ? "text-cyan-500" : "text-slate-300"}`}>
                          {isDone ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-bold leading-snug ${isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-slate-400"}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {lesson.is_preview && <span className="text-[8px] font-black uppercase text-cyan-500 bg-cyan-50 px-1 rounded">Preview</span>}
                            <span className="text-[9px] text-slate-400 font-medium">10 Min</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden absolute inset-0 bg-black/20 backdrop-blur-sm z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};
