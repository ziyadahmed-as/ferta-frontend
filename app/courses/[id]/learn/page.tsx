"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { 
  PlayCircle, CheckCircle2, ChevronRight, ChevronLeft, 
  Lock, Loader2, BookOpen, Clock, Award, 
  MessageSquare, FileText, Globe, SkipForward, SkipBack,
  Menu, X, Check, Video, Download, ExternalLink, Sparkles, Info, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const LearnPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/courses/${id}/`);
        const courseData = response.data;
        
        if (!courseData.is_enrolled && user?.role !== 'ADMIN') {
          router.push(`/courses/${id}`);
          return;
        }
        
        setCourse(courseData);
        
        // Flatten lessons to find currently selected or first lesson
        const allLessons = courseData.chapters.flatMap((c: any) => c.lessons);
        const lessonId = searchParams.get("lessonId");
        
        let initialLesson = allLessons[0];
        if (lessonId) {
          initialLesson = allLessons.find((l: any) => l.id === parseInt(lessonId)) || allLessons[0];
        }
        
        setCurrentLesson(initialLesson);
        
        // Track completed lessons
        const completed = allLessons.filter((l: any) => l.is_completed).map((l: any) => l.id);
        setCompletedLessons(completed);
        
      } catch (err) {
        console.error("Learn page fetch error:", err);
        setError("Failed to load course content. Please check your enrollment.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id, user, searchParams, router]);

  const handleLessonSelect = (lesson: any) => {
    setCurrentLesson(lesson);
    router.replace(`/courses/${id}/learn?lessonId=${lesson.id}`);
  };

  const handleMarkComplete = async () => {
    if (!currentLesson || completing) return;
    
    setCompleting(true);
    try {
      await api.post(`/interactions/lessons-progress/mark-completed/${currentLesson.id}/`);
      setCompletedLessons(prev => [...prev, currentLesson.id]);
      
      // Auto move to next lesson
      goToNextLesson();
    } catch (err: any) {
      console.error("Mark complete error:", err);
      // If the error is "Please complete the previous lesson first"
      if (err.response?.data?.detail) {
        alert(err.response.data.detail);
      }
    } finally {
      setCompleting(false);
    }
  };

  const goToNextLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.chapters.flatMap((c: any) => c.lessons);
    const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      handleLessonSelect(allLessons[currentIndex + 1]);
    }
  };

  const goToPrevLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.chapters.flatMap((c: any) => c.lessons);
    const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      handleLessonSelect(allLessons[currentIndex - 1]);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Hydrating your learning environment...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-6 text-center">
      <X size={48} className="text-red-500 mb-4" />
      <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{error}</h1>
      <button onClick={() => router.push(`/courses/${id}`)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Back to Course</button>
    </div>
  );

  const allLessons = course?.chapters.flatMap((c: any) => c.lessons) || [];
  const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson?.id);
  const isLastLesson = currentIndex === allLessons.length - 1;
  const isFirstLesson = currentIndex === 0;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden font-sans">
      {/* Header */}
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
              {course.title}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                    <div 
                        className="h-full gradient-primary rounded-full transition-all duration-500" 
                        style={{ width: `${(completedLessons.length / (allLessons.length || 1)) * 100}%` }}
                    />
                </div>
            </div>
            <button 
                onClick={() => router.push(`/student/dashboard`)}
                className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
                Exit
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <motion.div 
            initial={false}
            animate={{ width: sidebarOpen ? 350 : 0, opacity: sidebarOpen ? 1 : 0 }}
            className={`flex-shrink-0 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto z-20 absolute lg:relative h-full transition-all`}
        >
          <div className="p-6">
            <h2 className="text-sm font-black uppercase text-slate-400 tracking-[0.2em] mb-6">Course Curriculum</h2>
            
            <div className="space-y-6">
              {course.chapters.map((chapter: any, idx: number) => (
                <div key={chapter.id}>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] text-blue-600">
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
                          className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all group text-left ${
                            isActive 
                              ? "bg-white dark:bg-slate-800 shadow-md ring-1 ring-blue-500/10" 
                              : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className={`mt-0.5 shrink-0 ${isDone ? "text-green-500" : isActive ? "text-blue-500" : "text-slate-300"}`}>
                            {isDone ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                          </div>
                          <div className="flex-1">
                            <p className={`text-xs font-bold leading-snug ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {lesson.is_preview && <span className="text-[8px] font-black uppercase text-blue-500 bg-blue-50 px-1 rounded">Preview</span>}
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-slate-950/20">
          <div className="max-w-5xl mx-auto w-full p-6 sm:p-10 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLesson?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-[10px] uppercase tracking-wider">
                      <Sparkles size={14} /> Lesson Content
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {currentLesson?.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                        onClick={goToPrevLesson}
                        disabled={isFirstLesson}
                        title="Previous Lesson"
                        className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={goToNextLesson}
                        disabled={isLastLesson}
                        title="Next Lesson"
                        className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Main Media Player / Content */}
                <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl relative group ring-1 ring-white/10">
                   {/* Placeholder for Video Player */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4 text-white/30 group-hover:scale-110 transition-transform duration-500">
                         <PlayCircle size={80} strokeWidth={1} />
                         <p className="font-bold text-xs uppercase tracking-[0.3em]">Initialize Stream</p>
                      </div>
                   </div>
                   
                   {/* Overlay Controls Preview */}
                   <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                            <SkipBack size={20} />
                         </div>
                         <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                         </div>
                         <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                            <SkipForward size={20} />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Lesson Description & Content Blocks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-10">
                    <div>
                      <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                        <Info size={16} /> Overview
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        {currentLesson?.description || "In this session, we explore the core principles of the subject matter, focusing on practical implementation and conceptual mastery."}
                      </p>
                    </div>

                    {/* Content Blocks Display */}
                    {currentLesson?.content_blocks?.length > 0 && (
                      <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-2 flex items-center gap-2">
                          <Layers size={16} /> Learning Resources
                        </h3>
                        {currentLesson.content_blocks.map((block: any) => (
                          <div key={block.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
                             {block.type === 'text' && (
                               <div className="prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base font-medium text-slate-700 dark:text-slate-300">
                                  <div dangerouslySetInnerHTML={{ __html: block.text_content }} />
                               </div>
                             )}
                             {block.type === 'image' && block.file && (
                               <div className="rounded-2xl overflow-hidden">
                                  <img src={block.file} alt={block.title} className="w-full h-auto" />
                               </div>
                             )}
                             {(block.type === 'pdf' || block.type === 'file') && (
                               <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
                                        <FileText size={20} />
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">{block.title || "Resource PDF"}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase trekking-widest">Mastery Artifact</p>
                                     </div>
                                  </div>
                                  <Download className="text-slate-400" size={20} />
                               </div>
                             )}
                             {block.type === 'video_link' && block.url && (
                               <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                   <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                                       <Globe size={20} />
                                   </div>
                                   <div className="flex-1">
                                       <p className="text-sm font-bold text-slate-800 dark:text-white">{block.title || "External Content"}</p>
                                       <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-bold hover:underline">View Source Artifact</a>
                                   </div>
                                   <ExternalLink className="text-slate-400" size={16} />
                               </div>
                             )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="p-8 gradient-primary rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20 sticky top-0">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Award size={22} className="text-white fill-white/20" /> Completion Logic
                      </h4>
                      <p className="text-xs text-blue-100 leading-relaxed mb-8 font-medium">
                        Signals processed for this lesson will be recorded in your scholarly registry once validated. Mark as complete to advance.
                      </p>
                      
                      {completedLessons.includes(currentLesson?.id) ? (
                        <div className="w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-sm uppercase tracking-widest border border-white/20">
                          <CheckCircle2 size={24} /> Lesson Mastered
                        </div>
                      ) : (
                        <button 
                            onClick={handleMarkComplete}
                            disabled={completing}
                            className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {completing ? <Loader2 className="animate-spin" size={20} /> : <><Check size={20} /> Complete Lesson</>}
                        </button>
                      )}
                      
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase text-blue-100 tracking-widest">Next Lesson</span>
                            <ChevronRight size={14} className="text-blue-100" />
                        </div>
                        <p className="text-sm font-bold truncate opacity-90">
                            {allLessons[currentIndex + 1]?.title || "Course Completed"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm">
                        <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                           <MessageSquare size={16} /> Peer Discussion
                        </h4>
                        <div className="space-y-6">
                           <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase">JS</div>
                              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex-1">
                                 <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Could anyone explain the implementation detail at 5:20?</p>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase">AM</div>
                              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex-1">
                                 <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">I found a useful doc for that part, attaching it above.</p>
                              </div>
                           </div>
                           <button className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:border-blue-500/30 transition-all">Join Pulse Conversation</button>
                        </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
