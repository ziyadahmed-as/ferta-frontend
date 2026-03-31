"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
    Plus, DollarSign, Users, Activity, Award, PlayCircle, BookOpen, Clock, BarChart3, Settings, 
    TrendingUp, ArrowUpRight, Cpu, ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, analyticsRes, coursesRes] = await Promise.all([
          api.get('/courses/courses/instructor_stats/'),
          api.get('/courses/courses/instructor_analytics/'),
          api.get('/courses/courses/?mine=true')
        ]);
        setStats(statsRes.data);
        setAnalytics(analyticsRes.data.monthly_data);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results);
      } catch (err) {
        console.error("Instructor fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN' || user?.is_superuser) fetchData();
  }, [user]);

  if (user?.role !== 'INSTRUCTOR' && !user?.is_superuser && user?.role !== 'ADMIN') {
      return (
         <div className="h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white text-center">
            <Cpu size={64} className="text-rose-500 mb-6 animate-pulse" />
            <h1 className="text-2xl font-black tracking-tighter mb-2 italic">Unauthorized Faculty Node</h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Access restricted to verified Instructor and Governance nodes.</p>
            <Link href="/" className="mt-8 px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest italic shadow-2xl hover:bg-zinc-200 transition-all">Signal Exit</Link>
         </div>
      );
  }

  if (loading) return <div className="h-screen flex items-center justify-center font-black tracking-widest bg-zinc-950 text-white animate-pulse italic">SYNCING_FACULTY_TELEMETRY...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-28 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2 block font-mono italic">Faculty Operational Command</span>
             <h1 className="text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white tracking-tighter italic">
               Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Executive Center</span>
             </h1>
           </motion.div>

           <div className="flex items-center gap-4">
              <Link href="/courses/create" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95">
                 <Plus size={20} /> Deploy New Course
              </Link>
           </div>
        </div>

        {/* Global Faculty Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           <MetricCard label="Institution Revenue" value={`$${Math.round(stats.wallet_balance || 0)}`} icon={<DollarSign />} color="emerald" />
           <MetricCard label="Scholar Reach" value={stats.total_enrollments} icon={<Users />} color="blue" />
           <MetricCard label="Knowledge Consumption" value={stats.total_views} icon={<Activity />} color="amber" />
           <MetricCard label="Quality Index" value="98%" icon={<Award />} color="indigo" />
        </div>

        {/* Analytics Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
           <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-10 rounded-[3.5rem] shadow-xl shadow-zinc-200/20 dark:shadow-none">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter italic">Growth Trajectory</h3>
                    <p className="text-xs font-medium text-zinc-500">Revenue & Enrollment Protocol (Last 6 Months)</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-600">
                       <div className="w-2 h-2 rounded-full bg-indigo-600" /> Revenue
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-zinc-400">
                       <div className="w-2 h-2 rounded-full bg-zinc-300" /> Enrollments
                    </div>
                 </div>
              </div>
              <div className="h-72 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics}>
                       <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9ca3af'}} />
                       <YAxis hide />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '16px', fontSize: '10px', color: '#fff' }}
                         itemStyle={{ color: '#fff', fontWeight: 700 }}
                       />
                       <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                       <Area type="monotone" dataKey="enrollments" stroke="#9ca3af" strokeWidth={2} fill="transparent" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-indigo-600 p-10 rounded-[3.5rem] text-white relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -z-1 group-hover:scale-150 transition-transform duration-700" />
              <div>
                 <TrendingUp size={40} className="mb-6 opacity-40" />
                 <h4 className="text-3xl font-black tracking-tighter leading-tight italic mb-4">Tier-1 Node Performance</h4>
                 <p className="text-sm font-medium opacity-80 leading-relaxed">Your curriculum artifacts are performing 24% above the institutional baseline this quarter.</p>
              </div>
              <button className="flex items-center justify-between w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition-all">
                 <span className="text-[10px] font-black uppercase tracking-widest">Global Ranking</span>
                 <ArrowUpRight size={20} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
               <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-8">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter flex items-center gap-4 italic">
                    Integrated Assets <span className="text-indigo-600 text-sm not-italic opacity-50 tabular-nums">/{courses.length}</span>
                  </h3>
                  <Link href="/instructor/courses" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-indigo-600 transition-all">Advanced Management</Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {courses.map((course: any) => (
                    <motion.div 
                      key={course.id} 
                      whileHover={{ y: -5 }}
                      className="group bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 transition-all"
                    >
                       <div className="relative h-44 w-full rounded-[1.5rem] overflow-hidden mb-6">
                          <Image 
                            src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                            alt={course.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className={`absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 ${
                            course.is_approved ? 'text-emerald-500' : 'text-amber-500'
                          }`}>
                             {course.is_approved ? 'Institutional Approval' : 'Verification Pending'}
                          </div>
                       </div>
                       <h4 className="text-xl font-black text-zinc-900 dark:text-white line-clamp-1 mb-4 italic leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                       
                       <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                             <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                                <Users size={14} /> {course.enrollment_count} Scholars
                             </div>
                             <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                                <BarChart3 size={14} /> Tracking On
                             </div>
                          </div>
                          <Link href={`/instructor/courses/${course.slug}/edit`} className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-all">
                             <Settings size={18} />
                          </Link>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            <aside className="space-y-12">
               <div className="p-10 bg-indigo-600 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-500/30">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-6 font-mono">Signal Integrity</h4>
                  <p className="text-2xl font-black mb-8 italic leading-tight">Faculty nodes are fully synchronized with global registries.</p>
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Refresh System Token</button>
               </div>

               <div className="p-8 bg-zinc-50 dark:bg-zinc-900/60 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-8 font-mono border-b border-zinc-200 dark:border-zinc-800 pb-4 italic">Recent Peer Feedback</h4>
                  <div className="space-y-6">
                     <p className="text-xs font-bold text-zinc-500 italic text-center">No recent reviewer signals processed.</p>
                  </div>
               </div>
            </aside>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon, color }: any) => {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] hover:ring-2 ring-indigo-500/10 transition-all group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 ${colors[color]}`}>
         {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
         <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1 block font-mono italic">{label}</span>
         <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter italic">{value}</span>
      </div>
    </motion.div>
  );
};

export default InstructorDashboard;
