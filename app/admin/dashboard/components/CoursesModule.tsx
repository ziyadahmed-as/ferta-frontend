"use client";

import React from "react";
import { 
  BookOpen, 
  PlusCircle, 
  Search, 
  Filter, 
  LayoutDashboard, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  ShieldAlert, 
  XCircle, 
  Book, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

interface CoursesModuleProps {
  allCourses: any[];
  courseSearch: string;
  setCourseSearch: (search: string) => void;
  courseTab: string;
  setCourseTab: (tab: string) => void;
  coursePage: number;
  setCoursePage: (page: number | ((prev: number) => number)) => void;
  courseItemsPerPage: number;
  setEditCourseData: (course: any) => void;
  setShowCourseModal: (show: boolean) => void;
  setInspectCourse: (course: any) => void;
  setShowInspectModal: (show: boolean) => void;
  handleDeleteCourse: (courseId: number) => void;
  handleCourseAction: (courseId: number, approve: boolean) => void;
}

export const CoursesModule: React.FC<CoursesModuleProps> = ({
  allCourses,
  courseSearch,
  setCourseSearch,
  courseTab,
  setCourseTab,
  coursePage,
  setCoursePage,
  courseItemsPerPage,
  setEditCourseData,
  setShowCourseModal,
  setInspectCourse,
  setShowInspectModal,
  handleDeleteCourse,
  handleCourseAction,
}) => {
  const filteredCourses = allCourses.filter(c => 
    courseSearch === "" || 
    (c.title || "").toLowerCase().includes(courseSearch.toLowerCase())
  );
  
  const totalCoursePages = Math.ceil(filteredCourses.length / courseItemsPerPage);
  const courseStartIndex = (coursePage - 1) * courseItemsPerPage;
  const currentCourses = filteredCourses.slice(courseStartIndex, courseStartIndex + courseItemsPerPage);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="gradient-primary-soft p-12 rounded-[48px] relative overflow-hidden group border border-teal-100/50 dark:border-teal-900/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-125 transition-all duration-1000" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter flex items-center gap-5">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl text-teal-600">
                <BookOpen size={36} />
              </div>
              Knowledge Lab
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xl font-medium opacity-80 max-w-xl leading-relaxed">
              Systematic orchestration, validation, and curation of the Fatra Academy intellectual property registry.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl px-8 py-5 rounded-[32px] border border-white/60 shadow-2xl shadow-teal-500/10 text-center">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[3px] mb-1">Authenticated</p>
                <p className="text-5xl font-black text-teal-600 tracking-tighter">{allCourses.filter(c => c.is_approved).length}</p>
              </div>
              <div className="bg-amber-500 px-8 py-5 rounded-[32px] shadow-2xl shadow-amber-500/30 text-white text-center">
                <p className="text-[10px] uppercase font-black text-amber-100 tracking-[3px] mb-1">Queue Size</p>
                <p className="text-5xl font-black tracking-tighter">{allCourses.filter(c => !c.is_approved && c.is_submitted).length}</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => { setEditCourseData(null); setShowCourseModal(true); }}
              className="w-full sm:w-auto h-20 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black text-xs uppercase tracking-[3px] shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4"
            >
              <PlusCircle size={24} /> New Node
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex items-center gap-4 p-2 bg-slate-100 dark:bg-slate-800/80 rounded-[28px] w-fit border border-slate-200 dark:border-slate-700/50">
        <button 
          type="button"
          onClick={() => setCourseTab("all")}
          className={`px-10 py-4 rounded-[22px] text-xs font-black uppercase tracking-[2px] transition-all ${courseTab === "all" ? "bg-white dark:bg-slate-700 text-teal-600 shadow-2xl" : "text-slate-500 hover:text-slate-700"}`}
        >
          Institutional Registry
        </button>
        <button 
          type="button"
          onClick={() => setCourseTab("moderation")}
          className={`px-10 py-4 rounded-[22px] text-xs font-black uppercase tracking-[2px] transition-all flex items-center gap-4 ${courseTab === "moderation" ? "bg-white dark:bg-slate-700 text-rose-500 shadow-2xl" : "text-slate-500 hover:text-slate-700"}`}
        >
          Validation Queue
          {allCourses.filter(c => !c.is_approved && c.is_submitted).length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-xl shadow-lg animate-bounce">
              {allCourses.filter(c => !c.is_approved && c.is_submitted).length}
            </span>
          )}
        </button>
      </div>

      {/* Content Section */}
      {courseTab === "all" ? (
        <div className="bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-[450px] shadow-2xl shadow-teal-500/5">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search Knowledge Artifacts..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-none rounded-[28px] text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <button type="button" title="Global Filter" className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400">
                <Filter size={20}/>
              </button>
              <button type="button" title="Density Toggle" className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400">
                <LayoutDashboard size={20}/>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 text-[10px] font-black uppercase tracking-[3px] border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-10 py-6">Knowledge Artifact</th>
                  <th className="px-10 py-6">Assigned Faculty</th>
                  <th className="px-10 py-6 text-center">Status Protocol</th>
                  <th className="px-10 py-6 text-right">Registry Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentCourses.map((c: any) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 group transition-all">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-16 rounded-[22px] overflow-hidden bg-slate-100 border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-transform">
                          <img src={c.thumbnail || "/api/placeholder/120/80"} alt={c.title || "Course"} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-md uppercase tracking-widest mb-1.5 inline-block">
                            {c.category_name || "General"}
                          </span>
                          <p className="text-base font-black text-slate-800 dark:text-white tracking-tight leading-tight">
                            {c.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center text-white text-[10px] font-black uppercase shadow-xl">
                          {c.instructor_username?.charAt(0) || "?"}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">
                            @{c.instructor_name || "unknown"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Validated Faculty</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex justify-center">
                        {c.is_approved ? (
                          <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-black uppercase tracking-[2px] rounded-[14px] border border-emerald-100/50 dark:border-emerald-800/30">
                            <CheckCircle2 size={14} /> Authenticated
                          </span>
                        ) : c.is_submitted ? (
                          <span className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[10px] font-black uppercase tracking-[2px] rounded-[14px] border border-amber-100/50 dark:border-amber-800/30">
                            <ShieldAlert size={14} /> Validation Req.
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-400 text-[10px] font-black uppercase tracking-[2px] rounded-[14px]">
                            Draft Artifact
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          type="button"
                          onClick={() => { setInspectCourse(c); setShowInspectModal(true); }}
                          className="p-4 bg-white dark:bg-slate-900 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                          title="Inspect Artifact"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => { setEditCourseData(c); setShowCourseModal(true); }}
                          className="p-4 bg-white dark:bg-slate-900 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                          title="Modify Artifact"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteCourse(c.id)}
                          className="p-4 bg-white dark:bg-slate-900 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                          title="De-provision Artifact"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* Pagination Controls */}
                {totalCoursePages > 1 && (
                  <tr>
                    <td colSpan={4} className="px-10 py-6 bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          Artifacts <span className="text-slate-800 dark:text-white">{courseStartIndex + 1}-{Math.min(courseStartIndex + courseItemsPerPage, filteredCourses.length)}</span> / {filteredCourses.length}
                        </p>
                        <div className="flex items-center gap-2">
                          <button 
                            type="button"
                            onClick={() => setCoursePage(prev => Math.max(1, typeof prev === "number" ? prev - 1 : 1))}
                            disabled={coursePage === 1}
                            className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-20 transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <div className="flex gap-1">
                            {Array.from({ length: totalCoursePages }).map((_, i) => (
                              <button
                                type="button"
                                key={i}
                                onClick={() => setCoursePage(i + 1)}
                                className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${coursePage === i + 1 ? "bg-teal-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>
                          <button 
                            type="button"
                            onClick={() => setCoursePage(prev => Math.min(totalCoursePages, typeof prev === "number" ? prev + 1 : 1))}
                            disabled={coursePage === totalCoursePages}
                            className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-20 transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allCourses.filter(c => !c.is_approved && c.is_submitted).map((c: any) => (
            <div key={c.id} className="bg-white dark:bg-slate-800 rounded-[48px] border-b-8 border-amber-500 p-10 shadow-2xl shadow-teal-500/5 flex flex-col gap-8 transition-transform hover:-translate-y-2 duration-500">
              <div className="flex gap-8">
                <div className="w-40 h-28 rounded-3xl overflow-hidden shadow-2xl shrink-0 border-4 border-white dark:border-slate-900">
                  <img src={c.thumbnail || "/api/placeholder/160/120"} alt="ModView" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg">L2 Queue</span>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter leading-tight line-clamp-2">{c.title}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-white text-[8px] font-black overflow-hidden">
                      {c.instructor_name?.charAt(0) || "?"}
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      By Faculty: <span className="text-slate-700 dark:text-slate-200">@{c.instructor_name || "unknown"}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Catalog ID</p>
                  <p className="text-lg font-black text-slate-800 dark:text-white leading-none">MOD-{c.id}</p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Asset Valuation</p>
                  <p className="text-lg font-black text-slate-800 dark:text-white leading-none">{c.price} Birr</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => handleCourseAction(c.id, true)}
                  className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[28px] text-xs font-black uppercase tracking-[3px] shadow-2xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-4"
                >
                  <CheckCircle2 size={24} /> Authenticate
                </button>
                <button 
                  type="button"
                  onClick={() => handleCourseAction(c.id, false)}
                  title="Reject Course Submission"
                  className="px-10 py-5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-[28px] text-xs font-black uppercase tracking-[3px] hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 dark:border-slate-800"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>
          ))}
          
          {allCourses.filter(c => !c.is_approved && c.is_submitted).length === 0 && (
            <div className="col-span-full py-40 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[64px] border-4 border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-10">
                <Book size={64} className="text-slate-300" />
              </div>
              <h4 className="text-4xl font-black text-slate-700 dark:text-slate-200 tracking-tighter">Queue Integrity Level 100%</h4>
              <p className="text-slate-500 max-w-lg mx-auto mt-6 text-xl font-medium">
                No pending knowledge artifacts require administrative validation at this cycle point.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
