"use client";

import React from "react";
import { Upload, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface KnowledgeModalsProps {
  showUploadModal: boolean;
  setShowUploadModal: (show: boolean) => void;
  uploadTitle: string;
  setUploadTitle: (title: string) => void;
  uploadDescription: string;
  setUploadDescription: (desc: string) => void;
  handleUploadDocument: (e: React.FormEvent) => void;
  setUploadFile: (file: File | null) => void;
}

export const KnowledgeModals: React.FC<KnowledgeModalsProps> = ({
  showUploadModal, setShowUploadModal, uploadTitle, setUploadTitle, uploadDescription, setUploadDescription, handleUploadDocument, setUploadFile
}) => {
  return (
    <AnimatePresence>
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Upload className="text-teal-600" size={20} />
                Upload Knowledge Document
              </h3>
              <button 
                onClick={() => setShowUploadModal(false)} 
                aria-label="Close modal"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUploadDocument} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Document Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Platform FAQ, Student Handbook"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description (Optional)</label>
                <textarea 
                  placeholder="Brief description of the document content..."
                  value={uploadDescription}
                  onChange={e => setUploadDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">File (PDF, TXT, or MD)</label>
                <div className="relative">
                  <input 
                    required
                    type="file" 
                    accept=".pdf,.txt,.md"
                    title="Select Document File"
                    onChange={e => {
                      if (e.target.files && e.target.files.length > 0) {
                        setUploadFile(e.target.files[0]);
                      }
                    }}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Upload Node
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
