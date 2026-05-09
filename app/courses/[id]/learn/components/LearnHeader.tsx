"use client";

import React from "react";
import { Menu, X, BookOpen, Bot } from "lucide-react";
import { useRouter } from "next/navigation";

interface LearnHeaderProps {
  course: any;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  aiSidebarOpen: boolean;
  setAiSidebarOpen: (open: boolean) => void;
  completedLessons: number[];
  allLessons: any[];
}

export const LearnHeader: React.FC<LearnHeaderProps> = ({
  course, sidebarOpen, setSidebarOpen, aiSidebarOpen, setAiSidebarOpen,
  completedLessons, allLessons
}) => {
  const router = useRouter();

  return (
    <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900 shadow-sm z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
            <BookOpen size={16} />
          </div>
          <h1 className="font-bold text-slate-800 dark:text-white truncate max-w-[200px] sm:max-w-md">
            {course?.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end mr-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
          <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-500"
              title={`Progress: ${Math.round((completedLessons.length / (allLessons.length || 1)) * 100)}%`}
              style={{ width: `${(completedLessons.length / (allLessons.length || 1)) * 100}%` } as React.CSSProperties}
            />
          </div>
        </div>
        <button
          onClick={() => router.push(`/student/dashboard`)}
          className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition-colors hidden sm:block"
        >
          Exit
        </button>
        <button
          onClick={() => setAiSidebarOpen(!aiSidebarOpen)}
          className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${aiSidebarOpen
            ? 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-cyan-300'
            }`}
          title="AI Learning Assistant"
        >
          <Bot size={18} />
          <span className="text-xs font-bold hidden sm:block">AI Tutor</span>
        </button>
      </div>
    </div>
  );
};
