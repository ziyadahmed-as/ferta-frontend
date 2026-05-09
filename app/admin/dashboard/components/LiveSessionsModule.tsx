"use client";

import React from "react";
import { TrendingUp, PlusCircle, Calendar, Trash2 } from "lucide-react";

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
    <div className="space-y-8">
      <div className="gradient-primary-soft p-12 rounded-[48px] relative overflow-hidden group border border-teal-100/50 dark:border-teal-900/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-125 transition-all duration-1000" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter flex items-center gap-5">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl text-teal-600">
                <TrendingUp size={36} />
              </div>
              Live Session Hub
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xl font-medium opacity-80 max-w-xl leading-relaxed">Orchestrate and moderate synchronous learning experiences, session slots, and faculty presence.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl px-8 py-5 rounded-[32px] border border-white/60 shadow-2xl shadow-teal-500/10 text-center">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-[3px] mb-1">Active Hubs</p>
              <p className="text-5xl font-black text-teal-600 tracking-tighter">{liveStreams.length}</p>
            </div>
            <button 
              onClick={() => setShowAddStreamModal(true)}
              className="w-full sm:w-auto h-20 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black text-xs uppercase tracking-[3px] shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4"
            >
              <PlusCircle size={24} /> New Session
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {liveStreams.map((stream: any) => (
          <div key={stream.id} className="group bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700/50 p-10 shadow-sm transition-all hover:shadow-2xl hover:shadow-teal-500/10 border-l-8 border-l-teal-600">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/3 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 gradient-primary rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-xl">
                    {stream.title?.[0] || "L"}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter leading-tight">{stream.title}</h4>
                    <p className="text-sm font-bold text-teal-600 dark:text-teal-400">@{stream.instructor_name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Utilization</p>
                    <div className="flex items-end gap-1">
                      <p className={`text-xl font-black ${stream.enrollment_count >= stream.max_students ? 'text-rose-500' : 'text-emerald-500'}`}>{stream.enrollment_count}</p>
                      <p className="text-xs font-bold text-slate-400 pb-1">/ {stream.max_students}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <p className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase">Live</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => { setSelectedStreamForSession(stream); setShowAddSessionModal(true); }}
                    className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white rounded-[24px] text-xs font-black uppercase tracking-[2px] shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-3"
                  >
                    <Calendar size={18} /> Add Schedule Slot
                  </button>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { setEditStreamData(stream); setShowEditStreamModal(true); }}
                      className="flex-1 py-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      Modify
                    </button>
                    <button 
                      onClick={() => handleDeleteStream(stream.id)}
                      title="Delete Cohort"
                      className="px-6 py-4 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-[22px] hover:bg-rose-100 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {stream.enrollment_count >= stream.max_students && (
                    <button 
                      onClick={() => { setSelectedStream(stream); setShowDuplicateModal(true); }}
                      className="w-full py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 shadow-sm"
                    >
                      Scale Cohort (Full)
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 border-l border-slate-100 dark:border-slate-700 lg:pl-10 space-y-6">
                <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[3px] flex items-center gap-3">
                  <TrendingUp size={14} /> Knowledge Delivery Timeline
                </h5>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {stream.live_sessions && stream.live_sessions.length > 0 ? stream.live_sessions.map((session: any) => (
                    <div key={session.id} className="relative group/session bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-teal-500/30 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h6 className="text-base font-black text-slate-800 dark:text-white mb-2 leading-none">{session.title}</h6>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-teal-500" /> {new Date(session.scheduled_at).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-teal-500" /> {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        {session.meeting_link && (
                          <a 
                            href={session.meeting_link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="px-6 py-2.5 bg-white dark:bg-slate-800 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
                          >
                            Meet Link <PlusCircle size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/20 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No active sessions mapped.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {liveStreams.length === 0 && (
          <div className="py-32 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[64px] border-4 border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl mx-auto mb-8">
              <TrendingUp size={48} className="text-slate-300" />
            </div>
            <h4 className="text-3xl font-black text-slate-700 dark:text-slate-300 tracking-tighter">Synchronous Learning Inactive</h4>
            <p className="text-slate-500 max-w-sm mx-auto mt-4 text-lg">No synchronous cohorts are currently registered in the administrative registry.</p>
          </div>
        )}
      </div>
    </div>
  );
};
