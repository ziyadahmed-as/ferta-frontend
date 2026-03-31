"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
    LayoutDashboard, BookOpen, GraduationCap, Clock, Award, 
    Activity, Search, Bell, Settings, Plus, BarChart, 
    DollarSign, Users, CheckCircle2, AlertCircle, PlayCircle
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

const UnifiedDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        if (user.role === 'INSTRUCTOR') {
          // Fetch Instructor specific data
          const [statsRes, coursesRes] = await Promise.all([
            api.get('/courses/courses/instructor_stats/'),
            api.get('/courses/courses/?mine=true')
          ]);
          setStats(statsRes.data);
          setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results);
        } else {
          // Fetch Student specific data
          const coursesRes = await api.get('/courses/courses/?enrolled=true');
          setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results);
          // Standard student stats (placeholder or calculated)
          setStats({ 
            learning_hours: 42, 
            points: user.points || 0,
            certificates: 3 
          });
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (!user) return <div className="h-screen flex items-center justify-center font-black animate-pulse">Establishing Identity Link...</div>;
  if (loading) return <div className="h-screen flex items-center justify-center font-black tracking-widest bg-zinc-950 text-white">SYNCING_DATA_STREAM...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-28 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2 block">
                {user.role === 'INSTRUCTOR' ? 'Faculty Command Center' : 'Scholar Workspace'}
             </span>
             <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">
               Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">{user.username}</span>
             </h1>
           </motion.div>

           <div className="flex items-center gap-4">
              {user.role === 'INSTRUCTOR' && (
                <Link href="/courses/create" className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                   <Plus size={18} /> New Course
                </Link>
              )}
              <button title="Notifications" className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-indigo-600 transition-all">
                 <Bell size={20} />
              </button>
           </div>
        </div>

        {/* Dynamic Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           {user.role === 'INSTRUCTOR' ? (
             <>
               <TelemetryCard label="Global Earnings" value={`$${Math.round(stats.wallet_balance || 0)}`} icon={<DollarSign />} color="emerald" />
               <TelemetryCard label="Active Students" value={stats.total_enrollments} icon={<Users />} color="blue" />
               <TelemetryCard label="Course Views" value={stats.total_views} icon={<Activity />} color="amber" />
               <TelemetryCard label="Success Index" value="98%" icon={<Award />} color="indigo" />
             </>
           ) : (
             <>
               <TelemetryCard label="Learning Hours" value={stats.learning_hours} icon={<Clock />} color="blue" />
               <TelemetryCard label="Experience Points" value={stats.points} icon={<Award />} color="amber" />
               <TelemetryCard label="Certification Count" value={stats.certificates} icon={<CheckCircle2 />} color="emerald" />
               <TelemetryCard label="Global Rank" value="#124" icon={<Activity />} color="indigo" />
             </>
           )}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
               <div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-8 tracking-tighter">
                     {user.role === 'INSTRUCTOR' ? 'Integrated Knowledge Assets' : 'Active Learning Path'}
                  </h3>

                  {courses.length === 0 ? (
                    <div className="p-16 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[3rem] text-center">
                       <p className="text-zinc-500 font-bold uppercase tracking-widest mb-6 italic">No active data nodes detected.</p>
                       <Link href="/courses" className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest">Browse Programs</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {courses.map((course: any) => (
                         <Link href={`/courses/${course.slug}`} key={course.id} className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] hover:border-indigo-500/30 transition-all shadow-xl shadow-zinc-200/50 dark:shadow-none">
                            <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-6">
                               <Image 
                                 src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                 alt={course.title}
                                 fill
                                 className="object-cover group-hover:scale-110 transition-transform duration-700"
                               />
                               {user.role === 'INSTRUCTOR' && (
                                 <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ${
                                   course.is_approved ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                                 }`}>
                                    {course.is_approved ? 'Approved' : 'Pending'}
                                 </div>
                               )}
                            </div>
                            <h4 className="text-lg font-black text-zinc-900 dark:text-white line-clamp-1 mb-2 italic">{course.title}</h4>
                            <div className="flex items-center justify-between mt-4">
                               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                  {user.role === 'INSTRUCTOR' ? `${course.enrollment_count || 0} Scholars` : 'Resume Module'}
                               </span>
                               <PlayCircle size={20} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                         </Link>
                       ))}
                    </div>
                  )}
               </div>
            </div>

            {/* Platform Sidebar */}
            <div className="space-y-8">
               <div className="p-8 bg-zinc-950 text-white rounded-[3rem] border border-zinc-800 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-all" />
                  <h4 className="text-xs font-black uppercase tracking-widest opacity-60 mb-6 font-mono italic">Platform Status</h4>
                  <div className="space-y-6">
                     <div className="flex justify-between items-end border-b border-zinc-800 pb-3">
                        <span className="text-[10px] uppercase font-bold text-zinc-500">Security Clearance</span>
                        <span className="text-sm font-black text-rose-500">{user.role}</span>
                     </div>
                     <div className="flex justify-between items-end border-b border-zinc-800 pb-3">
                        <span className="text-[10px] uppercase font-bold text-zinc-500">Network Signal</span>
                        <span className="text-sm font-black text-emerald-500">ACTIVE</span>
                     </div>
                     <div className="flex justify-between items-end border-b border-zinc-800 pb-3">
                        <span className="text-[10px] uppercase font-bold text-zinc-500">Resource Sync</span>
                        <span className="text-sm font-black text-white">OPTIMIZED</span>
                     </div>
                  </div>
                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] mt-8 transition-colors">
                     Initialize Full Re-Sync
                  </button>
               </div>

               <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem]">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 italic">Recent Global Activity</h4>
                  <div className="space-y-4">
                     {[1,2,3].map(idx => (
                       <div key={idx} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                          <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                            <span className="text-zinc-900 dark:text-zinc-200 font-bold">Protocol Sync</span> completed on Knowledge Node {idx}.
                          </p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const TelemetryCard = ({ label, value, icon, color }: any) => {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 rounded-[3rem] hover:border-indigo-600/30 transition-all group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${colors[color]}`}>
         {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
         <span className="text-[10px] font-black uppercase tracking-[0.1em] text-zinc-500 mb-1 block">{label}</span>
         <span className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter italic">{value}</span>
      </div>
    </motion.div>
  );
};

export default UnifiedDashboard;
