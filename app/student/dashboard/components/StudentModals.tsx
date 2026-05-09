"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, GraduationCap, PlayCircle, FileText, Link2, ArrowRight, Clock, Calendar, ShieldAlert, Globe } from "lucide-react";

interface StudentModalsProps {
  showRatingModal: boolean;
  setShowRatingModal: (show: boolean) => void;
  itemTypeForRating: "stream" | "course";
  itemForRating: any;
  rating: number;
  setRating: (rating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  handleRateItem: () => void;
  submittingRating: boolean;
  showLearnModal: boolean;
  setShowLearnModal: (show: boolean) => void;
  selectedStreamForLearn: any;
  setActiveArtifact: (artifact: any) => void;
  setShowArtifactViewer: (show: boolean) => void;
  showArtifactViewer: boolean;
  activeArtifact: any;
}

export const StudentModals: React.FC<StudentModalsProps> = ({
  showRatingModal, setShowRatingModal, itemTypeForRating, itemForRating,
  rating, setRating, comment, setComment, handleRateItem, submittingRating,
  showLearnModal, setShowLearnModal, selectedStreamForLearn,
  setActiveArtifact, setShowArtifactViewer, showArtifactViewer, activeArtifact
}) => {
  return (
    <>
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRatingModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Rate Instructor</h3>
                <button 
                  onClick={() => setShowRatingModal(false)} 
                  title="Close Modal" 
                  aria-label="Close Rating Modal"
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-500 mb-3">
                    {itemTypeForRating === "stream" ? (
                      <>How was your session with <b>{itemForRating?.instructor_name}</b>?</>
                    ) : (
                      <>How would you rate the course <b>{itemForRating?.title}</b>?</>
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        title={`Rate ${star} stars`}
                        aria-label={`Submit ${star} star rating`}
                        className={`p-1 transition-all ${star <= rating ? "text-amber-400 scale-110" : "text-slate-300"}`}
                      >
                        <Star size={32} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Share your experience</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What did you learn today? Any feedback for the professor?"
                    className="w-full h-32 px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRatingModal(false)}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-sm"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={handleRateItem}
                    disabled={submittingRating}
                    className="flex-1 py-3 gradient-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                  >
                    {submittingRating ? "Submitting..." : "Submit Rating"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLearnModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLearnModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">Learning Hub</h3>
                    <p className="text-xs text-slate-500">{selectedStreamForLearn?.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLearnModal(false)} 
                  title="Close Modal" 
                  aria-label="Close learning hub modal"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar space-y-8">
                {selectedStreamForLearn?.live_sessions?.map((session: any, sIdx: number) => (
                  <div key={session.id} className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-700 last:border-transparent">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-600 border-4 border-white dark:border-slate-800 shadow-sm shadow-cyan-200" />
                    
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">{session.title}</h4>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                          {new Date(session.scheduled_at).toLocaleDateString()} @ {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      {session.link && session.is_active && (
                        <a 
                          href={session.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors mb-4 ring-1 ring-emerald-500/20"
                        >
                          <PlayCircle size={14} /> Join Live Transmission
                        </a>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Synchronous Artifacts</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {session.content_blocks?.map((block: any) => (
                          <button 
                            key={block.id}
                            onClick={() => {
                              setActiveArtifact(block);
                              setShowArtifactViewer(true);
                            }}
                            className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600 shadow-sm group text-left"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${block.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-cyan-50 text-cyan-500'}`}>
                              {block.type === 'pdf' ? <FileText size={16} /> : <Link2 size={16} />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-cyan-600 transition-colors">{block.title}</p>
                              <div className="flex items-center gap-2">
                                <p className="text-[9px] text-slate-400 uppercase font-bold">{block.type}</p>
                                <span className="text-[9px] text-teal-500 font-bold uppercase tracking-widest">• Read Only</span>
                              </div>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
                              <ArrowRight size={12} />
                            </div>
                          </button>
                        ))}
                        {(!session.content_blocks || session.content_blocks.length === 0) && (
                          <div className="col-span-2 py-4 px-2 border border-dashed border-slate-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center">
                            <Clock size={16} className="text-slate-300 mb-1" />
                            <p className="text-[10px] text-slate-400 font-medium italic">No signal artifacts yet for this session</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {(!selectedStreamForLearn?.live_sessions || selectedStreamForLearn.live_sessions.length === 0) && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10">
                    <Calendar size={48} className="text-slate-200 mb-4" />
                    <h4 className="text-slate-400 font-medium">Synchronizing curriculum... No sessions scheduled yet.</h4>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                <button 
                  onClick={() => setShowLearnModal(false)}
                  className="w-full py-4 text-slate-500 dark:text-slate-400 font-bold text-xs hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showArtifactViewer && activeArtifact && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowArtifactViewer(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/10"
            >
              <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${activeArtifact.type === 'pdf' ? 'bg-red-500 text-white' : 'bg-cyan-500 text-white'}`}>
                    {activeArtifact.type === 'pdf' ? <FileText size={20} /> : <Link2 size={20} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight">
                      {activeArtifact.title}
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-slate-500 flex items-center gap-1">
                         <ShieldAlert size={10} /> Secure Identity Viewer
                       </span>
                       <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-black uppercase tracking-widest">Read Only Protocol</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowArtifactViewer(false)}
                  title="Return to Hub"
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all transform hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
                <div 
                  className="absolute inset-0 z-10 select-none pointer-events-auto"
                  onContextMenu={(e) => e.preventDefault()}
                />
                
                {activeArtifact.type === 'pdf' ? (
                  <iframe
                    src={`${activeArtifact.file || activeArtifact.url}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-none"
                    title={activeArtifact.title}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-12">
                    <Globe size={64} className="text-slate-200 dark:text-slate-800 mb-6" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-4">External Synchronous Source</h4>
                    <p className="text-slate-500 max-w-sm mb-8">This resource is hosted on an external platform. You may view the live content below.</p>
                    <div className="w-full h-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                       <iframe
                         src={activeArtifact.url}
                         className="w-full h-full border-none"
                         title={activeArtifact.title}
                       />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest"> Intellectual Property Protected by Fatra Academy Governance</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
