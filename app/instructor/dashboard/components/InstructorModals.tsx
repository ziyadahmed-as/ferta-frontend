"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, FileText, Link2, UploadCloud, CheckCircle, X, Clock } from "lucide-react";

interface InstructorModalsProps {
  showManageModal: boolean;
  setShowManageModal: (show: boolean) => void;
  selectedStream: any;
  selectedSessionId: string;
  setSelectedSessionId: (id: string) => void;
  artifactData: any;
  setArtifactData: (data: any) => void;
  handleUploadArtifact: () => void;
  uploading: boolean;
}

export const InstructorModals: React.FC<InstructorModalsProps> = ({
  showManageModal, setShowManageModal, selectedStream, selectedSessionId,
  setSelectedSessionId, artifactData, setArtifactData, handleUploadArtifact, uploading
}) => {
  return (
    <AnimatePresence>
      {showManageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowManageModal(false)}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-800 rounded-[48px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="p-10 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/30 backdrop-blur-xl">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 gradient-primary rounded-[24px] flex items-center justify-center shadow-2xl shadow-teal-500/30">
                  <BarChart3 size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none mb-1">Manage Hub</h3>
                  <p className="text-[10px] text-teal-600 font-black uppercase tracking-[3px]">{selectedStream?.title}</p>
                </div>
              </div>
              <button title="close"
                onClick={() => setShowManageModal(false)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100 dark:border-slate-700 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex h-[600px]">
              {/* Session Sidebar */}
              <div className="w-1/3 border-r border-slate-100 dark:border-slate-800/50 overflow-y-auto p-6 space-y-3 bg-slate-50/30 dark:bg-slate-900/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-6 px-2 tracking-[2px]">Synchronous Sequences</p>
                {selectedStream?.live_sessions?.map((session: any) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSessionId(session.id)}
                    className={`w-full text-left p-5 rounded-[24px] transition-all group ${selectedSessionId === session.id
                        ? "bg-white dark:bg-slate-800 text-teal-600 shadow-2xl shadow-teal-500/10 border border-teal-100 dark:border-teal-900/50"
                        : "hover:bg-white/50 dark:hover:bg-slate-800/30 text-slate-500 dark:text-slate-400"
                      }`}
                  >
                    <p className={`text-sm font-black uppercase tracking-tight mb-1 truncate ${selectedSessionId === session.id ? "text-teal-600" : "text-slate-700 dark:text-slate-200"}`}>{session.title}</p>
                    <div className="flex items-center gap-2 opacity-60">
                      <Clock size={12} />
                      <p className="text-[10px] font-bold uppercase tracking-widest">{new Date(session.scheduled_at).toLocaleDateString()}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Artifact View */}
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {selectedSessionId ? (
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-8 uppercase">Provision Knowledge Artifacts</h4>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                          onClick={() => setArtifactData({ ...artifactData, type: 'pdf' })}
                          className={`p-6 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 ${artifactData.type === 'pdf' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-lg shadow-teal-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800'}`}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${artifactData.type === 'pdf' ? 'bg-teal-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}>
                            <FileText size={24} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Research PDF</span>
                        </button>
                        <button
                          onClick={() => setArtifactData({ ...artifactData, type: 'link' })}
                          className={`p-6 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 ${artifactData.type === 'link' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-lg shadow-teal-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800'}`}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${artifactData.type === 'link' ? 'bg-teal-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}>
                            <Link2 size={24} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">External Link</span>
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Artifact Identity Label</label>
                          <input
                            type="text"
                            placeholder="e.g. Theoretical Framework Node"
                            value={artifactData.title}
                            onChange={(e) => setArtifactData({ ...artifactData, title: e.target.value })}
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-none rounded-[20px] text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                          />
                        </div>

                        {artifactData.type === 'pdf' ? (
                          <div className="relative border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 hover:border-teal-500/30 transition-all group bg-slate-50/30 dark:bg-slate-900/30">
                            <input title="upload file"
                              type="file"
                              accept=".pdf"
                              onChange={(e) => setArtifactData({ ...artifactData, file: e.target.files?.[0] || null })}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="w-20 h-20 rounded-[32px] bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center text-slate-400 group-hover:text-teal-500 group-hover:scale-110 transition-all">
                              <UploadCloud size={40} />
                            </div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center">{artifactData.file ? artifactData.file.name : "Inject PDF Artifact Node"}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">External Signal URL</label>
                            <input
                              type="url"
                              placeholder="https://institutional-source.edu/..."
                              value={artifactData.url}
                              onChange={(e) => setArtifactData({ ...artifactData, url: e.target.value })}
                              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-none rounded-[20px] text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                            />
                          </div>
                        )}

                        <button
                          onClick={handleUploadArtifact}
                          disabled={uploading || !artifactData.title}
                          className="w-full py-5 gradient-primary text-white rounded-[24px] text-[10px] font-black uppercase tracking-[3px] shadow-2xl shadow-teal-500/30 disabled:opacity-50 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          {uploading ? "Syncing..." : <><CheckCircle size={20} /> Deploy Artifact Node</>}
                        </button>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-6">
                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[3px] px-1">Active Artifact Registry</h5>
                        <span className="text-[10px] font-black text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full border border-teal-100 dark:border-teal-800">Verified</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedStream?.live_sessions?.find((s: any) => s.id === selectedSessionId)?.content_blocks?.map((block: any) => (
                          <div key={block.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-[20px] border border-slate-100 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all group">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${block.type === 'pdf' ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-teal-600'}`}>
                                {block.type === 'pdf' ? <FileText size={18} /> : <Link2 size={18} />}
                              </div>
                              <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">{block.title}</span>
                            </div>
                            <span className="text-[8px] font-black text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest border border-slate-100 dark:border-slate-700">{block.type}</span>
                          </div>
                        ))}
                        {!selectedStream?.live_sessions?.find((s: any) => s.id === selectedSessionId)?.content_blocks?.length && (
                          <div className="py-12 px-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[32px] flex flex-col items-center justify-center bg-slate-50/20">
                            <BarChart3 size={32} className="text-slate-200 mb-2" />
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">No artifacts deployed for this sequence</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-20">
                    <div className="w-24 h-24 rounded-[40px] bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-200 dark:text-slate-800 mb-8 border border-slate-100 dark:border-slate-800 shadow-inner">
                      <BarChart3 size={48} />
                    </div>
                    <h4 className="text-xl font-black text-slate-400 tracking-tight uppercase mb-2">Initialize Hub Management</h4>
                    <p className="text-sm font-medium text-slate-500 max-w-xs">Select a synchronous sequence from the sidebar to manage institutional artifacts.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
