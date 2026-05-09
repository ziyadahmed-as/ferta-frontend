"use client";

import React from "react";
import { BookOpen, Tag, Users, DollarSign, Award, Eye, Edit, CheckCircle2, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CourseModalsProps {
  showCourseModal: boolean;
  setShowCourseModal: (show: boolean) => void;
  editCourseData: any;
  setEditCourseData: (data: any) => void;
  newCourse: any;
  setNewCourse: (course: any) => void;
  handleCourseSubmit: (e: React.FormEvent) => void;
  allUsers: any[];
  categories: any[];
  showInspectModal: boolean;
  setShowInspectModal: (show: boolean) => void;
  inspectCourse: any;
  handleCourseAction: (courseId: number, approve: boolean) => void;
}

export const CourseModals: React.FC<CourseModalsProps> = ({
  showCourseModal, setShowCourseModal, editCourseData, setEditCourseData, newCourse, setNewCourse, handleCourseSubmit,
  allUsers, categories,
  showInspectModal, setShowInspectModal, inspectCourse, handleCourseAction
}) => {
  return (
    <>
      <AnimatePresence>
        {showCourseModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowCourseModal(false); setEditCourseData(null); }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <BookOpen className="text-teal-600" size={20} />
                  {editCourseData ? "Modify Academic Node" : "Provision New Node"}
                </h3>
                <button 
                  onClick={() => { setShowCourseModal(false); setEditCourseData(null); }} 
                  title="Close Modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCourseSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Title</label>
                    <input 
                      required
                      type="text" 
                      title="Course Title"
                      placeholder="e.g. Full-Stack Dev Level 1"
                      value={editCourseData ? editCourseData.title : newCourse.title}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, title: e.target.value})
                        : setNewCourse({...newCourse, title: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">URL Slug</label>
                    <input 
                      required
                      type="text" 
                      title="URL Slug"
                      placeholder="full-stack-dev-1"
                      value={editCourseData ? editCourseData.slug : newCourse.slug}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, slug: e.target.value})
                        : setNewCourse({...newCourse, slug: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Academic Abstract (Description)</label>
                  <textarea 
                    title="Academic Abstract"
                    placeholder="Provide a high-fidelity summary..."
                    value={editCourseData ? editCourseData.description : newCourse.description}
                    onChange={e => editCourseData 
                      ? setEditCourseData({...editCourseData, description: e.target.value})
                      : setNewCourse({...newCourse, description: e.target.value})
                    }
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Type</label>
                    <select 
                      title="Course Type"
                      value={editCourseData ? editCourseData.course_type : newCourse.course_type}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, course_type: e.target.value})
                        : setNewCourse({...newCourse, course_type: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    >
                      <option value="VIDEO_BASED">Video-Based Course</option>
                      <option value="LIVE_STREAM">Live Stream Cohort</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Enrollment Price (USD)</label>
                    <input 
                      required
                      type="number" 
                      title="Price"
                      step="0.01"
                      value={editCourseData ? editCourseData.price : newCourse.price}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, price: e.target.value})
                        : setNewCourse({...newCourse, price: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Curator (Instructor)</label>
                    <select 
                      required
                      title="Select Curator"
                      value={editCourseData ? editCourseData.instructor : newCourse.instructor}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, instructor: e.target.value})
                        : setNewCourse({...newCourse, instructor: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    >
                      <option value="">Select Faculty Node...</option>
                      {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                        <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Taxonomy (Category)</label>
                    <select 
                      required
                      title="Select Taxonomy"
                      value={editCourseData ? editCourseData.category : newCourse.category}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, category: e.target.value})
                        : setNewCourse({...newCourse, category: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    >
                      <option value="">Select Domain...</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      title="Publish Status"
                      checked={editCourseData ? editCourseData.is_published : newCourse.is_published}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, is_published: e.target.checked})
                        : setNewCourse({...newCourse, is_published: e.target.checked})
                      }
                      className="w-5 h-5 rounded-lg border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-600 transition-colors">Publish to Platform Registry</span>
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => { setShowCourseModal(false); setEditCourseData(null); }}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {editCourseData ? "Sync Modifications" : "Launch Knowledge Node"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInspectModal && inspectCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInspectModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="flex flex-col lg:flex-row h-[85vh]">
                {/* Left: Artifact Visual & Identity */}
                <div className="lg:w-1/3 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 flex flex-col">
                  <div className="relative aspect-video lg:aspect-square overflow-hidden">
                    <img src={inspectCourse.thumbnail || "/api/placeholder/400/400"} alt="Artifact Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6">
                      <span className="px-3 py-1 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-2 inline-block shadow-lg">ID: MOD-{inspectCourse.id}</span>
                      <h3 className="text-2xl font-black text-white tracking-tighter leading-tight">{inspectCourse.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Faculty Custodian</h4>
                      <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-white text-sm font-black uppercase">
                          {inspectCourse.instructor_username?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-white leading-none mb-1">@{inspectCourse.instructor_username}</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Validated Faculty</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Institutional Category</h4>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-2xl">
                          <Tag size={20} />
                        </div>
                        <span className="text-lg font-black text-slate-700 dark:text-slate-200 tracking-tight">{inspectCourse.category_name || "Uncategorized"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Deep Analytics & Content */}
                <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
                  <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Artifact Deep-Inspection</h2>
                      <p className="text-xs text-slate-500 font-medium">Internal registry audit & performance monitoring</p>
                    </div>
                    <button id="closeInspectModal" aria-label="Close Modal" onClick={() => setShowInspectModal(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-rose-500 transition-all hover:rotate-90">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
                    {/* Performance Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3 text-cyan-600 mb-3">
                          <Users size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Enrolled Scholars</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800 dark:text-white">{inspectCourse.enrollment_count || 0}</p>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3 text-emerald-600 mb-3">
                          <DollarSign size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Total Yield (ETB)</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800 dark:text-white">{(inspectCourse.price * (inspectCourse.enrollment_count || 0)).toLocaleString()}</p>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3 text-amber-500 mb-3">
                          <Award size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Quality Rating</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800 dark:text-white">4.9</p>
                      </div>
                    </div>

                    {/* Descriptive Summary */}
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] pb-2 border-b border-slate-100 dark:border-slate-800">Intellectual Abstract</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {inspectCourse.description || "No intellectual abstract provided for this knowledge node."}
                      </p>
                    </div>

                    {/* Content Registry Preview */}
                    <div className="space-y-4">
                       <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Knowledge Components (Lessons)</h4>
                         <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 rounded-md">8 Artifacts</span>
                       </div>
                       <div className="grid grid-cols-1 gap-3">
                          {[1,2,3].map(i => (
                            <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group hover:border-teal-500 transition-all">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-xs font-black text-slate-400">0{i}</div>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Systematic Module {i}: Advanced Orchestration</span>
                              </div>
                              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                                <span className="text-[10px] font-black text-slate-400">12:45 MIN</span>
                                <Eye size={14} className="text-teal-500" />
                              </div>
                            </div>
                          ))}
                          <div className="text-center py-4">
                             <button className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline">View Full Registry Registry →</button>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="p-10 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex gap-4">
                    <button 
                      onClick={() => { setEditCourseData(inspectCourse); setShowCourseModal(true); setShowInspectModal(false); }}
                      className="flex-1 py-5 gradient-primary text-white text-xs font-black uppercase tracking-[3px] rounded-[24px] shadow-2xl shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                      <Edit size={18} /> Modify Registry Entry
                    </button>
                    {!inspectCourse.is_approved && inspectCourse.is_submitted && (
                      <button 
                        onClick={() => { handleCourseAction(inspectCourse.id, true); setShowInspectModal(false); }}
                        className="px-10 py-5 bg-emerald-600 text-white text-xs font-black uppercase tracking-[3px] rounded-[24px] shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 size={18} /> Authenticate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
