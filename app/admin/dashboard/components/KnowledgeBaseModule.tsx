"use client";

import React from "react";
import { FileText, Upload, FileUp, Search, Trash2 } from "lucide-react";

interface KnowledgeBaseModuleProps {
  knowledgeDocs: any[];
  knowledgeSearch: string;
  setKnowledgeSearch: (search: string) => void;
  setShowUploadModal: (show: boolean) => void;
  handleToggleDocument: (docId: number, currentStatus: boolean) => void;
  handleDeleteDocument: (docId: number) => void;
}

export const KnowledgeBaseModule: React.FC<KnowledgeBaseModuleProps> = ({
  knowledgeDocs,
  knowledgeSearch,
  setKnowledgeSearch,
  setShowUploadModal,
  handleToggleDocument,
  handleDeleteDocument,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="welcome-banner p-6 rounded-2xl flex-1">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight flex items-center gap-2">
            <FileText className="text-teal-600" size={24} />
            AI Knowledge Base
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Upload documents that the AI chatbot can access and answer questions from.</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Upload size={18} /> Upload Document
        </button>
      </div>

      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30 rounded-2xl p-5 flex items-start gap-3">
        <FileUp className="text-teal-600 shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">How it works</p>
          <p className="text-xs text-teal-600 dark:text-teal-300 mt-1">Upload PDF, TXT, or MD files here. Active documents are automatically indexed into the AI platform chatbot&apos;s knowledge base. Users chatting with the bot will get answers from these documents.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search knowledge artifacts..."
              value={knowledgeSearch}
              onChange={(e) => setKnowledgeSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 rounded-xl border border-teal-100 dark:border-teal-800/50">
                <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest leading-none mb-1">Total Logic</p>
                <p className="text-xl font-black text-teal-800 dark:text-teal-200">{knowledgeDocs.length}</p>
             </div>
          </div>
        </div>

        {knowledgeDocs.filter(d => d.title.toLowerCase().includes(knowledgeSearch.toLowerCase())).length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg tracking-tight">No matching knowledge nodes</p>
            <p className="text-sm text-slate-400 mt-2">Adjust your search parameters or provision new data.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400">
                <tr>
                  <th className="px-8 py-5">Knowledge Variant</th>
                  <th className="px-8 py-5">Indexing Status</th>
                  <th className="px-8 py-5">Source Node</th>
                  <th className="px-8 py-5">Timestamp</th>
                  <th className="px-8 py-5 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {knowledgeDocs.filter(d => d.title.toLowerCase().includes(knowledgeSearch.toLowerCase())).map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                          doc.file_extension === 'pdf' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' :
                          doc.file_extension === 'md' ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-500' :
                          'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500'
                        }`}>
                          <FileText size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-white leading-tight">{doc.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{doc.file_extension} Artifact</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${doc.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${doc.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {doc.is_active ? 'Provisioned & Active' : 'Standby'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center text-[8px] font-black text-white">
                             {doc.uploaded_by_username?.charAt(0) || 'A'}
                          </div>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">@{doc.uploaded_by_username || 'admin'}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-400">{new Date(doc.created_at).toLocaleDateString().replace(/\//g, '.')}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleToggleDocument(doc.id, doc.is_active)}
                          className={`p-2.5 rounded-xl transition-all ${
                            doc.is_active 
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:scale-110'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-teal-600'
                          }`}
                          title={doc.is_active ? "Deactivate logic" : "Activate logic"}
                        >
                          <FileUp size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl hover:scale-110 transition-all"
                          title="Purge artifact"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
