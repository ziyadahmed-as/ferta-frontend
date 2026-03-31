"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  ShieldCheck, Users, BookOpen, DollarSign, 
  TrendingUp, Activity, CheckCircle2, XCircle, 
  Clock, ArrowUpRight, BarChart3, Layers,
  ChevronRight, ExternalLink, Mail, UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

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
      // Refresh stats
      fetchStats();
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white">
         <ShieldCheck size={64} className="text-rose-500 mb-6 animate-pulse" />
         <h1 className="text-3xl font-black tracking-tighter mb-2 italic">Access Denied</h1>
         <p className="text-zinc-500 font-medium max-w-sm text-center">Your credentials do not possess the required clearance level for institutional governance modules.</p>
         <Link href="/" className="mt-8 px-8 py-3 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all">Return to Sector 0</Link>
      </div>
    );
  }

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white font-black tracking-[0.5em] animate-pulse">INIT_ADMIN_SYSTEM...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 pt-28 px-6 pb-24 text-zinc-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <div className="flex items-center gap-2 text-rose-500 mb-4 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full w-fit">
                <ShieldCheck size={14} /> <span className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Admin</span>
             </div>
             <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4">Governance Center</h1>
             <p className="text-zinc-500 font-medium max-w-lg">Managing global educational infrastructure, faculty certifications, and knowledge ecosystem health.</p>
           </motion.div>

           <div className="flex gap-4">
              <button className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2">
                 Generate Report <Layers size={16} />
              </button>
           </div>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           <AdminStat description="Active Students" value={stats.users.students} icon={<Users />} color="blue" />
           <AdminStat description="Faculty Nodes" value={stats.users.instructors} icon={<UserPlus />} color="emerald" />
           <AdminStat description="Course Inventory" value={stats.courses.total} icon={<BookOpen />} color="indigo" />
           <AdminStat description="Monthly Revenue" value={`$${Math.round(stats.revenue.this_month).toLocaleString()}`} icon={<DollarSign />} color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Column 1 & 2 - Main Infrastructure Controls */}
           <div className="lg:col-span-2 space-y-16">
              
              {/* Pending Faculty Applications */}
              <section>
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-4">
                       Pending Faculty Certification <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] rounded-md">{stats.pending_instructors.length}</span>
                    </h2>
                 </div>

                 {stats.pending_instructors.length === 0 ? (
                   <div className="p-12 border-2 border-dashed border-zinc-800 rounded-[3rem] text-center text-zinc-600 font-bold uppercase tracking-widest">
                      Queue Cleared. No pending certifications.
                   </div>
                 ) : (
                   <div className="space-y-4">
                      <AnimatePresence>
                         {stats.pending_instructors.map((app: any) => (
                           <motion.div 
                             key={app.id} 
                             layout
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.8 }}
                             className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] hover:border-zinc-700 transition-all group flex flex-col md:flex-row items-center gap-8"
                           >
                              <div className="w-16 h-16 bg-zinc-800 rounded-3xl flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform">
                                 {app.username[0].toUpperCase()}
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-xl font-black text-white mb-1">{app.username}</h4>
                                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-zinc-500">
                                    <span className="flex items-center gap-1.5"><Mail size={12}/>{app.email}</span>
                                    <span className="flex items-center gap-1.5"><TrendingUp size={12}/>{app.years_of_experience} yrs exp</span>
                                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-md uppercase tracking-tighter text-[9px]">{app.expertise}</span>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <button 
                                   onClick={() => handleInstructorAction(app.id, true)}
                                   disabled={actionLoading === app.id}
                                   className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 group-active:scale-95 disabled:opacity-50"
                                 >
                                    Approve <CheckCircle2 size={16} />
                                 </button>
                                 <button 
                                   onClick={() => handleInstructorAction(app.id, false)}
                                   disabled={actionLoading === app.id}
                                   title="Reject Application"
                                   className="w-12 h-12 border border-zinc-800 hover:bg-rose-500/10 hover:border-rose-500/30 text-zinc-500 hover:text-rose-500 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50"
                                 >
                                    <XCircle size={20} />
                                 </button>
                              </div>
                           </motion.div>
                         ))}
                      </AnimatePresence>
                   </div>
                 )}
              </section>

              {/* Course Moderation Section */}
              <section>
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-4">
                       Content Moderation Pool <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] rounded-md">{stats.courses.pending_approval}</span>
                    </h2>
                 </div>

                 {stats.courses.pending_approval === 0 ? (
                   <div className="p-12 border-2 border-dashed border-zinc-800 rounded-[3rem] text-center text-zinc-600 font-bold uppercase tracking-widest">
                      Catalog Verified. No pending content.
                   </div>
                 ) : (
                   <p className="text-zinc-500 text-sm italic mb-4">Institutional quality vetting required for {stats.courses.pending_approval} submissions.</p>
                 )}
              </section>

              {/* Monthly Sync Growth Visualization */}
              <section>
                 <h2 className="text-2xl font-black text-white tracking-tighter mb-8">System Growth Metrics</h2>
                 <div className="grid grid-cols-6 gap-4 h-64 items-end">
                    {stats.monthly_growth.map((data: any, idx: number) => (
                      <div key={idx} className="flex flex-col items-center gap-4 group">
                         <div 
                           className="w-full bg-indigo-600/20 group-hover:bg-indigo-600 border border-indigo-600/30 rounded-t-xl transition-all relative overflow-hidden" 
                           style={{ height: `${(data.revenue / (stats.revenue.this_month || 1000)) * 100}%`, minHeight: '10%' }}
                         >
                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{data.month}</span>
                      </div>
                    ))}
                 </div>
              </section>

           </div>

           {/* Sidebar - Quick Analytics */}
           <div className="space-y-12">
              <section>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 border-b border-zinc-900 pb-4 italic">High Performance Nodes</h2>
                 <div className="space-y-6">
                    {stats.top_courses.map((c: any) => (
                      <div key={c.id} className="flex items-center gap-4 group cursor-pointer">
                         <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 group-hover:border-amber-500/50 group-hover:text-amber-500 transition-all">
                            <BarChart3 size={20} />
                         </div>
                         <div className="flex-1">
                            <h4 className="text-xs font-black text-zinc-200 line-clamp-1">{c.title}</h4>
                            <p className="text-[10px] font-bold text-zinc-600">{c.enrollments} enrollments • ${c.revenue.toLocaleString()}</p>
                         </div>
                         <ChevronRight size={14} className="text-zinc-700" />
                      </div>
                    ))}
                 </div>
              </section>

              <section className="p-10 bg-gradient-to-br from-indigo-900/20 to-zinc-900 border border-indigo-500/10 rounded-[3.5rem] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[100px] -z-10" />
                 <h3 className="text-3xl font-black text-white tracking-tighter mb-4 leading-none italic">Institutional Integrity</h3>
                 <p className="text-zinc-500 text-xs font-medium leading-relaxed mb-8">All governance data is synchronized across secure nodes to ensure 100% platform transparency and faculty verification.</p>
                 <div className="flex -space-x-3 overflow-hidden">
                    {[1,2,3,4].map(idx => (
                      <div key={idx} className="inline-block h-8 w-8 rounded-full ring-4 ring-zinc-950 bg-zinc-800" />
                    ))}
                 </div>
              </section>

              <section>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 border-b border-zinc-900 pb-4 italic">Recent Network Activity</h2>
                 <div className="space-y-4">
                    {stats.recent_users.slice(0, 5).map((u: any) => (
                      <div key={u.id} className="flex items-center gap-3 py-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <div>
                            <p className="text-xs font-bold text-zinc-200">{u.username} joined</p>
                            <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-tighter">{u.joined}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
        </div>
      </div>
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
      className="p-8 bg-zinc-900/40 border border-zinc-800/80 rounded-[3rem] hover:bg-zinc-900 transition-all group"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 border transition-all ${colors[color]}`}>
         {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 block">{description}</span>
         <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-white tracking-tighter leading-none">{value}</span>
            <div className="text-[10px] font-black text-emerald-500 mb-1 flex items-center gap-1">
               <ArrowUpRight size={12} /> Live
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
