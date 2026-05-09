"use client";

import React from "react";
import { Plus, Calendar, XCircle } from "lucide-react";
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">Scale Cohort Node</h3>
              <p className="text-sm text-slate-500 mb-6">Create a duplicate stream for <b>{selectedStream?.title}</b> to handle excess demand.</p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Assigned Faculty ID</label>
                  <input 
                    type="number"
                    title="Instructor User ID"
                    placeholder="Enter Instructor User ID"
                    value={duplicateInstructorId}
                    onChange={(e) => setDuplicateInstructorId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setShowDuplicateModal(false)}
                    className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl text-sm font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDuplicateStream}
                    className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20"
                  >
                    Launch Stream
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
                  <Plus className="text-teal-600" size={20} />
                  Create Live Course
                </h3>
                <button 
                  onClick={() => setShowAddStreamModal(false)} 
                  title="Close Modal"
                  aria-label="Close"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCreateStream} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto w-[calc(100%+8px)] sm:w-auto -mr-2 pr-2 sm:mr-0 sm:pr-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Title</label>
                  <input 
                    required
                    type="text" 
                    title="Course Title"
                    placeholder="e.g. Advanced Crypto Strategies"
                    value={newStream.title}
                    onChange={e => setNewStream({...newStream, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Stream Description"
                    placeholder="What will students learn?"
                    value={newStream.description}
                    onChange={e => setNewStream({...newStream, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Instructor</label>
                  <select 
                    required
                    title="Select Instructor"
                    value={newStream.instructor}
                    onChange={e => setNewStream({...newStream, instructor: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  >
                    <option value="">Select Instructor...</option>
                    {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                      <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Initial Schedule</label>
                    <input 
                      required
                      type="datetime-local" 
                      title="Initial Schedule Date"
                      value={newStream.scheduled_at}
                      onChange={e => setNewStream({...newStream, scheduled_at: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Price (USD)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      title="Course Price"
                      placeholder="0.00"
                      value={newStream.price}
                      onChange={e => setNewStream({...newStream, price: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Meeting Link</label>
                  <input 
                    type="url" 
                    placeholder="https://zoom.us/j/..."
                    value={newStream.meeting_link}
                    onChange={e => setNewStream({...newStream, meeting_link: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Group Type</label>
                  <select 
                    title="Group Type"
                    value={newStream.group_type}
                    onChange={e => setNewStream({...newStream, group_type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  >
                    <option value="VVIP">VVIP (1 Student)</option>
                    <option value="VIP1">VIP1 (5 Students)</option>
                    <option value="VIP2">VIP2 (10 Students)</option>
                    <option value="NORMAL">Normal (100 Students)</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3 pb-2">
                  <button 
                    type="button"
                    onClick={() => setShowAddStreamModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Create Course
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
                  <Calendar className="text-emerald-500" size={20} />
                  Add Schedule / Session
                </h3>
                <button 
                  onClick={() => setShowAddSessionModal(false)} 
                  title="Close"
                  aria-label="Close"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="px-6 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500">Scheduling for course:</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{selectedStreamForSession.title}</p>
              </div>

              <form onSubmit={handleCreateSession} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Session Title</label>
                  <input 
                    required
                    type="text" 
                    title="Session Title"
                    placeholder="e.g. Genesis Block Node"
                    value={newSession.title}
                    onChange={e => setNewSession({...newSession, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Session Description"
                    placeholder="Technical nodes and discovery..."
                    value={newSession.description}
                    onChange={e => setNewSession({...newSession, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Time & Date</label>
                  <input 
                    required
                    type="datetime-local" 
                    title="Time & Date"
                    value={newSession.scheduled_at}
                    onChange={e => setNewSession({...newSession, scheduled_at: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Meeting Link</label>
                  <input 
                    type="url" 
                    title="Meeting Link"
                    placeholder="https://zoom.us/j/..."
                    value={newSession.meeting_link}
                    onChange={e => setNewSession({...newSession, meeting_link: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddSessionModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Save Schedule
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
                  <Plus className="text-teal-600" size={20} />
                  Modify Live Course
                </h3>
                <button 
                  onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }} 
                  title="Close Modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleEditStreamSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Title</label>
                  <input 
                    required
                    type="text" 
                    title="Update Course Title"
                    placeholder="e.g. Advanced Crypto Strategies"
                    value={editStreamData.title}
                    onChange={e => setEditStreamData({...editStreamData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Update Stream Description"
                    placeholder="Description"
                    value={editStreamData.description}
                    onChange={e => setEditStreamData({...editStreamData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Instructor</label>
                  <select 
                    required
                    title="Select Instructor"
                    value={editStreamData.instructor}
                    onChange={e => setEditStreamData({...editStreamData, instructor: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  >
                    <option value="">Select Instructor...</option>
                    {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                      <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Scheduled At</label>
                    <input 
                      required
                      type="datetime-local" 
                      title="Update Schedule"
                      value={editStreamData.scheduled_at ? new Date(editStreamData.scheduled_at).toISOString().slice(0, 16) : ""}
                      onChange={e => setEditStreamData({...editStreamData, scheduled_at: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Price (USD)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      title="Course Price"
                      placeholder="0.00"
                      value={editStreamData.price}
                      onChange={e => setEditStreamData({...editStreamData, price: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Meeting Link</label>
                  <input 
                    type="url" 
                    placeholder="https://zoom.us/j/..."
                    value={editStreamData.meeting_link}
                    onChange={e => setEditStreamData({...editStreamData, meeting_link: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Group Type</label>
                  <select 
                    value={editStreamData.group_type}
                    title="Select Group Type"
                    onChange={e => setEditStreamData({...editStreamData, group_type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  >
                    <option value="VVIP">VVIP (1 Student)</option>
                    <option value="VIP1">VIP1 (5 Students)</option>
                    <option value="VIP2">VIP2 (10 Students)</option>
                    <option value="NORMAL">Normal (100 Students)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox"
                        title="Toggle Active Status"
                        checked={editStreamData.is_active}
                        onChange={e => setEditStreamData({...editStreamData, is_active: e.target.checked})}
                        className="w-4 h-4 text-teal-600 border-slate-300 rounded"
                    />
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Is Active</label>
                </div>

                <div className="pt-4 flex gap-3 pb-2">
                  <button 
                    type="button"
                    onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update Stream
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
