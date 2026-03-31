"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, BookOpen, GraduationCap, Clock, Award, Activity, Search, Bell, Settings, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

const DashboardPage = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
        // Fetch stats based on role
        const fetchDashboardData = async () => {
            try {
                if (user?.role === 'INSTRUCTOR') {
                    const statsRes = await api.get('/courses/courses/instructor_stats/');
                    setStats(statsRes.data);
                }
                const coursesRes = await api.get('/courses/courses/popular/');
                setRecentCourses(coursesRes.data.slice(0, 3));
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            }
        };
        fetchDashboardData();
    }
  }, [user, token]);

  if (!user) return <div className="h-screen flex items-center justify-center font-black animate-pulse">Initializing Portal...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
           >
             <h1 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">Systems Operational</h1>
             <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">
               Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">{user.username}</span>
             </h2>
             <p className="text-zinc-500 font-medium mt-2">Managing your professional growth ecosystem.</p>
           </motion.div>

           <div className="flex items-center gap-4">
              <div className="relative hidden lg:block">
                 <input 
                    type="text" 
                    placeholder="Search resources..." 
                    title="Search Portal"
                    className="w-64 pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 text-sm font-medium transition-all"
                 />
                 <Search size={18} className="absolute left-4 top-3.5 text-zinc-400" />
              </div>
              <button title="Notifications" className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-indigo-600 transition-all">
                 <Bell size={20} />
              </button>
           </div>
        </div>

        {/* Unified Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           <StatCard label="Course Efficiency" value="94%" trend="+3.2%" icon={<Activity />} delay={0} />
           <StatCard label="Learning Hours" value="128h" trend="+12h" icon={<Clock />} delay={0.1} />
           <StatCard label="Achievements" value="24" trend="Elite Level" icon={<Award />} delay={0.2} />
           <StatCard label="Network Reach" value="2.4k" trend="+84" icon={<BookOpen />} delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column - Active Projects/Courses */}
            <div className="lg:col-span-2 space-y-12">
               <div>
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter">Current Engagements</h3>
                     <Link href="/courses" className="text-sm font-black text-indigo-600 uppercase tracking-widest hover:underline">View Catalog</Link>
                  </div>

                  <div className="space-y-4">
                     {recentCourses.map((course, idx) => (
                       <motion.div
                         key={course.id}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4 + (idx * 0.1) }}
                         className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] hover:border-indigo-600/30 transition-all flex flex-col sm:flex-row items-center gap-6 group"
                       >
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                             <Image 
                               src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                               alt={course.title}
                               fill
                               className="object-cover group-hover:scale-110 transition-transform duration-500"
                             />
                          </div>
                          <div className="flex-1">
                             <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-1">{course.title}</h4>
                             <p className="text-zinc-500 text-sm font-medium">Progress: 65% Completed</p>
                             <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-indigo-600 w-[65%] rounded-full shadow-lg shadow-indigo-600/20" />
                             </div>
                          </div>
                          <button title="Resume Session" className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-indigo-500/20 active:rotate-90">
                             <Play size={24} fill="currentColor" />
                          </button>
                       </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Sidebar Column - Career Sync / Mentor View */}
            <div className="space-y-8">
               <div className="p-10 bg-indigo-600 rounded-[3rem] text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <h4 className="text-sm font-black uppercase tracking-widest opacity-80 mb-4">Portal Sync</h4>
                  <p className="text-2xl font-black mb-8 leading-tight">Your training node is fully synchronized.</p>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-50 transition-colors">
                     Refresh Signal
                  </button>
               </div>

               <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-6 font-mono">Upcoming Milestones</h4>
                  <div className="space-y-6">
                     <Milestone title="Advanced AI Models" time="Tomorrow, 10:00 AM" type="LIVE" />
                     <Milestone title="Ethics in Data" time="Wednesday, 2:00 PM" type="RECORDED" />
                     <Milestone title="System Architecture" time="Next Friday" type="EXAM" />
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-indigo-500/5 transition-all group"
  >
    <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
       {icon}
    </div>
    <div className="flex flex-col">
       <span className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter mb-1">{value}</span>
       <span className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-3">{label}</span>
       <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/10 px-2 py-0.5 rounded-lg w-fit">
          {trend}
       </div>
    </div>
  </motion.div>
);

const Milestone = ({ title, time, type }: any) => (
  <div className="flex items-start gap-4">
    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
        type === 'LIVE' ? 'bg-rose-500' : type === 'RECORDED' ? 'bg-indigo-600' : 'bg-amber-500'
    }`} />
    <div>
       <h5 className="font-bold text-zinc-900 dark:text-white text-sm">{title}</h5>
       <p className="text-zinc-500 text-[11px] font-medium uppercase tracking-tight">{time}</p>
    </div>
  </div>
);

export default DashboardPage;
