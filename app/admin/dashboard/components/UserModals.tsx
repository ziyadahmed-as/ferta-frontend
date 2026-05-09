"use client";

import React from "react";
import { UserPlus, Edit, ShieldCheck, Award, Mail, User, TrendingUp, Globe, Link as LinkIcon, ChevronRight, X, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserModalsProps {
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  newUser: any;
  setNewUser: (user: any) => void;
  handleAddUser: (e: React.FormEvent) => void;
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  editUser: any;
  setEditUser: (user: any) => void;
  handleEditSubmit: (e: React.FormEvent) => void;
  showDetailModal: boolean;
  setShowDetailModal: (show: boolean) => void;
  userDetail: any;
}

export const UserModals: React.FC<UserModalsProps> = ({
  showAddModal, setShowAddModal, newUser, setNewUser, handleAddUser,
  showEditModal, setShowEditModal, editUser, setEditUser, handleEditSubmit,
  showDetailModal, setShowDetailModal, userDetail
}) => {
  return (
    <>
      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
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
                  <UserPlus className="text-teal-600" size={20} />
                  Provision New Identity
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)} 
                  aria-label="Close modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Network Username</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Satoshi_99"
                    value={newUser.username}
                    onChange={e => setNewUser({...newUser, username: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Communication Hub (Email)</label>
                  <input 
                    required
                    type="email" 
                    placeholder="satoshi@fatra.academy"
                    value={newUser.email}
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Access Protocol (Password)</label>
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    value={newUser.password}
                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Institutional Role</label>
                  <select 
                    value={newUser.role}
                    aria-label="New user role"
                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  >
                    <option value="STUDENT">Student (Default Node)</option>
                    <option value="INSTRUCTOR">Instructor (Faculty)</option>
                    <option value="ADMIN">Admin (Protocol Moderator)</option>
                    <option value="SUPER_ADMIN">Super Admin (System Architect)</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Confirm Provision
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && editUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
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
                  <Edit className="text-teal-600" size={20} />
                  Modify Network Identity
                </h3>
                <button 
                  onClick={() => setShowEditModal(false)} 
                  aria-label="Close edit modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Network Username</label>
                  <input 
                    required
                    type="text" 
                    title="User Network Alias"
                    placeholder="Username"
                    value={editUser.username}
                    onChange={e => setEditUser({...editUser, username: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Communication Hub (Email)</label>
                  <input 
                    required
                    type="email" 
                    title="User Communication Hub"
                    placeholder="Email Address"
                    value={editUser.email}
                    onChange={e => setEditUser({...editUser, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Access Protocol (Password - Leave blank to keep current)</label>
                  <input 
                    type="password" 
                    title="Password"
                    placeholder="••••••••"
                    value={editUser.password || ""}
                    onChange={e => setEditUser({...editUser, password: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">First Name</label>
                    <input 
                      type="text" 
                      title="First Name"
                      placeholder="e.g. John"
                      value={editUser.first_name || ""}
                      onChange={e => setEditUser({...editUser, first_name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Last Name</label>
                    <input 
                      type="text" 
                      title="Last Name"
                      placeholder="e.g. Doe"
                      value={editUser.last_name || ""}
                      onChange={e => setEditUser({...editUser, last_name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Biography / About</label>
                  <textarea 
                    title="User Biography"
                    placeholder="Tell us about this user..."
                    value={editUser.bio || ""}
                    onChange={e => setEditUser({...editUser, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Institutional Role</label>
                  <select 
                    value={editUser.role}
                    title="Institutional Role"
                    aria-label="Edit user role"
                    onChange={e => setEditUser({...editUser, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  >
                    <option value="STUDENT">Student (Default Node)</option>
                    <option value="INSTRUCTOR">Instructor (Faculty)</option>
                    <option value="ADMIN">Admin (Protocol Moderator)</option>
                    <option value="SUPER_ADMIN">Super Admin (System Architect)</option>
                  </select>
                </div>

                {editUser.role === 'INSTRUCTOR' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-700 mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Expertise</label>
                        <input 
                          type="text" 
                          title="Expertise"
                          placeholder="e.g. Mathematics"
                          value={editUser.expertise || ""}
                          onChange={e => setEditUser({...editUser, expertise: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Education</label>
                        <input 
                          type="text" 
                          title="Education"
                          placeholder="e.g. PhD in AI"
                          value={editUser.education_level || ""}
                          onChange={e => setEditUser({...editUser, education_level: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Professional Website</label>
                        <input 
                          type="text" 
                          title="Website"
                          placeholder="https://..."
                          value={editUser.website || ""}
                          onChange={e => setEditUser({...editUser, website: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Portfolio Link</label>
                        <input 
                          type="text" 
                          title="Portfolio"
                          placeholder="https://..."
                          value={editUser.portfolio || ""}
                          onChange={e => setEditUser({...editUser, portfolio: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update Identity
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetailModal && userDetail && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              {/* Institutional Banner */}
              <div className="h-40 gradient-primary relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <button 
                  onClick={() => setShowDetailModal(false)}
                  title="Close Institutional View"
                  className="absolute top-6 right-6 p-2.5 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-xl transition-all hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Core Identity Section */}
              <div className="px-10 pb-10 -mt-16 relative">
                <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
                  <div className="relative group">
                    <div className="w-36 h-36 rounded-[36px] bg-white dark:bg-slate-800 border-8 border-white dark:border-slate-900 flex items-center justify-center text-5xl font-black text-teal-600 shadow-2xl relative z-10 overflow-hidden">
                      {userDetail.username?.charAt(0)?.toUpperCase() || "U"}
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg z-20 border-4 border-white dark:border-slate-900">
                      <ShieldCheck size={24} />
                    </div>
                  </div>
                  
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">
                        {userDetail.username}
                      </h3>
                      {userDetail.role === 'SUPER_ADMIN' && (
                        <span className="px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black uppercase tracking-tighter rounded-md">Architect</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-widest rounded-xl border border-teal-100/50 dark:border-teal-800/30">
                        Institutional Role: {userDetail.role}
                      </span>
                      {userDetail.is_approved_instructor && (
                        <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 border border-emerald-100/50 dark:border-emerald-800/30">
                           <Award size={14} /> Verified Professional
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Section: Core Bio & Meta */}
                  <div className="lg:col-span-2 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Communication Registry</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                              <Mail size={18} className="text-teal-500" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Endpoint</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{userDetail.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                              <User size={18} className="text-teal-500" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Legal Identity</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{userDetail.first_name} {userDetail.last_name || '(REDACTED)'}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Platform Status</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <span className="text-xs font-bold text-slate-500">Node Connectivity</span>
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                              <span className="text-xs font-black text-slate-700 dark:text-slate-200">ACTIVE</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <span className="text-xs font-bold text-slate-500">Security Clearance</span>
                            <span className="text-xs font-black text-teal-600 uppercase">Level 4</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Biological Summary</h4>
                      <div className="relative p-6 bg-teal-50/30 dark:bg-teal-900/10 rounded-[28px] border border-teal-100/50 dark:border-teal-800/30">
                        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
                          &quot;{userDetail.bio || "No biological summary provided to the registry."}&quot;
                        </p>
                        <div className="absolute -top-3 -left-3 bg-white dark:bg-slate-900 p-2 text-teal-500">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L20.017 3C21.1216 3 22.017 3.89543 22.017 5V19C22.017 20.1046 21.1216 21 20.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H4.01697C2.9124 8 2.01697 7.10457 2.01697 6V3L8.01697 3C9.12154 3 10.017 3.89543 10.017 5V19C10.017 20.1046 9.12154 21 8.01697 21H2.01697Z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Scorecard & Activity */}
                  <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-teal-500/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-all duration-1000" />
                      <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-6">Performance Scorecard</h4>
                      <div className="space-y-6 relative z-10">
                        <div>
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-bold text-slate-400">Unified Trust Score</span>
                            <span className="text-3xl font-black tracking-tighter">{(userDetail.points || 0).toLocaleString()}</span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (userDetail.points || 0) / 100)}%` }}
                              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Global Ranking</p>
                            <p className="text-xl font-bold tracking-tighter">{userDetail.peer_ranking || "TOP 0.1%"}</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Impact Radius</p>
                            <p className="text-xl font-bold tracking-tighter">8.4x</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Knowledge Portfolio</h4>
                      <div className="flex flex-wrap gap-2">
                        {userDetail.role === 'INSTRUCTOR' ? (
                          (userDetail.taught_courses || []).length > 0 ? userDetail.taught_courses.map((c: string, i: number) => (
                            <span key={i} className="px-3 py-2 bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800/50 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 shadow-sm transition-all hover:scale-105">{c}</span>
                          )) : <p className="text-xs text-slate-400 italic">No authored nodes registered in repository.</p>
                        ) : (
                          (userDetail.enrolled_courses || []).length > 0 ? userDetail.enrolled_courses.map((c: string, i: number) => (
                            <span key={i} className="px-3 py-2 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 shadow-sm transition-all hover:scale-105">{c}</span>
                          )) : <p className="text-xs text-slate-400 italic">Currently unsynced from primary Knowledge Nodes.</p>
                        )}
                      </div>
                    </div>

                    {userDetail.role === 'INSTRUCTOR' && (
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border border-slate-100 dark:border-slate-700/50">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-3">Professional Specialization</h4>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
                            <TrendingUp size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{userDetail.expertise || 'General Scholastics'}</p>
                            <p className="text-xs text-slate-500">{userDetail.education_level}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-white dark:bg-slate-700 rounded-lg text-[10px] font-bold shadow-sm">{userDetail.years_of_experience || 0}+ Years</span>
                          <span className="px-2 py-1 bg-white dark:bg-slate-700 rounded-lg text-[10px] font-bold shadow-sm">Verified Credentials</span>
                        </div>
                      </div>
                    )}

                    {userDetail.role === 'INSTRUCTOR' && (
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border border-slate-100 dark:border-slate-700/50 mt-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-3">Professional Connections</h4>
                        <div className="space-y-3">
                          {userDetail.website && (
                            <a 
                              href={userDetail.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all border border-slate-100 dark:border-slate-700"
                            >
                              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/40 rounded-lg flex items-center justify-center text-teal-600">
                                <Globe size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Website</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{userDetail.website}</p>
                              </div>
                              <ChevronRight size={14} className="text-slate-300" />
                            </a>
                          )}
                          {userDetail.portfolio && (
                            <a 
                              href={userDetail.portfolio} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all border border-slate-100 dark:border-slate-700"
                            >
                              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900/40 rounded-lg flex items-center justify-center text-sky-600">
                                <LinkIcon size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Portfolio</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{userDetail.portfolio}</p>
                              </div>
                              <ChevronRight size={14} className="text-slate-300" />
                            </a>
                          )}
                          {!userDetail.website && !userDetail.portfolio && (
                            <p className="text-xs text-slate-400 italic text-center py-2">No external links registered.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex gap-4 pt-10 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => { setShowDetailModal(false); setEditUser(userDetail); setShowEditModal(true); }}
                    className="flex-1 py-5 gradient-primary text-white text-xs font-black uppercase tracking-[3px] rounded-[24px] shadow-2xl shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Modify Institutional Record
                  </button>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="px-10 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-[3px] rounded-[24px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    Decommission View
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
