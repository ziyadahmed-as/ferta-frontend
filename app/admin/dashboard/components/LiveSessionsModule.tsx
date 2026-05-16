"use client";

import React from "react";
import { TrendingUp, PlusCircle, Calendar, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface LiveSessionsModuleProps {
  liveStreams: any[];
  setShowAddStreamModal: (show: boolean) => void;
  setSelectedStreamForSession: (stream: any) => void;
  setShowAddSessionModal: (show: boolean) => void;
  setEditStreamData: (stream: any) => void;
  setShowEditStreamModal: (show: boolean) => void;
  handleDeleteStream: (streamId: number) => void;
  setSelectedStream: (stream: any) => void;
  setShowDuplicateModal: (show: boolean) => void;
}

export const LiveSessionsModule: React.FC<LiveSessionsModuleProps> = ({
  liveStreams,
  setShowAddStreamModal,
  setSelectedStreamForSession,
  setShowAddSessionModal,
  setEditStreamData,
  setShowEditStreamModal,
  handleDeleteStream,
  setSelectedStream,
  setShowDuplicateModal,
}) => {
  return (
    <div className="space-y-12">
      <div className="gradient-primary p-16 rounded-[64px] relative overflow-hidden group shadow-2xl shadow-teal-500/20 border border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:scale-125 transition-all duration-1000" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[3px] rounded-full border border-white/20 mb-8">
              <TrendingUp size={14} /> Synchronous Orchestration Node
            </span>
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
              Live Session <br />
              <span className="opacity-60">Control Hub</span>
            </h2>
            <p className="text-teal-50 text-xl font-medium max-w-xl leading-relaxed opacity-90">Orchestrate and moderate high-fidelity synchronous learning experiences, session sequences, and faculty presence across the global registry.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white/10 backdrop-blur-3xl px-10 py-6 rounded-[40px] border border-white/20 shadow-2xl text-center min-w-[160px]">
              <p className="text-[10px] uppercase font-black text-teal-100 tracking-[3px] mb-2 opacity-60">Active Hubs</p>
              <p className="text-6xl font-black text-white tracking-tighter">{liveStreams.length}</p>
            </div>
            <button 
              onClick={() => setShowAddStreamModal(true)}
              className="w-full sm:w-auto h-24 px-12 bg-white text-slate-900 rounded-[40px] font-black text-xs uppercase tracking-[4px] shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4 group"
            >
              <PlusCircle size={24} className="group-hover:rotate-90 transition-transform" /> Provision Node
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {liveStreams.map((stream: any, sIdx: number) => {
          return (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.1 }}
              className="group bg-white dark:bg-slate-800 rounded-[56px] border border-slate-100 dark:border-slate-700 p-12 shadow-sm transition-all hover:shadow-2xl hover:shadow-teal-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-3 h-full bg-teal-500" />
              
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/5 space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 gradient-primary rounded-[32px] flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-teal-500/20">
                      {stream.title?.[0] || "L"}
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-tight mb-2 uppercase">{stream.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full uppercase tracking-widest border border-teal-100 dark:border-teal-800">@{stream.instructor_name}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stream.group_type} Architecture</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800/50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Density Tracking</p>
                      <div className="flex items-end gap-2">
                        <p className={`text-3xl font-black ${stream.enrollment_count >= (stream.max_students || 1) ? 'text-rose-500' : 'text-teal-600'}`}>{stream.enrollment_count}</p>
                        <p className="text-sm font-black text-slate-400 pb-1.5">/ {stream.max_students}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800/50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Operational Status</p>
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                        <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Active Signal</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => { setSelectedStreamForSession(stream); setShowAddSessionModal(true); }}
                      className="w-full py-6 bg-teal-600 text-white rounded-[28px] text-[10px] font-black uppercase tracking-[3px] shadow-2xl shadow-teal-500/30 hover:bg-teal-700 transition-all flex items-center justify-center gap-4 group"
                    >
                      <Calendar size={20} className="group-hover:scale-110 transition-transform" /> Provision Sequence
                    </button>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => { setEditStreamData(stream); setShowEditStreamModal(true); }}
                        className="flex-1 py-5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                      >
                        Configure Node
                      </button>
                      <button 
                        onClick={() => handleDeleteStream(stream.id)}
                        className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-[24px] flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                    {stream.enrollment_count >= (stream.max_students || 1) && (
                      <button 
                        onClick={() => { setSelectedStream(stream); setShowDuplicateModal(true); }}
                        className="w-full py-5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-[24px] text-[9px] font-black uppercase tracking-[4px] border-2 border-emerald-100 dark:border-emerald-800 animate-pulse"
                      >
                        Critical Density: Scale Cohort
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 border-l-2 border-slate-50 dark:border-slate-700/50 lg:pl-12 space-y-8">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[12px] font-black text-slate-800 dark:text-white uppercase tracking-[4px] flex items-center gap-3">
                      <TrendingUp size={16} className="text-teal-600" /> Knowledge Delivery Timeline
                    </h5>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stream.live_sessions?.length || 0} Sequences</span>
                  </div>
                  
                  <div className="space-y-6 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                    {stream.live_sessions && stream.live_sessions.length > 0 ? stream.live_sessions.map((session: any, idx: number) => (
                      <div key={session.id} className="relative group/session bg-slate-50 dark:bg-slate-900/30 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 hover:border-teal-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                          <div>
                            <p className="text-[9px] font-black text-teal-600 uppercase tracking-[2px] mb-2">Sequence Node 0{idx + 1}</p>
                            <h6 className="text-xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight mb-3">{session.title}</h6>
                            <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                              <span className="flex items-center gap-2"><Calendar size={14} className="text-teal-500" /> {new Date(session.scheduled_at).toLocaleDateString()}</span>
                              <span className="flex items-center gap-2"><Clock size={14} className="text-teal-500" /> {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                          {session.meeting_link && (
                            <a 
                              href={session.meeting_link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3"
                            >
                              Signal Link <PlusCircle size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    )) : (
                      <div className="py-24 text-center bg-slate-50/50 dark:bg-slate-900/10 rounded-[48px] border-4 border-dashed border-slate-100 dark:border-slate-800">
                        <Calendar size={48} className="mx-auto text-slate-200 mb-6" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">No active sequences mapped.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        {liveStreams.length === 0 && (
          <div className="py-40 text-center bg-slate-50/30 dark:bg-slate-900/30 rounded-[80px] border-4 border-dashed border-slate-100 dark:border-slate-800">
            <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[40px] flex items-center justify-center shadow-2xl mx-auto mb-10 border border-slate-100 dark:border-slate-700">
              <TrendingUp size={64} className="text-slate-200" />
            </div>
            <h4 className="text-4xl font-black text-slate-700 dark:text-slate-300 tracking-tighter mb-4">Synchronous Hub Inactive</h4>
            <p className="text-slate-500 max-w-sm mx-auto text-xl font-medium leading-relaxed">No synchronous cohorts are currently registered in the administrative registry.</p>
          </div>
        )}
      </div>
    </div>
  );
};
