"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  ShieldCheck, Users, BookOpen, DollarSign, 
  TrendingUp, Activity, CheckCircle2, XCircle, 
  Clock, ArrowUpRight, BarChart3, Layers,
  ChevronRight, ExternalLink, Mail, UserPlus,
  LayoutDashboard, FileText, Globe, Key, Bell,
  Search, SlidersHorizontal, LogOut, Cpu, Menu, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<'OVERVIEW' | 'FACULTY' | 'COURSES' | 'FINANCE' | 'SYSTEM'>('OVERVIEW');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await api.get("/users/admin-stats/");
      setStats(res.data);
    } catch (err) {
      console.error("Admin stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchStats();
    }
  }, [user]);

  const handleInstructorAction = async (userId: number, approve: boolean) => {
    setActionLoading(userId);
    try {
      const endpoint = approve ? `/users/manage/${userId}/approve_instructor/` : `/users/manage/${userId}/reject_instructor/`;
      await api.post(endpoint);
      fetchStats();
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCourseAction = async (courseId: number, approve: boolean) => {
    setActionLoading(courseId);
    try {
      const endpoint = approve ? `/courses/${courseId}/approve/` : `/courses/${courseId}/reject/`;
      await api.post(endpoint);
      fetchStats();
    } catch (err) {
      console.error("Course action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (user?.role !== 'ADMIN' && !user?.is_superuser) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white text-center">
         <ShieldCheck size={64} className="text-rose-500 mb-6 animate-pulse" />
         <h1 className="text-3xl font-black tracking-tighter mb-2 italic">Institutional Clearance Required</h1>
         <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2 max-w-sm">Security clearance level 'ADMIN' or 'SUPREME' is required to access the Governance Module.</p>
         <Link href="/" className="mt-12 px-10 py-5 bg-white text-black rounded-[2rem] font-black text-[10px] uppercase tracking-widest italic shadow-2xl hover:bg-zinc-200 transition-all">Return to Base</Link>
      </div>
    );
  }

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white font-black tracking-[0.5em] animate-pulse italic">INIT_GOVERNANCE_SYSTEM...</div>;

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button 
      onClick={() => setActiveModule(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${
        activeModule === id 
        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
        : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
      }`}
    >
       <Icon size={18} />
       <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex overflow-x-hidden">
      
      {/* Sidebar - Governance Navigation */}
      <aside className={`w-80 border-r border-zinc-900 bg-black/90 backdrop-blur-2xl h-screen sticky top-0 flex flex-col p-8 z-50 transition-transform duration-500 fixed lg:sticky ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
         <div className="flex items-center justify-between mb-16 lg:mb-16">
            <Link href="/" className="flex items-center gap-3 group">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl italic shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                  <BookOpen size={24} />
               </div>
               <h2 className="text-xl font-black text-white tracking-tighter italic">Fatra<span className="text-indigo-600">Edu</span></h2>
            </Link>
            <button title="Close Protocol" onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-zinc-500 hover:text-white">
               <X size={20} />
            </button>
         </div>

         <nav className="space-y-4 flex-1">
            <div className="mb-4 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-6">Core Operations</div>
            <SidebarItem id="OVERVIEW" label="Executive Status" icon={LayoutDashboard} />
            <SidebarItem id="FACULTY" label="Faculty Nodes" icon={UserPlus} />
            <SidebarItem id="COURSES" label="Asset Registry" icon={BookOpen} />
            <SidebarItem id="FINANCE" label="Capital Flow" icon={DollarSign} />
            
            <div className="mt-12 mb-4 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-6">Protocols</div>
            <SidebarItem id="SYSTEM" label="System Signal" icon={Cpu} />
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-zinc-500 hover:bg-zinc-900 hover:text-rose-500 transition-all font-black text-[10px] uppercase tracking-widest">
               <LogOut size={18} /> Exit Portal
            </button>
         </nav>

         <div className="mt-auto px-6 py-8 bg-zinc-900/40 rounded-3xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Node Sync: 100%</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">Clearance Level: Supreme Admin</p>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-y-auto px-6 lg:px-12 py-16">
         <header className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
            <div className="flex items-center gap-4">
               <button title="Access Protocol" onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-300 hover:text-indigo-600 transition-all border border-zinc-800">
                  <Menu size={20} />
               </button>
               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tighter leading-none italic mb-2">
                   {activeModule === 'OVERVIEW' && "Institutional Status"}
                   {activeModule === 'FACULTY' && "Faculty Certification Central"}
                   {activeModule === 'COURSES' && "Asset Moderation Hub"}
                   {activeModule === 'FINANCE' && "Financial Equity Registry"}
                   {activeModule === 'SYSTEM' && "Global Protocol Logs"}
                </h1>
                <div className="flex items-center gap-2 text-zinc-500">
                   <span className="text-[10px] font-black uppercase tracking-widest italic opacity-50">Governance</span>
                   <ChevronRight size={10} />
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic">{activeModule}</span>
                </div>
               </motion.div>
            </div>

            <div className="flex items-center gap-6">
               <div className="relative group flex-1 md:flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search Node..." 
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl px-12 py-3 text-xs font-bold text-white focus:outline-none focus:border-indigo-600/50 w-full md:w-64 transition-all"
                  />
               </div>
               <button title="System Protocols" className="w-12 h-12 shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-indigo-600 transition-all">
                 <SlidersHorizontal size={20} />
               </button>
            </div>
         </header>

         <AnimatePresence mode="wait">
            <motion.div
               key={activeModule}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
            >
               {activeModule === 'OVERVIEW' && (
                 <div className="space-y-16">
                    {/* Integrated Analytics Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                       <AdminStat description="Active Students" value={stats.users.students} icon={<Users />} color="blue" />
                       <AdminStat description="Verified Faculty" value={stats.users.instructors} icon={<UserPlus />} color="emerald" />
                       <AdminStat description="Node Capacity" value={stats.courses.total} icon={<BookOpen />} color="indigo" />
                       <AdminStat description="Total Capital" value={`$${Math.round(stats.revenue.total).toLocaleString()}`} icon={<DollarSign />} color="amber" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 p-10 rounded-[4rem]">
                          <div className="flex justify-between mb-12">
                             <div>
                                <h3 className="text-xl font-black text-white italic tracking-tighter">System Trajectory</h3>
                                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mt-1">Growth Signal Pulse</p>
                             </div>
                             <div className="flex gap-4 text-[9px] font-black uppercase text-zinc-500">
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"/> Users</span>
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/> Revenue</span>
                             </div>
                          </div>
                          <div className="h-80 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.monthly_growth}>
                                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" opacity={0.5} />
                                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#52525b', letterSpacing: '0.1em'}} />
                                   <YAxis hide />
                                   <Tooltip cursor={{fill: '#27272a', opacity: 0.3}} contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
                                   <Bar dataKey="users" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={25} />
                                   <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={8} />
                                </BarChart>
                             </ResponsiveContainer>
                          </div>
                       </div>

                       <div className="bg-indigo-600 rounded-[4rem] p-12 text-white relative overflow-hidden flex flex-col justify-between group cursor-pointer shadow-2xl shadow-indigo-600/20">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -z-1 group-hover:scale-150 transition-transform duration-1000" />
                          <Activity size={48} className="opacity-40 mb-8" />
                          <div>
                             <h4 className="text-4xl font-black tracking-tighter italic leading-none mb-6">Network Health: Optimized</h4>
                             <p className="text-sm font-medium opacity-80 leading-relaxed">All educational nodes and financial shards are operating within baseline parameters.</p>
                          </div>
                          <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest tracking-widest mt-12 transition-all">Emergency Protocol</button>
                       </div>
                    </div>
                 </div>
               )}

               {activeModule === 'FACULTY' && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-8">
                       <div>
                          <h2 className="text-2xl md:text-3xl font-black text-rose-500 tracking-tighter italic">Pending Faculty Certifications</h2>
                          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">{stats.pending_instructors.length} applications awaiting protocol review</p>
                       </div>
                    </div>

                    {stats.pending_instructors.length === 0 ? (
                       <div className="p-20 border-2 border-dashed border-zinc-800 rounded-[4rem] text-center italic text-zinc-600 font-black uppercase tracking-widest">Bureaucracy Cleared. All faculty nodes verified.</div>
                    ) : (
                       <div className="grid grid-cols-1 gap-6">
                          {stats.pending_instructors.map((app: any) => (
                             <div key={app.id} className="p-10 bg-zinc-900/40 border border-zinc-800 rounded-[3rem] hover:border-zinc-700 transition-all flex flex-col md:flex-row items-center gap-12 group">
                                <div className="w-20 h-20 bg-zinc-800 rounded-[1.5rem] flex items-center justify-center text-white font-black text-3xl group-hover:scale-110 transition-transform">
                                   {app.username[0].toUpperCase()}
                                </div>
                                <div className="flex-1">
                                   <div className="flex items-center gap-4 mb-2">
                                      <h4 className="text-2xl font-black text-white italic">{app.username}</h4>
                                      <span className="px-3 py-1 bg-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-lg">Applicant</span>
                                   </div>
                                   <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-black text-zinc-500 uppercase tracking-tighter">
                                      <span className="flex items-center gap-2 italic uppercase"><Mail size={14}/> {app.email}</span>
                                      <span className="flex items-center gap-2 italic uppercase"><TrendingUp size={14}/> {app.years_of_experience} Experience</span>
                                      <span className="px-3 py-1 bg-indigo-600/10 text-indigo-500 border border-indigo-600/20 rounded-lg">{app.expertise}</span>
                                   </div>
                                </div>
                                 <div className="flex items-center gap-4">
                                   <button 
                                     onClick={() => handleInstructorAction(app.id, true)}
                                     disabled={actionLoading === app.id}
                                     title="Authorize Faculty Member"
                                     className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-emerald-500/10 flex items-center gap-3 italic"
                                   >
                                      {actionLoading === app.id ? <Cpu className="animate-spin" size={14}/> : "Certify Node"}
                                   </button>
                                   <button 
                                     onClick={() => handleInstructorAction(app.id, false)}
                                     disabled={actionLoading === app.id}
                                     title="Decommission Application"
                                     className="w-14 h-14 border border-zinc-800 hover:border-rose-500/50 hover:text-rose-500 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 active:scale-95"
                                   >
                                      <XCircle size={20} />
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                    )}
                 </div>
               )}

               {activeModule === 'COURSES' && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-8">
                       <div>
                          <h2 className="text-2xl md:text-3xl font-black text-indigo-500 tracking-tighter italic">Content Moderation Queue</h2>
                          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">{stats.courses.pending_approval} knowledge artifacts require vetting</p>
                       </div>
                    </div>
                    
                    {stats.courses.pending_list?.length === 0 ? (
                       <div className="p-20 border-2 border-dashed border-zinc-800 rounded-[4rem] text-center italic text-zinc-600 font-black uppercase tracking-widest">
                          Registry Clean. No artifacts awaiting vetting.
                       </div>
                    ) : (
                       <div className="grid grid-cols-1 gap-4">
                          {stats.courses.pending_list.map((c: any) => (
                             <div key={c.id} className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group hover:border-indigo-500/30 transition-all">
                                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-white font-black text-xl italic group-hover:bg-indigo-600 transition-colors">
                                   {c.title[0].toUpperCase()}
                                </div>
                                <div className="flex-1">
                                   <h4 className="text-lg font-black text-white italic mb-1">{c.title}</h4>
                                   <div className="flex flex-wrap gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                                      <span className="flex items-center gap-1.5"><Users size={12}/> {c.instructor}</span>
                                      <span className="flex items-center gap-1.5"><Layers size={12}/> {c.category}</span>
                                      <span className="text-indigo-400">${c.price}</span>
                                   </div>
                                </div>
                                <div className="flex items-center gap-3">
                                   <button 
                                      onClick={() => handleCourseAction(c.id, true)}
                                      disabled={actionLoading === c.id}
                                      title="Approve Knowledge Artifact"
                                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all italic shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                                   >
                                      {actionLoading === c.id ? <Cpu className="animate-spin" size={14}/> : "Vet Artifact"}
                                   </button>
                                   <button 
                                      onClick={() => handleCourseAction(c.id, false)}
                                      disabled={actionLoading === c.id}
                                      title="Decline Knowledge Artifact"
                                      className="p-3 text-zinc-500 hover:text-rose-500 border border-zinc-800 rounded-xl transition-all disabled:opacity-50"
                                   >
                                      <XCircle size={18} />
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                    )}
                 </div>
               )}

               {activeModule === 'SYSTEM' && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <h2 className="text-3xl font-black text-white tracking-tighter italic border-b border-zinc-900 pb-8">Network Pulse Shards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <section className="p-10 bg-zinc-900/40 rounded-[3rem] border border-zinc-800">
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 italic">Recent User Signals</h3>
                          <div className="space-y-6">
                            {stats.recent_users.map((u: any) => (
                              <div key={u.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50">
                                 <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-bold text-zinc-200">{u.username}</span>
                                 </div>
                                 <span className="text-[10px] font-black text-zinc-500 uppercase">{u.joined}</span>
                              </div>
                            ))}
                          </div>
                       </section>
                       
                       <section className="p-10 bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] border border-zinc-800 flex flex-col justify-center items-center text-center">
                          <Cpu size={64} className="text-indigo-600 mb-8 animate-spin duration-[10000ms]" />
                          <h4 className="text-2xl font-black text-white mb-2 italic">Institutional Integrity Verified</h4>
                          <p className="text-xs font-medium text-zinc-500">All local sharding matches global registry.</p>
                       </section>
                    </div>
                 </div>
               )}
            </motion.div>
         </AnimatePresence>
      </main>
    </div>
  );
};

const AdminStat = ({ description, value, icon, color }: any) => {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 bg-zinc-900/40 border border-zinc-800/80 rounded-[3rem] hover:bg-zinc-900 transition-all group"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all ${colors[color]}`}>
         {React.cloneElement(icon, { size: 28 })}
      </div>
      <div>
         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2 block italic font-mono">{description}</span>
         <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-white tracking-tighter leading-none italic">{value}</span>
            <div className="text-[9px] font-black text-emerald-500 mb-1 flex items-center gap-1">
               <ArrowUpRight size={12} /> LIVE
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
