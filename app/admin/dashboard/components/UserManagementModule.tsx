"use client";

import React from "react";
import { Users, Plus, Search, Filter, Eye, Edit, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ShieldAlert, Check, X, CheckCircle2, FileText } from "lucide-react";

interface UserManagementModuleProps {
  stats: any;
  currentUsers: any[];
  filteredUsers: any[];
  userSearch: string;
  setUserSearch: (search: string) => void;
  roleFilter: string;
  setRoleFilter: (filter: string) => void;
  userTab: string;
  setUserTab: (tab: string) => void;
  setShowAddModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  setEditUser: (user: any) => void;
  setShowDetailModal: (show: boolean) => void;
  setUserDetail: (user: any) => void;
  handleDeleteUser: (userId: number) => void;
  handleInstructorAction: (userId: number, approve: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  actionLoading: number | null;
}

export const UserManagementModule: React.FC<UserManagementModuleProps> = ({
  stats,
  currentUsers,
  filteredUsers,
  userSearch,
  setUserSearch,
  roleFilter,
  setRoleFilter,
  userTab,
  setUserTab,
  setShowAddModal,
  setShowEditModal,
  setEditUser,
  setShowDetailModal,
  setUserDetail,
  handleDeleteUser,
  handleInstructorAction,
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  actionLoading,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="welcome-banner p-6 rounded-2xl flex-1">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight flex items-center gap-2">
            <Users className="text-teal-600" size={24} />
            User Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Control platform access and instructor nodes</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} /> Add New User
        </button>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit border border-slate-200 dark:border-slate-700">
        <button 
          onClick={() => setUserTab("all")}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${userTab === "all" ? "bg-white dark:bg-slate-700 text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
        >
          All Platform Users
        </button>
        <button 
          onClick={() => setUserTab("applications")}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${userTab === "applications" ? "bg-white dark:bg-slate-700 text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
        >
          Node Applications
          {stats?.pending_instructors?.length > 0 && (
            <span className="bg-teal-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {stats?.pending_instructors?.length}
            </span>
          )}
        </button>
      </div>

      {userTab === "all" ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter size={18} className="text-slate-400" />
              <select 
                value={roleFilter}
                title="Filter by role"
                aria-label="Filter by role"
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="INSTRUCTOR">Instructors</option>
                <option value="ADMIN">Admins</option>
                <option value="SUPER_ADMIN">Super Admins</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">User Identity</th>
                  <th className="px-6 py-4">Institutional Role</th>
                  <th className="px-6 py-4">Registry / Expertise</th>
                  <th className="px-6 py-4">Knowledge Nodes</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {currentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">#{u.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white text-xs font-bold">{u.username?.[0]?.toUpperCase() || "U"}</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{u.username}</p>
                          <p className="text-[10px] text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        u.role === 'SUPER_ADMIN' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 
                        u.role === 'ADMIN' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 
                        u.role === 'INSTRUCTOR' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400' :
                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      {u.role === 'INSTRUCTOR' ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">
                            {u.expertise || 'General Instruction'}
                          </span>
                          <span className="text-[10px] text-slate-400">{u.education_level || 'Faculty'}</span>
                        </div>
                      ) : u.role === 'STUDENT' ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                            {u.points || 0} Unified Points
                          </span>
                          <span className="text-[10px] text-slate-400">Active Scholar</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">System Admin</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {u.role === 'INSTRUCTOR' && (u.taught_courses || []).length > 0 ? (
                          u.taught_courses.map((c: string, idx: number) => (
                            <span key={idx} className="text-[9px] bg-teal-50 dark:bg-teal-900/20 text-teal-600 px-1.5 py-0.5 rounded border border-teal-100 dark:border-teal-800">
                              {c}
                            </span>
                          ))
                        ) : u.role === 'STUDENT' && (u.enrolled_courses || []).length > 0 ? (
                          u.enrolled_courses.map((c: string, idx: number) => (
                            <span key={idx} className="text-[9px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-800">
                              {c}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400">No activity logs</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setUserDetail(u); setShowDetailModal(true); }}
                          title="View Detail"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all hover:bg-cyan-100 dark:hover:bg-cyan-900/40"
                        >
                          <Eye size={14} /> Detail
                        </button>
                        <button 
                          onClick={() => { setEditUser(u); setShowEditModal(true); }}
                          title="Edit User"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all hover:bg-teal-100 dark:hover:bg-teal-900/40"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(u.id)} 
                          title="Delete User"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all hover:bg-rose-100 dark:hover:bg-rose-900/40"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">
                Showing <span className="text-slate-800 dark:text-slate-200">{startIndex + 1}</span> to <span className="text-slate-800 dark:text-slate-200">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of <span className="text-slate-800 dark:text-slate-200">{filteredUsers.length}</span> nodes
              </p>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  title="First Page"
                  className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  <ChevronsLeft size={16} />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  title="Previous Page"
                  className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          currentPage === pageNum 
                            ? "bg-teal-600 text-white shadow-md shadow-teal-500/20" 
                            : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  title="Next Page"
                  className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
                <button 
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  title="Last Page"
                  className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(stats?.pending_instructors || []).map((app: any) => (
            <div key={app.id} className="group relative bg-white dark:bg-slate-800 rounded-[32px] border border-slate-200 dark:border-slate-700/50 p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-teal-500/10">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-lg relative shrink-0">
                  {app.username?.[0]?.toUpperCase() || "C"}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center border-4 border-white dark:border-slate-800">
                    <ShieldAlert size={12} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-black text-xl text-slate-800 dark:text-white truncate tracking-tight">{app.username}</h4>
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md">Pending Validation</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mb-4">{app.email}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-[10px] font-bold text-teal-600 uppercase border border-teal-100 dark:border-teal-800">Expertise: {app.expertise || 'General'}</div>
                      <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-[10px] font-bold text-blue-600 uppercase border border-blue-100 dark:border-blue-800">Experience: {app.years_of_experience}y</div>
                      <div className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-[10px] font-bold text-purple-600 uppercase border border-purple-100 dark:border-purple-800">{app.education_level || 'Faculty'}</div>
                      <div className="px-3 py-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg text-[10px] font-bold text-slate-500 uppercase">{app.instructor_type?.replace('_', ' ') || 'Instructor'}</div>
                    </div>

                    {app.cv_file && (
                      <a 
                        href={app.cv_file} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[10px] font-black text-cyan-600 uppercase tracking-widest hover:text-cyan-700 transition-colors bg-cyan-50 dark:bg-cyan-900/20 w-fit px-4 py-2 rounded-xl border border-cyan-100 dark:border-cyan-800"
                      >
                        <FileText size={14} /> Open CV Registry
                      </a>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleInstructorAction(app.id, true)} 
                      disabled={actionLoading === app.id}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Check size={14} /> 
                      <span>{actionLoading === app.id ? "Validating..." : "Grant Node Access"}</span>
                    </button>
                    <button 
                      onClick={() => handleInstructorAction(app.id, false)} 
                      disabled={actionLoading === app.id}
                      title="Decline Node Access Request"
                      className="px-6 py-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 transition-all disabled:opacity-50"
                    >
                      <X size={14} /> 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!stats?.pending_instructors || stats.pending_instructors.length === 0) && (
            <div className="col-span-full py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <h4 className="text-lg font-black text-slate-800 dark:text-white">Protocol Clear</h4>
              <p className="text-sm text-slate-500">No pending instructor applications found in the registry.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
