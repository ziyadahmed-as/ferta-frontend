"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { 
  BookOpen, Clock, Users, Award, PlayCircle, Star, 
  CheckCircle2, ChevronRight, Lock, Loader2,
  Globe, Layout, ArrowRight, Play, Info, Shield, Check
} from "lucide-react";
import { motion } from "framer-motion";
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
        
        // Enrollment check
        if (user && response.data.is_enrolled) {
          setIsEnrolled(true);
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
      const res = await api.post(`/courses/courses/${id}/enroll/`);
      
      if (res.data.payment_required) {
        const checkoutRes = await api.post(`/finance/payments/${res.data.payment_id}/create_checkout_session/`);
        if (checkoutRes.data.url) {
          window.location.href = checkoutRes.data.url;
        } else {
          alert("Failed to initiate checkout");
          setEnrolling(false);
        }
      } else {
        setIsEnrolled(true);
        setEnrolling(false);
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading course details...</p>
      </div>
    </div>
  );

  if (!course) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6">
      <Layout size={56} className="text-slate-300 mb-5" />
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Course Not Found</h1>
      <p className="text-slate-500 mb-6">The course you are looking for does not exist or has been removed.</p>
      <button onClick={() => router.push("/courses")} className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Browse Courses</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-900/50">
      <Navbar />
      
      {/* High-Fidelity Hero Header */}
      <div className="relative pt-40 pb-24 px-6 overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50/50 to-teal-50/30 dark:from-cyan-900/10 dark:to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-4 py-1.5 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-[3px] border border-cyan-100/50 dark:border-cyan-800/30">
                {course.category_name}
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl border border-amber-100/50 dark:border-amber-800/30">
                <Star size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">{course.rating} Core Sync</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-8 tracking-tighter leading-[0.9]">
              {course.title}
            </h1>
            
            <p className="text-xl font-medium text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[20px] gradient-primary flex items-center justify-center text-white text-xl font-black shadow-xl">
                  {course.instructor_name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[2px] mb-1">Curator Node</p>
                  <p className="text-base font-black text-slate-800 dark:text-white tracking-tight">@{course.instructor_name}</p>
                </div>
              </div>
              
              <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[20px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-teal-600 border border-slate-100 dark:border-slate-700">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[2px] mb-1">Scholastic Value</p>
                  <p className="text-base font-black text-slate-800 dark:text-white tracking-tight">12+ Hours Logic</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Institutional Provisioning Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[48px] border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-all duration-1000" />
              
              <div className="relative h-64 rounded-[32px] overflow-hidden mb-8 shadow-2xl border-4 border-slate-50 dark:border-slate-900">
                {course.thumbnail ? (
                  <Image fill src={course.thumbnail} alt={course.title} className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    <PlayCircle size={64} className="text-slate-200" />
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                    <Play size={28} className="text-teal-600 fill-teal-600 ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Enrollment Price</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter">${course.price}</span>
                      {course.price > 0 && <span className="text-slate-400 line-through text-lg font-bold">${Math.round(course.price * 1.5)}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1">Status</p>
                    <span className="text-xs font-black text-slate-800 dark:text-white tracking-widest uppercase">Verified Node</span>
                  </div>
                </div>
                
                {isEnrolled ? (
                  <button 
                    onClick={() => router.push(`/courses/${id}/learn`)} 
                    className="w-full py-6 gradient-primary text-white rounded-[24px] text-xs font-black uppercase tracking-[3px] shadow-2xl shadow-teal-500/30 active:scale-95 transition-all flex items-center justify-center gap-4"
                  >
                    Continue Mastery <ArrowRight size={20}/>
                  </button>
                ) : (
                  <button 
                    onClick={handleEnroll} 
                    disabled={enrolling} 
                    className="w-full py-6 gradient-primary text-white rounded-[24px] text-xs font-black uppercase tracking-[3px] shadow-2xl shadow-teal-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                  >
                    {enrolling ? <Loader2 className="animate-spin" size={20}/> : <>Initialize Access <ArrowRight size={20}/></>}
                  </button>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Check size={16} />, text: "Lifetime Access" },
                    { icon: <Shield size={16} />, text: "Secure Certs" },
                    { icon: <Globe size={16} />, text: "Global Node" },
                    { icon: <Layout size={16} />, text: "Asset Library" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                      <div className="text-teal-600">{item.icon}</div>
                      <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Areas */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Description / About */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">About this course</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                This comprehensive course is designed to take you from beginner to advanced. Whether you are looking to start a new career or enhance your current skills, this program provides the tools and knowledge needed to succeed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Master fundamental concepts",
                  "Build real-world projects",
                  "Best practices and industry standards",
                  "Hands-on exercises and quizzes"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                      <Check size={14} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Scholastic Architecture (Curriculum or Schedule) */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                  {course.course_type === 'LIVE_STREAM' ? "Synchronous Schedule" : "Scholastic Architecture"}
                </h2>
                <div className="flex items-center gap-3">
                   <div className="h-px w-20 bg-slate-100 dark:bg-slate-800" />
                   <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                     {course.course_type === 'LIVE_STREAM' 
                       ? `${course.live_streams?.[0]?.live_sessions?.length || 0} Sequences` 
                       : `${course.chapters?.length || 0} Sections • 12 Lectures`}
                   </span>
                </div>
              </div>
              
              <div className="space-y-6">
                {course.course_type === 'LIVE_STREAM' ? (
                  /* High-Fidelity Live Schedule View */
                  <div className="space-y-6">
                    {course.live_streams?.[0]?.live_sessions?.length > 0 ? (
                      course.live_streams[0].live_sessions.map((session: any, idx: number) => (
                        <motion.div 
                          key={session.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative flex gap-8 pl-8 border-l-2 border-slate-100 dark:border-slate-800 last:border-transparent pb-8"
                        >
                          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-lg shadow-teal-500/20 group-hover:scale-125 transition-transform" />
                          
                          <div className="flex-1 bg-white dark:bg-slate-800/50 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-teal-500/5 hover:border-teal-500/20 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                              <div>
                                <span className="text-[10px] font-black text-teal-600 uppercase tracking-[2px] mb-2 block">Sequence {idx + 1}</span>
                                <h4 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none uppercase">{session.title}</h4>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Transmission Time</p>
                                  <p className="text-xs font-black text-slate-800 dark:text-white uppercase">
                                    {new Date(session.scheduled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-teal-600">
                                  <Clock size={18} />
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                              {session.description || "Detailed intellectual abstract for this synchronous exchange node is being finalized by faculty."}
                            </p>
                            
                            <div className="flex items-center gap-4">
                               <div className="flex -space-x-2">
                                 {[1, 2, 3].map(i => (
                                   <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-black">
                                     {String.fromCharCode(64 + i)}
                                   </div>
                                 ))}
                               </div>
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">32+ Students Synced</span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-20 text-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[48px] bg-slate-50/50 dark:bg-slate-900/20">
                        <Calendar className="mx-auto text-slate-200 mb-6" size={64} />
                        <h4 className="text-xl font-black text-slate-400 tracking-tight uppercase">Synchronizing Schedule</h4>
                        <p className="text-sm font-medium text-slate-500 mt-2">Faculty is currently orchestrating the synchronous sequences.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Standard Curriculum View */
                  course.chapters && course.chapters.length > 0 ? (
                    course.chapters.map((chapter: any, i: number) => (
                      <div key={chapter.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all">
                        <div className="p-6 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-700">
                          <h4 className="font-black text-slate-800 dark:text-white flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-xs text-teal-600 font-black">
                              0{i+1}
                            </span>
                            <span className="tracking-tight uppercase">{chapter.title}</span>
                          </h4>
                          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{chapter.lessons?.length || 0} Artifacts</span>
                        </div>
                        <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
                          {chapter.lessons?.map((lesson: any) => (
                            <div key={lesson.id} className="flex items-center justify-between p-5 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-all group cursor-pointer">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 group-hover:text-teal-500 transition-colors">
                                  <PlayCircle size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-tight">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                {lesson.is_preview && <span className="text-[9px] font-black text-teal-600 px-3 py-1 bg-teal-50 dark:bg-teal-900/30 rounded-full uppercase tracking-widest border border-teal-100 dark:border-teal-800">Preview</span>}
                                {!isEnrolled && !lesson.is_preview ? <Lock size={14} className="text-slate-300" /> : <Clock size={14} className="text-slate-300" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-20 text-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[48px] bg-slate-50/50 dark:bg-slate-900/20">
                      <Layout className="mx-auto text-slate-200 mb-6" size={64} />
                      <h4 className="text-xl font-black text-slate-400 tracking-tight uppercase">Registry Updating</h4>
                      <p className="text-sm font-medium text-slate-500 mt-2">Scholastic architecture is being provisioned.</p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Student Feedback Area */}
            <section>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">Scholastic Review</h2>
                <div className="flex items-center gap-3 px-6 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                  <Star size={20} className="text-amber-500 fill-amber-500" />
                  <span className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">{course.rating}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {course.reviews && course.reviews.length > 0 ? (
                  course.reviews.map((review: any) => (
                    <div key={review.id} className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-cyan-600 font-bold">
                            {review.student_name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-white">{review.student_name}</p>
                            <p className="text-xs text-slate-500">{new Date(review.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={14} fill={star <= review.rating ? "currentColor" : "none"} className={star > review.rating ? "text-slate-300" : ""} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {review.comment || "No comment provided."}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl bg-white dark:bg-slate-800/50">
                    <Star className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500 font-medium">No reviews yet. Be the first to rate this course!</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Sidebar Components */}
          <div className="lg:col-span-4 space-y-8">
            {/* Instructor Info */}
            <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">About Instructor</h3>
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                {course.instructor_name?.[0]?.toUpperCase()}
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{course.instructor_name}</h4>
              <p className="text-sm text-slate-500 font-medium mb-6">Expert Instructor & Practitioner</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{course.rating}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{course.enrollment_count || 0}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Students</p>
                </div>
              </div>
              
              <button className="text-sm font-bold text-cyan-600 hover:text-cyan-700 hover:underline underline-offset-4 transition-all">View Instructor Profile</button>
            </div>

            {/* Platform Trust */}
            <div className="p-8 bg-slate-900 dark:bg-blue-950 rounded-3xl text-white shadow-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Shield size={20} className="text-cyan-400" /> Fatra Academy Guarantee
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Globe size={20} className="text-cyan-300" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Learn from anywhere</h5>
                    <p className="text-xs text-slate-400 mt-1">Access courses on mobile, tablet, or desktop.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Award size={20} className="text-cyan-300" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Verifiable Certificates</h5>
                    <p className="text-xs text-slate-400 mt-1">Stand out with industry-recognized certification.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Info size={20} className="text-cyan-300" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">24/7 Support</h5>
                    <p className="text-xs text-slate-400 mt-1">Get help from our community and mentors.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
