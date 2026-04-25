"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Clock, Award, TrendingUp, Home, Calendar, Trophy,
  Bell, LogOut, PlayCircle, GraduationCap, ChevronRight, Star, X, FileText, Link2, ArrowRight, ShieldAlert, Globe
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const learningProgressData = [
  { week: "W1", hours: 5 },
  { week: "W2", hours: 8 },
  { week: "W3", hours: 12 },
  { week: "W4", hours: 10 },
  { week: "W5", hours: 15 },
  { week: "W6", hours: 13 },
  { week: "W7", hours: 18 },
];

const coursePerformanceData = [
  { course: "Math", score: 88 },
  { course: "Science", score: 92 },
  { course: "English", score: 75 },
  { course: "Tech", score: 95 },
];

const masteryData = [
  { name: "Completed", value: 35, color: "#4f46e5" },
  { name: "In Progress", value: 45, color: "#818cf8" },
  { name: "Remaining", value: 20, color: "#e2e8f0" },
];

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [liveStreams, setLiveStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState<"video" | "live">("video");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [selectedStreamForRating, setSelectedStreamForRating] = useState<any>(null);
  const [selectedStreamForLearn, setSelectedStreamForLearn] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Secure Artifact Viewer State */
  const [showArtifactViewer, setShowArtifactViewer] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, liveRes] = await Promise.all([
          api.get("/courses/courses/?enrolled=true"),
          api.get("/courses/live-streams/?enrolled=true")
        ]);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results || []);
        setLiveStreams(Array.isArray(liveRes.data) ? liveRes.data : liveRes.data.results || []);
      } catch (err) {
        console.error("Student dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const handleRateStream = async () => {
    if (!selectedStreamForRating) return;
    setSubmittingRating(true);
    try {
      await api.post(`/courses/live-streams/${selectedStreamForRating.id}/rate_instructor/`, {
        rating,
        comment
      });
      setShowRatingModal(false);
      setRating(5);
      setComment("");
      alert("Thank you for your feedback!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error submitting rating");
    } finally {
      setSubmittingRating(false);
    }
  };

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6 text-slate-800 dark:text-slate-100">
        <GraduationCap size={56} className="text-cyan-600 mb-5" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Sign in Required</h1>
        <p className="text-slate-500 mb-6">Please sign in to access your student dashboard.</p>
        <Link href="/login" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Sign In</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Learning", icon: BookOpen },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "certificates", label: "Certificates", icon: Trophy },
  ];

  const stats = [
    { label: "Learning Nodes", value: (courses.length + liveStreams.length) || 0, icon: BookOpen, iconClass: "icon-blue" },
    { label: "Hours Learned", value: 68, icon: Clock, iconClass: "icon-teal" },
    { label: "Certificates", value: 2, icon: Award, iconClass: "icon-purple" },
    { label: "Avg. Score", value: "86%", icon: TrendingUp, iconClass: "icon-green" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">Fatra<span className="text-cyan-600"> Academy</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                title={`Go to ${item.label}`}
                aria-label={`Navigate to ${item.label}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? "sidebar-active" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{user.username}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role?.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            aria-label="Sign out of student account"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center md:hidden">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white md:hidden">Fatra Academy</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
            <button 
              title="Notifications" 
              aria-label="View recent notifications"
              className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.username?.[0]?.toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-white leading-none">{user.username}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role?.toLowerCase()}</p>
              </div>
            </div>
            <Link 
              href="/" 
              title="Sign Out"
              aria-label="Exit to landing page"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Next Up / Progress Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-900 rounded-[40px] p-8 text-white shadow-2xl shadow-teal-500/20 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-125 transition-all duration-1000" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 flex items-center justify-center p-2 shrink-0">
                  <div className="w-full h-full bg-white/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                    ⚡
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-[3px] text-teal-200">Next Recommended Node</p>
                  </div>
                  <h2 className="text-3xl font-black mb-3 tracking-tighter">
                    {courses[0]?.title || liveStreams[0]?.title || "Explore New Frontiers"}
                  </h2>
                  <p className="text-teal-100/70 text-sm font-medium mb-6 line-clamp-2">
                    Your learning velocity is increasing. Jump back into the curriculum and maintain your streak.
                  </p>
                  <button className="px-8 py-3 bg-white text-teal-600 rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Resume Mission →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 p-8 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none">Curriculum Mastery</h3>
                <Star size={16} className="text-amber-500 fill-amber-500" />
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                 <div className="h-40 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={masteryData} 
                          innerRadius={50} 
                          outerRadius={75} 
                          paddingAngle={5} 
                          dataKey="value"
                        >
                          {masteryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <p className="text-3xl font-black text-slate-800 dark:text-white leading-none">82%</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-4 mt-6">
                    {masteryData.slice(0, 2).map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{item.name}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="stat-card flex items-center gap-4"
                >
                  <div className={`w-12 h-12 ${stat.iconClass} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Progress */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4 text-base">Learning Progress</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learningProgressData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Course Performance */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4 text-base">Course Performance</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coursePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="course" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="url(#barGradient)" maxBarSize={50} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* My Courses / Learning Sections */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveTab("video")}
                  title="View Video Courses"
                  aria-label="Switch to Video Courses tab"
                  className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "video"
                      ? "text-cyan-600 border-cyan-600"
                      : "text-slate-400 border-transparent hover:text-slate-600"
                    }`}
                >
                  Video Courses
                </button>
                <button
                  onClick={() => setActiveTab("live")}
                  title="View Live Sessions"
                  aria-label="Switch to Live Sessions tab"
                  className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "live"
                      ? "text-cyan-600 border-cyan-600"
                      : "text-slate-400 border-transparent hover:text-slate-600"
                    }`}
                >
                  Live Sessions
                </button>
              </div>
              <Link href="/courses" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
                Browse More <ChevronRight size={16} />
              </Link>
            </div>

            {activeTab === "video" ? (
              courses.length === 0 ? (
                <div className="text-center py-12">
                  <GraduationCap size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No video courses enrolled yet.</p>
                  <Link href="/courses" className="px-6 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold inline-block hover:opacity-90">
                    Explore Courses
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course: any, idx: number) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all group"
                    >
                      <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-700">
                        <Image
                          src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <PlayCircle size={40} className="text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-2">{course.title}</h4>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                          <div className="h-full gradient-primary rounded-full w-[45%]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{course.completion_percentage || 0}% Complete</span>
                          <Link href={`/courses/${course.id}/learn`} className="text-xs text-cyan-600 font-semibold hover:text-cyan-700">Continue →</Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              liveStreams.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No live sessions joined yet.</p>
                  <Link href="/courses?type=live" className="px-6 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold inline-block hover:opacity-90">
                    Join a Live Stream
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {liveStreams.map((stream: any, idx: number) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all group"
                    >
                      <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-700">
                        <Image
                          src={stream.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80"}
                          alt={stream.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full animate-pulse uppercase tracking-wider">
                          Live Soon
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-1">{stream.title}</h4>
                        <p className="text-xs text-slate-500 mb-3">With Prof. {stream.instructor_name}</p>
                        <div className="space-y-2 mb-4">
                          {stream.live_sessions?.slice(0, 1).map((session: any) => (
                            <div key={session.id} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                              <Calendar size={12} className="text-cyan-500" />
                              Next: {new Date(session.scheduled_at).toLocaleDateString()}
                            </div>
                          ))}
                        </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => { setSelectedStreamForRating(stream); setShowRatingModal(true); }}
                              title="Rate Stream"
                              aria-label={`Submit rating for ${stream.title}`}
                              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                              Rate
                            </button>
                            <button 
                              onClick={() => { setSelectedStreamForLearn(stream); setShowLearnModal(true); }}
                              title="Knowledge Hub"
                              aria-label={`Open learning hub for ${stream.title}`}
                              className="flex-1 text-center px-4 py-1.5 gradient-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all font-bold"
                            >
                              Knowledge Hub
                            </button>
                          </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </main>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRatingModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Rate Instructor</h3>
                <button 
                  onClick={() => setShowRatingModal(false)} 
                  title="Close Modal" 
                  aria-label="Close Rating Modal"
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-500 mb-3">How was your session with <b>{selectedStreamForRating?.instructor_name}</b>?</p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        title={`Rate ${star} stars`}
                        aria-label={`Submit ${star} star rating`}
                        className={`p-1 transition-all ${star <= rating ? "text-amber-400 scale-110" : "text-slate-300"}`}
                      >
                        <Star size={32} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Share your experience</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What did you learn today? Any feedback for the professor?"
                    className="w-full h-32 px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRatingModal(false)}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-sm"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={handleRateStream}
                    disabled={submittingRating}
                    className="flex-1 py-3 gradient-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                  >
                    {submittingRating ? "Submitting..." : "Submit Rating"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Learning Hub Modal */}
      <AnimatePresence>
        {showLearnModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLearnModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">Learning Hub</h3>
                    <p className="text-xs text-slate-500">{selectedStreamForLearn?.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLearnModal(false)} 
                  title="Close Modal" 
                  aria-label="Close learning hub modal"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar space-y-8">
                {selectedStreamForLearn?.live_sessions?.map((session: any, sIdx: number) => (
                  <div key={session.id} className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-700 last:border-transparent">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-600 border-4 border-white dark:border-slate-800 shadow-sm shadow-cyan-200" />
                    
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">{session.title}</h4>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                          {new Date(session.scheduled_at).toLocaleDateString()} @ {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      {session.link && session.is_active && (
                        <a 
                          href={session.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors mb-4 ring-1 ring-emerald-500/20"
                        >
                          <PlayCircle size={14} /> Join Live Transmission
                        </a>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Synchronous Artifacts</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {session.content_blocks?.map((block: any) => (
                          <button 
                            key={block.id}
                            onClick={() => {
                              setActiveArtifact(block);
                              setShowArtifactViewer(true);
                            }}
                            className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600 shadow-sm group text-left"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${block.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-cyan-50 text-cyan-500'}`}>
                              {block.type === 'pdf' ? <FileText size={16} /> : <Link2 size={16} />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-cyan-600 transition-colors">{block.title}</p>
                              <div className="flex items-center gap-2">
                                <p className="text-[9px] text-slate-400 uppercase font-bold">{block.type}</p>
                                <span className="text-[9px] text-teal-500 font-bold uppercase tracking-widest">• Read Only</span>
                              </div>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
                              <ArrowRight size={12} />
                            </div>
                          </button>
                        ))}
                        {(!session.content_blocks || session.content_blocks.length === 0) && (
                          <div className="col-span-2 py-4 px-2 border border-dashed border-slate-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center">
                            <Clock size={16} className="text-slate-300 mb-1" />
                            <p className="text-[10px] text-slate-400 font-medium italic">No signal artifacts yet for this session</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {(!selectedStreamForLearn?.live_sessions || selectedStreamForLearn.live_sessions.length === 0) && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10">
                    <Calendar size={48} className="text-slate-200 mb-4" />
                    <h4 className="text-slate-400 font-medium">Synchronizing curriculum... No sessions scheduled yet.</h4>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                <button 
                  onClick={() => setShowLearnModal(false)}
                  className="w-full py-4 text-slate-500 dark:text-slate-400 font-bold text-xs hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Synchronous Artifact Viewer - Secure Read Only */}
      <AnimatePresence>
        {showArtifactViewer && activeArtifact && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowArtifactViewer(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/10"
            >
              <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${activeArtifact.type === 'pdf' ? 'bg-red-500 text-white' : 'bg-cyan-500 text-white'}`}>
                    {activeArtifact.type === 'pdf' ? <FileText size={20} /> : <Link2 size={20} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight">
                      {activeArtifact.title}
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-slate-500 flex items-center gap-1">
                         <ShieldAlert size={10} /> Secure Identity Viewer
                       </span>
                       <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-black uppercase tracking-widest">Read Only Protocol</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowArtifactViewer(false)}
                  title="Return to Hub"
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all transform hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
                {/* Security Overlay - Prevents Right Click and Selection on top of Viewer */}
                <div 
                  className="absolute inset-0 z-10 select-none pointer-events-auto"
                  onContextMenu={(e) => e.preventDefault()}
                />
                
                {activeArtifact.type === 'pdf' ? (
                  <iframe
                    src={`${activeArtifact.file || activeArtifact.url}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-none"
                    title={activeArtifact.title}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-12">
                    <Globe size={64} className="text-slate-200 dark:text-slate-800 mb-6" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-4">External Synchronous Source</h4>
                    <p className="text-slate-500 max-w-sm mb-8">This resource is hosted on an external platform. You may view the live content below.</p>
                    <div className="w-full h-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                       <iframe
                         src={activeArtifact.url}
                         className="w-full h-full border-none"
                         title={activeArtifact.title}
                       />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest"> Intellectual Property Protected by Fatra Academy Governance</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;
