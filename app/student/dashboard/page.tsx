"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
    Clock, Award, Activity, Search, Bell, BookOpen, PlayCircle, Star, GraduationCap, ChevronRight, Zap, ShieldCheck, Cpu
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/courses/?enrolled=true');
        setCourses(Array.isArray(response.data) ? response.data : response.data.results);
      } catch (err) {
        console.error("Student enrollment fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === 'STUDENT') fetchCourses();
  }, [user]);

  if (!user || (!user.is_superuser && user.role !== 'ADMIN' && user.role !== 'INSTRUCTOR' && user.role !== 'STUDENT')) {
       return (
          <div className="h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white text-center">
             <GraduationCap size={64} className="text-indigo-500 mb-6 animate-pulse" />
             <h1 className="text-2xl font-black tracking-tighter mb-2 italic">Scholar Credentials Required</h1>
             <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Session synchronization failed. Please reactivate your scholar identity.</p>
             <Link href="/login" className="mt-8 px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest italic shadow-2xl hover:bg-zinc-200 transition-all">Identify Node</Link>
          </div>
       );
  }
  if (loading) return <div className="h-screen flex items-center justify-center font-black tracking-widest bg-zinc-950 text-white animate-pulse italic">SYNCING_LEARNING_PATH...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-28 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2 block font-mono italic">Scholar Experience Module</span>
             <h1 className="text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white tracking-tighter italic">
               Architect your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Future Experience</span>
             </h1>
           </motion.div>

           <div className="flex items-center gap-4">
              <Link href="/courses" className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-all shadow-xl shadow-zinc-950/10 active:scale-95">
                 Catalog Registry
              </Link>
           </div>
        </div>

        {/* Learning Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           <ScholarMetric label="Knowledge Pulse" value="128h" icon={<Clock />} color="blue" />
           <ScholarMetric label="Mastery Index" value="4.9" icon={<Star />} color="amber" />
           <ScholarMetric label="Artifacts Mastered" value="24" icon={<Award />} color="emerald" />
           <ScholarMetric label="Experience Rank" value="#1.2k" icon={<Activity />} color="indigo" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
               <div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-8 tracking-tighter italic">Active Mastery Path</h3>
                  {courses.length === 0 ? (
                    <div className="p-20 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[3rem] text-center group hover:border-indigo-600/30 transition-all">
                       <GraduationCap size={48} className="mx-auto text-zinc-200 group-hover:text-indigo-600/20 transition-all mb-8" />
                       <p className="text-zinc-500 font-black uppercase tracking-widest text-sm mb-8 truncate italic italic">No scholarly enrollments detected.</p>
                       <Link href="/courses" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20 transition-all">Enroll to Expand Node</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                       {courses.map((course: any, idx: number) => (
                         <motion.div 
                           key={course.id} 
                           initial={{ opacity: 0, x: -10 }} 
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           className="group flex flex-col md:flex-row items-center gap-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[3rem] hover:bg-white dark:hover:bg-zinc-900 hover:border-indigo-600/20 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
                         >
                            <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                               <Image 
                                 src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                 alt={course.title}
                                 fill
                                 className="object-cover"
                               />
                               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                  <PlayCircle size={48} className="text-white drop-shadow-xl" />
                               </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2 block">{course.category_name}</span>
                               <h4 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-zinc-500 text-sm font-medium">
                                  <span className="flex items-center gap-1.5"><Clock size={16}/> 12 Weeks</span>
                                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                                  <span className="flex items-center gap-1.5"><Activity size={16}/> Progress: 4h 2m</span>
                               </div>
                               <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-indigo-600 w-[45%] rounded-full shadow-lg shadow-indigo-600/20" />
                               </div>
                            </div>
                            <Link href={`/courses/${course.slug}`} className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-xl shadow-zinc-950/5">Continue</Link>
                         </motion.div>
                       ))}
                    </div>
                  )}
               </div>
            </div>

            <aside className="space-y-12">
               <div className="p-10 bg-black text-white rounded-[4rem] border border-zinc-800 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-all" />
                  <div className="flex items-center gap-3 mb-8">
                     <Zap size={20} className="fill-indigo-600 text-indigo-600" />
                     <h4 className="text-xs font-black uppercase tracking-widest italic drop-shadow-lg">Daily Mastery Protocol</h4>
                  </div>
                  <p className="text-2xl font-black mb-10 leading-tight italic">Expand your expertise node every 24 hours.</p>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-10">Current Streak: <span className="text-white font-black italic">14 Days</span></p>
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">Expand Now</button>
               </div>

               <div className="p-10 bg-zinc-50 dark:bg-zinc-900/40 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6 italic">Artifact Metadata</h4>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-zinc-400">Security Clearance</span>
                        <span className="font-black text-indigo-600 uppercase tracking-widest">Scholar Tier 1</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-zinc-400">Total Credits Earned</span>
                        <span className="font-black text-emerald-500 uppercase tracking-widest">1,240 XP</span>
                     </div>
                  </div>
               </div>
            </aside>
        </div>
      </div>
    </div>
  );
};

const ScholarMetric = ({ label, value, icon, color }: any) => {
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

export default StudentDashboard;
