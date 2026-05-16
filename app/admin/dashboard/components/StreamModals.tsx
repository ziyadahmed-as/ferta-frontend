"use client";

import React from "react";
import { Plus, Calendar, XCircle, TrendingUp as TrendingUpIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StreamModalsProps {
  showDuplicateModal: boolean;
  setShowDuplicateModal: (show: boolean) => void;
  selectedStream: any;
  duplicateInstructorId: string;
  setDuplicateInstructorId: (id: string) => void;
  handleDuplicateStream: () => void;
  showAddStreamModal: boolean;
  setShowAddStreamModal: (show: boolean) => void;
  newStream: any;
  setNewStream: (stream: any) => void;
  handleCreateStream: (e: React.FormEvent) => void;
  allUsers: any[];
  showAddSessionModal: boolean;
  setShowAddSessionModal: (show: boolean) => void;
  selectedStreamForSession: any;
  newSession: any;
  setNewSession: (session: any) => void;
  handleCreateSession: (e: React.FormEvent) => void;
  showEditStreamModal: boolean;
  setShowEditStreamModal: (show: boolean) => void;
  editStreamData: any;
  setEditStreamData: (stream: any) => void;
  handleEditStreamSubmit: (e: React.FormEvent) => void;
}

export const StreamModals: React.FC<StreamModalsProps> = ({
  showDuplicateModal, setShowDuplicateModal, selectedStream, duplicateInstructorId, setDuplicateInstructorId, handleDuplicateStream,
  showAddStreamModal, setShowAddStreamModal, newStream, setNewStream, handleCreateStream, allUsers,
  showAddSessionModal, setShowAddSessionModal, selectedStreamForSession, newSession, setNewSession, handleCreateSession,
  showEditStreamModal, setShowEditStreamModal, editStreamData, setEditStreamData, handleEditStreamSubmit
}) => {
  return (
    <>
      <AnimatePresence>
        {showDuplicateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDuplicateModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-[48px] shadow-2xl p-10 border border-slate-200 dark:border-slate-700"
            >
              <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-[28px] flex items-center justify-center text-teal-600 mb-8 shadow-inner">
                 <TrendingUpIcon size={32} />
              </div>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter">Scale Cohort Node</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 leading-relaxed">Expand the synchronous registry for <b>{selectedStream?.title}</b> to accommodate rising intellectual demand.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Assigned Faculty ID</label>
                  <input 
                    type="number"
                    title="Instructor User ID"
                    placeholder="Enter Institutional Faculty ID..."
                    value={duplicateInstructorId}
                    onChange={(e) => setDuplicateInstructorId(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowDuplicateModal(false)}
                    className="flex-1 px-6 py-4 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    onClick={handleDuplicateStream}
                    className="flex-1 px-6 py-4 gradient-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-teal-500/30 hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    Launch Node
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddStreamModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddStreamModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-[48px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-10 border-b border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/30 flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter flex items-center gap-4">
                    <Plus className="text-teal-600" size={28} />
                    Provision Synchronous Node
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mt-1">Register a new real-time intellectual exchange cohort.</p>
                </div>
                <button 
                  onClick={() => setShowAddStreamModal(false)} 
                  className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100 dark:border-slate-700 transition-all"
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreateStream} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Cohort Designation (Title)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Advanced Crypto Strategies"
                      value={newStream.title}
                      onChange={e => setNewStream({...newStream, title: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Assigned Faculty Node</label>
                    <select 
                      required
                      value={newStream.instructor}
                      onChange={e => setNewStream({...newStream, instructor: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all appearance-none"
                    >
                      <option value="">Select Faculty...</option>
                      {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                        <option key={u.id} value={u.id}>{u.username} (@{u.id})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Intellectual Abstract</label>
                  <textarea 
                    placeholder="Provide a high-fidelity summary of the synchronous goals..."
                    value={newStream.description}
                    onChange={e => setNewStream({...newStream, description: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all h-32 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Temporal Sync</label>
                    <input 
                      required
                      type="datetime-local" 
                      value={newStream.scheduled_at}
                      onChange={e => setNewStream({...newStream, scheduled_at: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-xs font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Enrollment Value</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-600 font-black">$</span>
                       <input 
                        required
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        value={newStream.price}
                        onChange={e => setNewStream({...newStream, price: e.target.value})}
                        className="w-full pl-10 pr-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Cohort Density</label>
                    <select 
                      value={newStream.group_type}
                      onChange={e => setNewStream({...newStream, group_type: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all appearance-none"
                    >
                      <option value="VVIP">VVIP (Solo)</option>
                      <option value="VIP1">VIP1 (L5 Cluster)</option>
                      <option value="VIP2">VIP2 (L10 Cluster)</option>
                      <option value="NORMAL">Standard Registry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Connectivity Endpoint (Meeting Link)</label>
                  <input 
                    type="url" 
                    placeholder="https://zoom.us/j/..."
                    value={newStream.meeting_link}
                    onChange={e => setNewStream({...newStream, meeting_link: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  />
                </div>

                <div className="pt-6 flex gap-4 pb-2">
                  <button 
                    type="button"
                    onClick={() => setShowAddStreamModal(false)}
                    className="flex-1 px-8 py-5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-[24px] text-[10px] font-black uppercase tracking-[3px] hover:bg-slate-50 transition-all"
                  >
                    Abort Registry
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-8 py-5 gradient-primary text-white rounded-[24px] text-[10px] font-black uppercase tracking-[3px] shadow-2xl shadow-teal-500/30 hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    Launch Synchronous Node
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddSessionModal && selectedStreamForSession && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddSessionModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-[48px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-10 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter flex items-center gap-4">
                  <Calendar className="text-emerald-500" size={24} />
                  Provision Sequence Slot
                </h3>
                <button 
                  onClick={() => setShowAddSessionModal(false)} 
                  className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="px-10 py-4 bg-teal-50 dark:bg-teal-900/20 border-b border-teal-100 dark:border-teal-800/50">
                <p className="text-[10px] font-black text-teal-600 uppercase tracking-[2px]">Target Node: <span className="text-teal-800 dark:text-teal-200">{selectedStreamForSession.title}</span></p>
              </div>

              <form onSubmit={handleCreateSession} className="p-10 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Sequence Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Genesis Block Discovery"
                    value={newSession.title}
                    onChange={e => setNewSession({...newSession, title: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Temporal Sync Point</label>
                  <input 
                    required
                    type="datetime-local" 
                    value={newSession.scheduled_at}
                    onChange={e => setNewSession({...newSession, scheduled_at: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-xs font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Connectivity Endpoint</label>
                  <input 
                    type="url" 
                    placeholder="https://zoom.us/j/..."
                    value={newSession.meeting_link}
                    onChange={e => setNewSession({...newSession, meeting_link: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  />
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddSessionModal(false)}
                    className="flex-1 px-8 py-4 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    Commit Sequence
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditStreamModal && editStreamData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-[48px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-10 border-b border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/30 flex items-center justify-between">
                <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter flex items-center gap-4">
                  <TrendingUpIcon className="text-teal-600" size={28} />
                  Re-Orchestrate Node
                </h3>
                <button 
                  onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }} 
                  className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm"
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              <form onSubmit={handleEditStreamSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Node Designation</label>
                    <input 
                      required
                      type="text" 
                      value={editStreamData.title}
                      onChange={e => setEditStreamData({...editStreamData, title: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Faculty Registry</label>
                    <select 
                      required
                      value={editStreamData.instructor}
                      onChange={e => setEditStreamData({...editStreamData, instructor: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all appearance-none"
                    >
                      <option value="">Select Faculty...</option>
                      {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                        <option key={u.id} value={u.id}>{u.username} (@{u.id})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Temporal Sync</label>
                    <input 
                      required
                      type="datetime-local" 
                      value={editStreamData.scheduled_at ? new Date(editStreamData.scheduled_at).toISOString().slice(0, 16) : ""}
                      onChange={e => setEditStreamData({...editStreamData, scheduled_at: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-xs font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Enrollment Value</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      value={editStreamData.price}
                      onChange={e => setEditStreamData({...editStreamData, price: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <input 
                        type="checkbox"
                        checked={editStreamData.is_active}
                        onChange={e => setEditStreamData({...editStreamData, is_active: e.target.checked})}
                        className="w-6 h-6 text-teal-600 border-slate-300 rounded-[8px] focus:ring-teal-500 transition-all cursor-pointer"
                    />
                    <div>
                      <label className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Node Active Protocol</label>
                      <p className="text-[10px] text-slate-500 font-medium">When active, this node is visible in the public scholastic registry.</p>
                    </div>
                </div>

                <div className="pt-6 flex gap-4 pb-2">
                  <button 
                    type="button"
                    onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }}
                    className="flex-1 px-8 py-5 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-[24px] text-[10px] font-black uppercase tracking-[3px] hover:bg-slate-50 transition-all"
                  >
                    Abort Changes
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-8 py-5 gradient-primary text-white rounded-[24px] text-[10px] font-black uppercase tracking-[3px] shadow-2xl shadow-teal-500/30 hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    Commit Orchestration
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
