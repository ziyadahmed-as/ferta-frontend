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
      await api.post(`/courses/courses/${id}/enroll/`);
      setIsEnrolled(true);
    } catch (err) {
      console.error("Enrollment error:", err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading course details...</p>
      </div>
    </div>
  );

  if (!course) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-center px-6">
      <Layout size={56} className="text-slate-300 mb-5" />
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Course Not Found</h1>
      <p className="text-slate-500 mb-6">The course you are looking for does not exist or has been removed.</p>
      <button onClick={() => router.push("/courses")} className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Browse Courses</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-900/10 dark:to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold uppercase tracking-wider">
                {course.category_name}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">4.8 (2.4k reviews)</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed max-w-2xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-600">
                  {course.instructor_name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-tight">Created by</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{course.instructor_name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-tight">Duration</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">12 Hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-600">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-tight">Students</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{course.enrollment_count || 0} enrolled</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Checkout Card - Sticky on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-6 rounded-3xl border border-white dark:border-slate-700 shadow-xl relative z-10 overflow-hidden">
              <div className="relative h-60 rounded-2xl overflow-hidden mb-6 group">
                {course.thumbnail ? (
                  <Image fill src={course.thumbnail} alt={course.title} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <PlayCircle size={48} className="text-slate-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play size={24} className="text-blue-600 fill-blue-600 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                   <p className="text-white text-sm font-medium drop-shadow-md">Preview this course</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">${course.price}</span>
                  {course.price > 0 && <span className="text-slate-500 line-through text-lg">${Math.round(course.price * 1.5)}</span>}
                </div>
                
                {isEnrolled ? (
                  <button 
                    onClick={() => router.push(`/courses/${id}/learn`)} 
                    className="w-full py-4 gradient-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Continue Learning <ArrowRight size={18}/>
                  </button>
                ) : (
                  <button 
                    onClick={handleEnroll} 
                    disabled={enrolling} 
                    className="w-full py-4 gradient-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {enrolling ? <Loader2 className="animate-spin" size={18}/> : <>Enroll Now <ArrowRight size={18}/></>}
                  </button>
                )}
                
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">This course includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check size={16} className="text-green-500" /> Full lifetime access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check size={16} className="text-green-500" /> Certificate of completion
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check size={16} className="text-green-500" /> Access on mobile and TV
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check size={16} className="text-green-500" /> Practical assignments
                    </li>
                  </ul>
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

            {/* Curriculum Area */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Course Content</h2>
                <span className="text-sm text-slate-500 font-medium">{course.chapters?.length || 0} sections • 12 lectures</span>
              </div>
              
              <div className="space-y-4">
                {course.chapters && course.chapters.length > 0 ? (
                  course.chapters.map((chapter: any, i: number) => (
                    <div key={chapter.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
                      <div className="p-5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                        <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-3">
                          <span className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">Section {i+1}</span>
                          {chapter.title}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">{chapter.lessons?.length || 0} lectures</span>
                      </div>
                      <div className="divide-y divide-slate-50 dark:divide-slate-700">
                        {chapter.lessons?.map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                              <PlayCircle size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              {lesson.is_preview && <span className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded uppercase">Preview</span>}
                              {!isEnrolled && !lesson.is_preview ? <Lock size={14} className="text-slate-300" /> : <Clock size={14} className="text-slate-300" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl bg-white dark:bg-slate-800/50">
                    <Layout className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500 font-medium">Curriculum is being updated.</p>
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
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg shadow-blue-500/20">
                {course.instructor_name?.[0].toUpperCase()}
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{course.instructor_name}</h4>
              <p className="text-sm text-slate-500 font-medium mb-6">Expert Instructor & Practitioner</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-800 dark:text-white">4.8</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-800 dark:text-white">1,245</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Students</p>
                </div>
              </div>
              
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all">View Instructor Profile</button>
            </div>

            {/* Platform Trust */}
            <div className="p-8 bg-slate-900 dark:bg-blue-950 rounded-3xl text-white shadow-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Shield size={20} className="text-blue-400" /> EduTech Guarantee
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Globe size={20} className="text-blue-300" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Learn from anywhere</h5>
                    <p className="text-xs text-slate-400 mt-1">Access courses on mobile, tablet, or desktop.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Award size={20} className="text-blue-300" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Verifiable Certificates</h5>
                    <p className="text-xs text-slate-400 mt-1">Stand out with industry-recognized certification.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Info size={20} className="text-blue-300" />
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
