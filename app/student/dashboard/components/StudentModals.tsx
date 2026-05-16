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
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-[48px] shadow-2xl p-10 border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">Scholastic Review</h3>
                <button 
                  onClick={() => setShowRatingModal(false)} 
                  className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8 relative z-10">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {itemTypeForRating === "stream" ? (
                      <>Quantify your intellectual exchange with <span className="text-teal-600 font-bold">@{itemForRating?.instructor_name}</span></>
                    ) : (
                      <>Assess the knowledge architecture of <span className="text-teal-600 font-bold">{itemForRating?.title}</span></>
                    )}
                  </p>
                  <div className="flex items-center justify-center gap-4 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`transition-all transform hover:scale-125 ${star <= rating ? "text-amber-400 drop-shadow-xl" : "text-slate-200 dark:text-slate-700"}`}
                      >
                        <Star size={40} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Institutional Abstract (Comment)</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide a high-fidelity summary of your experience..."
                    className="w-full h-32 px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none resize-none transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowRatingModal(false)}
                    className="flex-1 py-4 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Abort
                  </button>
                  <button
                    onClick={handleRateItem}
                    disabled={submittingRating}
                    className="flex-1 py-4 gradient-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-teal-500/30 disabled:opacity-50 hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    {submittingRating ? "Syncing..." : "Commit Review"}
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
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-800 rounded-[48px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-10 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/30 backdrop-blur-xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 gradient-primary rounded-[24px] flex items-center justify-center shadow-2xl shadow-teal-500/30">
                    <GraduationCap size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none mb-1">Knowledge Hub</h3>
                    <p className="text-[10px] text-teal-600 font-black uppercase tracking-[3px]">{selectedStreamForLearn?.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLearnModal(false)} 
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100 dark:border-slate-700 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 h-[550px] overflow-y-auto custom-scrollbar space-y-12">
                {selectedStreamForLearn?.live_sessions?.map((session: any, sIdx: number) => (
                  <div key={session.id} className="relative pl-12 border-l-4 border-slate-100 dark:border-slate-800/50 last:border-transparent">
                    <div className="absolute left-[-14px] top-0 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-4 border-teal-500 shadow-xl shadow-teal-500/20" />
                    
                    <div className="mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight mb-1 uppercase">{session.title}</h4>
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Clock size={14} />
                            {new Date(session.scheduled_at).toLocaleDateString()} @ {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        
                        {(session.meeting_link || session.link) && (
                          <a 
                            href={session.meeting_link || session.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-teal-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-teal-500/30 hover:scale-[1.05] active:scale-95 transition-all"
                          >
                            <PlayCircle size={16} /> Join Transmission
                          </a>
                        )}
                      </div>
                      
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800/50">
                        {session.description || "Synthesizing core learning objectives for this synchronous session."}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-[3px]">Synchronous Artifacts</p>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {session.content_blocks?.map((block: any) => (
                          <button 
                            key={block.id}
                            onClick={() => {
                              setActiveArtifact(block);
                              setShowArtifactViewer(true);
                            }}
                            className="w-full flex items-center gap-4 p-5 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30 transition-all group text-left"
                          >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${block.type === 'pdf' ? 'bg-rose-50 text-rose-500 dark:bg-rose-900/20' : 'bg-teal-50 text-teal-600 dark:bg-teal-900/20'}`}>
                              {block.type === 'pdf' ? <FileText size={20} /> : <Link2 size={20} />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-black text-slate-800 dark:text-white truncate group-hover:text-teal-600 transition-colors mb-1">{block.title}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-black uppercase tracking-widest">{block.type}</span>
                                <span className="text-[8px] text-teal-500 font-black uppercase tracking-widest">• Identity Secure</span>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-teal-600 group-hover:scale-110 transition-all">
                              <ArrowRight size={14} />
                            </div>
                          </button>
                        ))}
                        {(!session.content_blocks || session.content_blocks.length === 0) && (
                          <div className="col-span-2 py-8 px-6 bg-slate-50/50 dark:bg-slate-900/30 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center">
                            <Clock size={24} className="text-slate-200 mb-2" />
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">No signal artifacts yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {(!selectedStreamForLearn?.live_sessions || selectedStreamForLearn.live_sessions.length === 0) && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-20">
                    <Calendar size={64} className="text-slate-100 dark:text-slate-800 mb-6" />
                    <h4 className="text-lg font-bold text-slate-300 dark:text-slate-600 tracking-tight">Synchronizing curriculum... No sessions scheduled yet.</h4>
                  </div>
                )}
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                <button 
                  onClick={() => setShowLearnModal(false)}
                  className="px-10 py-3 text-[10px] font-black uppercase tracking-[3px] text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all hover:scale-105"
                >
                  Return to Dashboard Node
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
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-6xl h-[92vh] bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl flex flex-col overflow-hidden border border-white/10"
            >
              <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl ${activeArtifact.type === 'pdf' ? 'bg-rose-500 text-white' : 'bg-teal-500 text-white'}`}>
                    {activeArtifact.type === 'pdf' ? <FileText size={24} /> : <Link2 size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none uppercase tracking-tighter mb-2">
                      {activeArtifact.title}
                    </h3>
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                         <ShieldAlert size={12} className="text-amber-500" /> Secure Identity Protocol
                       </span>
                       <span className="text-[9px] px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-black uppercase tracking-widest border border-teal-100 dark:border-teal-800">Read Only</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowArtifactViewer(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:rotate-90 transition-all shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <X size={24} />
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
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-10 overflow-y-auto">
                    <Globe size={80} className="text-slate-200 dark:text-slate-800 mb-8 animate-pulse" />
                    <h4 className="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tighter">External Signal Node</h4>
                    <p className="text-slate-500 font-medium max-w-md mb-12 leading-relaxed">This knowledge artifact is hosted on an external institutional platform. Intellectual property protocols remain active.</p>
                    <div className="w-full max-w-5xl h-[600px] bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                       <iframe
                         src={activeArtifact.url}
                         className="w-full h-full border-none"
                         title={activeArtifact.title}
                       />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[4px]"> Scholastic Governance Protected by Fatra Registry</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
