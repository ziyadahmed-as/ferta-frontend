"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, FileText, Link2, UploadCloud, CheckCircle, X } from "lucide-react";

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
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <BarChart3 className="text-cyan-600" size={20} />
                  Live Hub Management
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedStream?.title}</p>
              </div>
              <button 
                onClick={() => setShowManageModal(false)} 
                title="Close Modal" 
                aria-label="Close live hub management modal"
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex h-[500px]">
              {/* Session Sidebar */}
              <div className="w-1/3 border-r border-slate-100 dark:border-slate-700 overflow-y-auto p-4 space-y-2">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-3 px-2">Scheduled Sessions</p>
                {selectedStream?.live_sessions?.map((session: any) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSessionId(session.id)}
                    title={`Select session: ${session.title}`}
                    aria-label={`Manage artifacts for session ${session.title}`}
                    className={`w-full text-left p-3 rounded-2xl transition-all ${
                      selectedSessionId === session.id 
                      ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 border border-cyan-100 dark:border-cyan-800" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{session.title}</p>
                    <p className="text-[10px] opacity-70">{new Date(session.scheduled_at).toLocaleDateString()}</p>
                  </button>
                ))}
              </div>

              {/* Artifact View */}
              <div className="flex-1 overflow-y-auto p-6">
                {selectedSessionId ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Host Knowledge Artifacts</h4>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <button 
                          onClick={() => setArtifactData({...artifactData, type: 'pdf'})}
                          title="Select Research PDF"
                          aria-label="Set artifact type to Research PDF"
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${artifactData.type === 'pdf' ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-cyan-200'}`}
                        >
                          <FileText size={20} className={artifactData.type === 'pdf' ? 'text-cyan-600' : 'text-slate-400'} />
                          <span className="text-[10px] font-bold">Research PDF</span>
                        </button>
                        <button 
                          onClick={() => setArtifactData({...artifactData, type: 'link'})}
                          title="Select External Link"
                          aria-label="Set artifact type to External Link"
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${artifactData.type === 'link' ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-cyan-200'}`}
                        >
                          <Link2 size={20} className={artifactData.type === 'link' ? 'text-cyan-600' : 'text-slate-400'} />
                          <span className="text-[10px] font-bold">External Link</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Artifact Label</label>
                          <input 
                            type="text"
                            placeholder="e.g. Week 1 Supporting Docs"
                            value={artifactData.title}
                            onChange={(e) => setArtifactData({...artifactData, title: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                          />
                        </div>

                        {artifactData.type === 'pdf' ? (
                          <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-cyan-400 transition-all group">
                            <input 
                              type="file" 
                              accept=".pdf"
                              title="Upload PDF artifact"
                              aria-label="Upload PDF artifact"
                              onChange={(e) => setArtifactData({...artifactData, file: e.target.files?.[0] || null})}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <UploadCloud size={32} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                            <p className="text-xs text-slate-500 font-medium">{artifactData.file ? artifactData.file.name : "Drop PDF here or click to browse"}</p>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Knowledge Signal (URL)</label>
                            <input 
                              type="url"
                              placeholder="https://..."
                              value={artifactData.url}
                              onChange={(e) => setArtifactData({...artifactData, url: e.target.value})}
                              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                          </div>
                        )}

                        <button 
                          onClick={handleUploadArtifact}
                          disabled={uploading || !artifactData.title}
                          className="w-full py-4 gradient-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {uploading ? "Provisioning..." : <><CheckCircle size={18} /> Deploy Artifact</>}
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                      <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 px-1">Active Artifacts</h5>
                      <div className="space-y-2">
                        {selectedStream?.live_sessions?.find((s: any) => s.id === selectedSessionId)?.content_blocks?.map((block: any) => (
                          <div key={block.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <div className="flex items-center gap-3">
                              {block.type === 'pdf' ? <FileText size={14} className="text-red-500" /> : <Link2 size={14} className="text-cyan-500" />}
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{block.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase">{block.type}</span>
                          </div>
                        ))}
                        {!selectedStream?.live_sessions?.find((s: any) => s.id === selectedSessionId)?.content_blocks?.length && (
                          <p className="text-xs text-slate-400 italic text-center py-4">No artifacts deployed for this session</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10">
                    <BarChart3 size={48} className="text-slate-200 mb-4" />
                    <h4 className="text-slate-400 font-medium">Select a session hub to manage knowledge artifacts</h4>
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
