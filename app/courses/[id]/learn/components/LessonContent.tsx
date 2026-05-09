"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, PlayCircle, SkipBack, SkipForward, Info, Layers, FileText, Download, Globe, ExternalLink, Award, CheckCircle2, Check, Loader2, MessageSquare } from "lucide-react";

interface LessonContentProps {
  course: any;
  currentLesson: any;
  allLessons: any[];
  currentIndex: number;
  isFirstLesson: boolean;
  isLastLesson: boolean;
  goToPrevLesson: () => void;
  goToNextLesson: () => void;
  completedLessons: number[];
  handleMarkComplete: () => void;
  completing: boolean;
}

export const LessonContent: React.FC<LessonContentProps> = ({
  course, currentLesson, allLessons, currentIndex, isFirstLesson, isLastLesson,
  goToPrevLesson, goToNextLesson, completedLessons, handleMarkComplete, completing
}) => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-white dark:bg-slate-950/20">
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
                <div className="flex items-center gap-2 mb-2 text-cyan-600 font-bold text-[10px] uppercase tracking-wider">
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
                  className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:text-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNextLesson}
                  disabled={isLastLesson}
                  title="Next Lesson"
                  className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:text-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Main Media Player / Content */}
            <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl relative group ring-1 ring-white/10">
              {currentLesson?.video_file || currentLesson?.video_url ? (
                <div className="w-full h-full">
                  {currentLesson.video_url && (currentLesson.video_url.includes('youtube.com') || currentLesson.video_url.includes('youtu.be')) ? (
                    <iframe
                      title="Lesson Video Player"
                      src={`https://www.youtube.com/embed/${currentLesson.video_url.split('v=')[1] || currentLesson.video_url.split('/').pop()}`}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      key={currentLesson.video_file || currentLesson.video_url}
                      src={currentLesson.video_file || currentLesson.video_url}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-contain"
                      poster={course?.thumbnail}
                    />
                  )}
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4 text-white/30 group-hover:scale-110 transition-transform duration-500">
                    <PlayCircle size={80} strokeWidth={1} />
                    <p className="font-bold text-xs uppercase tracking-[0.3em]">Initialize Stream</p>
                  </div>
                </div>
              )}

              {/* Overlay Controls Preview */}
              {!currentLesson?.video_file && !currentLesson?.video_url && (
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      <SkipBack size={20} />
                    </div>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      <SkipForward size={20} />
                    </div>
                  </div>
                </div>
              )}
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
                    {currentLesson?.content_blocks?.map((block: any) => (
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
                          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer">
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
                          <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 flex items-center justify-center">
                              <Globe size={20} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-slate-800 dark:text-white">{block.title || "External Content"}</p>
                              <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-600 font-bold hover:underline">View Source Artifact</a>
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
                <div className="p-8 gradient-primary rounded-[2.5rem] text-white shadow-xl shadow-cyan-500/20 sticky top-0">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Award size={22} className="text-white fill-white/20" /> Completion Logic
                  </h4>
                  <p className="text-xs text-cyan-100 leading-relaxed mb-8 font-medium">
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
                      className="w-full py-4 bg-white text-cyan-600 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {completing ? <Loader2 className="animate-spin" size={20} /> : <><Check size={20} /> Complete Lesson</>}
                    </button>
                  )}

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase text-cyan-100 tracking-widest">Next Lesson</span>
                      <ChevronRight size={14} className="text-cyan-100" />
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
                    <button className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-600 hover:border-cyan-500/30 transition-all">Join Pulse Conversation</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
