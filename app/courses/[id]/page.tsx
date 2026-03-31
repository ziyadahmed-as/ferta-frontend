"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { 
  BookOpen, Clock, Users, Award, PlayCircle, Star, 
  MessageCircle, Zap, ShieldCheck, Share2, 
  CheckCircle2, ChevronRight, Lock, Loader2,
  FileText, Globe, BarChart3, Layers, Layout, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const CourseDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/courses/courses/${id}/`);
        setCourse(response.data);
        
        // Dynamic enrollment check logic goes here (placeholder for now)
        if (user) {
             // In a real app, we'd verify with a specific endpoint or check memberships
        }
      } catch (err) {
        console.error("Course fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${id}`);
      return;
    }
    setEnrolling(true);
    try {
      // Platform enrollment logic shard
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate gateway
      setIsEnrolled(true);
    } catch (err) {
      console.error("Enrollment error:", err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
     <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-white italic font-black tracking-[0.5em] animate-pulse uppercase">
        Hydrating Artifact...
     </div>
  );

  if (!course) return (
     <div className="h-screen flex items-center justify-center bg-white dark:bg-black font-black uppercase tracking-widest text-zinc-500">
        Knowledge Artifact Not Found.
     </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      
      {/* Hero Header Shard */}
      <div className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
         <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/10 to-transparent -z-10" />
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <div className="flex items-center gap-3 mb-8">
                  <span className="px-5 py-2 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white italic shadow-lg shadow-indigo-600/20">
                     {course.category_name}
                  </span>
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em] italic">Knowledge Artifact #{id}</span>
               </div>
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter italic leading-tight mb-8">
                  {course.title}
               </h1>
               <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-12 italic opacity-80">
                  {course.description || "Deploying institutional awareness through high-fidelity instruction and technical mastery."}
               </p>
               
               <div className="flex flex-wrap items-center gap-8 mb-12">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                        <Users size={20} className="text-indigo-600" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Instructor</p>
                        <p className="font-black text-zinc-900 dark:text-white italic">{course.instructor_name}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                        <Clock size={20} className="text-indigo-600" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Duration</p>
                        <p className="font-black text-zinc-900 dark:text-white italic">Self-Paced Mastery</p>
                     </div>
                  </div>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
               <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-[4rem] shadow-2xl relative z-10 overflow-hidden group">
                  <div className="relative h-96 overflow-hidden rounded-[3rem]">
                     {course.thumbnail ? (
                        <Image fill src={course.thumbnail} alt={course.title} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                     ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                           <PlayCircle size={64} className="text-white/20" />
                        </div>
                     )}
                     <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                           <PlayCircle size={40} className="text-indigo-600 ml-1" />
                        </button>
                     </div>
                  </div>
                  
                  <div className="p-8">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-2 font-mono">Registry Fee</span>
                           <h3 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter italic">${course.price}</h3>
                        </div>
                        <div className="text-right">
                           <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest block mb-1 font-mono">Active Artifact</span>
                           <div className="flex items-center gap-1 text-amber-500"><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/></div>
                        </div>
                     </div>
                     
                     {isEnrolled ? (
                        <button onClick={() => router.push(`/dashboard`)} className="w-full py-5 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 italic">
                           Access Learning Shard <Zap size={20}/>
                        </button>
                     ) : (
                        <button onClick={handleEnroll} disabled={enrolling} className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-zinc-950/20 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all italic disabled:opacity-50">
                           {enrolling ? <Loader2 className="animate-spin" size={20}/> : <>Initialize Enrollment <ArrowRight size={20}/></>}
                        </button>
                     )}
                     
                     <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest text-center mt-6 italic">Secure Institutional Transaction Registry</p>
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
            </motion.div>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Curriculum Hub */}
            <div className="lg:col-span-2">
               <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter italic mb-10 border-b border-zinc-100 dark:border-zinc-800 pb-8 flex items-center justify-between">
                  Curriculum Module Registry
                  <span className="text-xs text-zinc-400 font-mono tracking-normal not-italic">{course.chapters?.length || 0} MODULES</span>
               </h2>
               
               <div className="space-y-6">
                  {course.chapters && course.chapters.length > 0 ? (
                     course.chapters.map((chapter: any, i: number) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={chapter.id} className="group">
                           <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] group-hover:border-indigo-600/30 transition-all">
                              <div className="flex items-center justify-between mb-6">
                                 <h4 className="text-lg font-black text-zinc-900 dark:text-white tracking-tighter italic flex items-center gap-4">
                                    <span className="text-[10px] font-mono text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded">M{i+1}</span>
                                    {chapter.title}
                                 </h4>
                                 <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{chapter.lessons?.length || 0} Knowledge Shards</span>
                              </div>
                              <div className="space-y-3">
                                 {chapter.lessons?.map((lesson: any) => (
                                    <div key={lesson.id} className="flex items-center justify-between py-4 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 hover:translate-x-2 transition-transform cursor-pointer">
                                       <div className="flex items-center gap-4">
                                          <PlayCircle size={18} className="text-indigo-600" />
                                          <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{lesson.title}</span>
                                       </div>
                                       {lesson.is_preview ? (
                                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 italic">Global Preview</span>
                                       ) : (
                                          <Lock size={12} className="text-zinc-300" />
                                       )}
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                     ))
                  ) : (
                     <div className="p-20 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[4rem]">
                        <Layout className="mx-auto text-zinc-200 mb-6" size={48} />
                        <p className="text-zinc-400 font-black uppercase tracking-widest italic text-[10px]">Registry Under Development</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Platform Insights */}
            <div className="space-y-8">
               <div className="p-10 bg-zinc-900 dark:bg-zinc-800 rounded-[3.5rem] text-white shadow-2xl">
                  <h3 className="text-xl font-black italic tracking-tighter mb-8 flex items-center gap-3">
                     <ShieldCheck className="text-indigo-400" /> Standard Inclusions
                  </h3>
                  <ul className="space-y-6">
                     <li className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                           <Award size={20} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest italic">Institutional Certification</span>
                     </li>
                     <li className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                           <Zap size={20} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest italic">Lifelong Access Signaling</span>
                     </li>
                     <li className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                           <Globe size={20} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest italic">Multi-Node Accessibility</span>
                     </li>
                  </ul>
               </div>

               <div className="p-10 border border-zinc-100 dark:border-zinc-800 rounded-[3.5rem] bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/20">
                  <h3 className="text-xl font-black italic tracking-tighter mb-6">Instructor Expertise</h3>
                  <div className="flex flex-col items-center text-center">
                     <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-[2rem] flex items-center justify-center text-zinc-900 dark:text-white font-black text-4xl mb-6 shadow-xl italic">
                        {course.instructor_name?.[0].toUpperCase()}
                     </div>
                     <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-2 italic tracking-tighter">{course.instructor_name}</h4>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest italic mb-6">Master Research Associate</p>
                     <button className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 hover:underline underline-offset-8 italic">View Full Node History</button>
                  </div>
               </div>
            </div>
         </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
