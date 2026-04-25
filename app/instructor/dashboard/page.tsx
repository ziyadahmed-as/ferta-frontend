"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Users, DollarSign, Star, TrendingUp, Home, Plus,
  Bell, LogOut, Settings, BarChart3, Clock, FileText, Link2, UploadCloud, CheckCircle, X
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 6500 },
  { month: "Apr", revenue: 7200 },
  { month: "May", revenue: 9100 },
  { month: "Jun", revenue: 11000 },
];

const progressData = [
  { name: "Completed", value: 68, color: "#10b981" },
  { name: "In Progress", value: 22, color: "#3b82f6" },
  { name: "Not Started", value: 10, color: "#e2e8f0" },
];

const InstructorDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any[]>(revenueData);
  const [courses, setCourses] = useState<any[]>([]);
  const [liveStreams, setLiveStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState<"video" | "live">("video");
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState<any>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [artifactData, setArtifactData] = useState({ title: "", type: "pdf", url: "", file: null as File | null });
  const [uploading, setUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, coursesRes, liveRes] = await Promise.all([
          api.get("/courses/courses/instructor_stats/"),
          api.get("/courses/courses/?mine=true"),
          api.get("/courses/live-streams/?mine=true"),
        ]);
        setStats(statsRes.data);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results || []);
        setLiveStreams(Array.isArray(liveRes.data) ? liveRes.data : liveRes.data.results || []);
        
        const analyticsRes = await api.get("/courses/courses/instructor_analytics/");
        if (analyticsRes.data?.monthly_data?.length > 0) {
          setAnalytics(analyticsRes.data.monthly_data);
        }
      } catch (err) {
        console.error("Instructor fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === "INSTRUCTOR" || user?.role === "ADMIN" || user?.is_superuser) fetchData();
    else setLoading(false);
  }, [user]);

  const handleUploadArtifact = async () => {
    if (!selectedSessionId || !artifactData.title) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("live_session", selectedSessionId);
      formData.append("title", artifactData.title);
      formData.append("type", artifactData.type);
      if (artifactData.type === "pdf" && artifactData.file) {
        formData.append("file", artifactData.file);
      } else if (artifactData.type === "link") {
        formData.append("url", artifactData.url);
      }

      await api.post("/courses/content-blocks/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      alert("Artifact uploaded successfully!");
      setArtifactData({ title: "", type: "pdf", url: "", file: null });
      // Refresh stream data to show new artifacts
      const res = await api.get("/courses/live-streams/?mine=true");
      const streams = Array.isArray(res.data) ? res.data : res.data.results || [];
      setLiveStreams(streams);
      
      // Update selectedStream to reflect changes in current modal
      if (selectedStream) {
        const updated = streams.find((s: any) => s.id === selectedStream.id);
        if (updated) setSelectedStream(updated);
      }
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error uploading artifact");
    } finally {
      setUploading(false);
    }
  };

  if (!mounted) return null;

  if (!user || (user.role !== "INSTRUCTOR" && !user.is_superuser && user.role !== "ADMIN")) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6 text-slate-800 dark:text-slate-100">
        <BookOpen size={56} className="text-cyan-600 mb-5" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Instructor Access Only</h1>
        <p className="text-slate-500 mb-6">You need an instructor account to access this dashboard.</p>
        <Link href="/" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Go Home</Link>
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
    { id: "courses", label: "My Teaching", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "revenue", label: "Revenue", icon: DollarSign },
  ];

  const statCards = [
    {
      label: "Total Content",
      value: (courses.length + liveStreams.length),
      sub: "+2 this month",
      icon: BookOpen,
      iconClass: "icon-blue",
    },
    {
      label: "Total Scholars",
      value: stats?.total_enrollments?.toLocaleString() ?? "0",
      sub: "+124 this month",
      icon: Users,
      iconClass: "icon-teal",
    },
    {
      label: "Wallet Balance",
      value: stats?.wallet_balance ? `$${Math.round(stats.wallet_balance).toLocaleString()}` : "—",
      sub: "Available for payout",
      icon: DollarSign,
      iconClass: "icon-purple",
    },
    {
      label: "Node Rating",
      value: "4.8",
      sub: "From live sessions",
      icon: Star,
      iconClass: "icon-green",
    },
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? "sidebar-active" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
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
              <p className="text-xs text-slate-500 capitalize">{user.instructor_type?.toLowerCase()?.replace('_', ' ') || 'Instructor'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            aria-label="Sign out of instructor account"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div></div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
            <button 
              title="Notifications" 
              aria-label="View notifications"
              className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{user.username}</p>
                <p className="text-xs text-slate-500 capitalize">{user.instructor_type?.toLowerCase()?.replace('_', ' ') || 'Instructor'}</p>
              </div>
            </div>
            <button 
              onClick={logout} 
              title="Sign Out" 
              aria-label="Sign out of account"
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="welcome-banner p-6 flex items-center justify-between rounded-2xl"
          >
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                Faculty Hub 🎓
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Orchestrate your knowledge nodes and manage your teaching cycles</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/instructor/live-streams/create"
                className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white text-cyan-600 rounded-xl font-bold text-sm hover:bg-cyan-50 transition-all border border-cyan-100"
              >
                <Plus size={18} />
                Live Hub
              </Link>
              <Link
                href="/instructor/courses/create"
                className="hidden sm:flex items-center gap-2 px-5 py-3 gradient-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-cyan-500/20"
              >
                <Plus size={18} />
                Video Course
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="stat-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 ${stat.iconClass} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-sm text-slate-500">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{stat.value}</p>
                  <p className="text-xs text-emerald-600 font-medium">{stat.sub}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Revenue Growth */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Revenue Growth</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={analytics}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} fill="url(#revenueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Student Progress Donut */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Node Engagement</h3>
              <div className="h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie data={progressData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                      {progressData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {progressData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      item.name === 'Completed' ? 'bg-emerald-500' : 
                      item.name === 'In Progress' ? 'bg-cyan-500' : 'bg-slate-200'
                    }`} />
                    <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                    <span className="ml-auto font-semibold text-slate-700 dark:text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teaching Content Sections */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveTab("video")}
                  title="View Video Content"
                  aria-label="Switch to Video Content tab"
                  className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "video"
                      ? "text-cyan-600 border-cyan-600"
                      : "text-slate-400 border-transparent hover:text-slate-600"
                    }`}
                >
                  Video Content
                </button>
                <button
                  onClick={() => setActiveTab("live")}
                  title="View Live Stream Hub"
                  aria-label="Switch to Live Stream Hub tab"
                  className={`text-base font-bold pb-2 transition-all border-b-2 ${activeTab === "live"
                      ? "text-cyan-600 border-cyan-600"
                      : "text-slate-400 border-transparent hover:text-slate-600"
                    }`}
                >
                  Live Stream Hub
                </button>
              </div>
              <Link href="/instructor/courses" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                Manage All Hubs →
              </Link>
            </div>

            {activeTab === "video" ? (
              courses.length === 0 ? (
                <div className="text-center py-10">
                  <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500 mb-4">No video courses created yet.</p>
                  <Link href="/instructor/courses/create" className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold inline-block">
                    Create First Course
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
                      <div className="relative h-36 bg-slate-100 dark:bg-slate-700">
                        <Image
                          src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          course.is_approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {course.is_approved ? "Approved" : "Pending"}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-2">{course.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Users size={13} /> {course.enrollment_count || 0} Scholars
                          </div>
                          <Link 
                            href={`/instructor/courses/${course.id}/edit`} 
                            title="Edit Course" 
                            aria-label={`Edit course ${course.title}`}
                            className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                          >
                            <Settings size={14} className="text-slate-500 hover:text-cyan-600" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              liveStreams.length === 0 ? (
                <div className="text-center py-10">
                  <BarChart3 size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500 mb-4">No live streams assigned yet.</p>
                  <p className="text-xs text-slate-400">Admins will assign you to live teaching cohorts.</p>
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
                      <div className="relative h-36 bg-slate-100 dark:bg-slate-700">
                        <Image
                          src={stream.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80"}
                          alt={stream.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2 py-1 bg-cyan-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {stream.group_type}
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-slate-800/90 rounded-full text-xs font-bold text-slate-800 dark:text-white">
                          {Math.round((stream.enrollment_count / stream.max_students) * 100)}% Full
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1 mb-2">{stream.title}</h4>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock size={13} /> {stream.live_sessions?.length || 0} Sessions
                          </div>
                          <button 
                            onClick={() => { setSelectedStream(stream); setShowManageModal(true); }}
                            title="Manage Hub"
                            aria-label={`Manage live hub for ${stream.title}`}
                            className="px-4 py-1.5 bg-cyan-600 text-white text-xs font-bold rounded-lg hover:bg-cyan-700 transition-all"
                          >
                            Manage Hub
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

      {/* Management Modal */}
      <AnimatePresence>
        {showManageModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowManageModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <BarChart3 className="text-cyan-600" size={20} />
                    Live Hub Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedStream?.title}</p>
                </div>
                <button 
                  onClick={() => setShowManageModal(false)} 
                  title="Close Modal" 
                  aria-label="Close live hub management modal"
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex h-[500px]">
                {/* Session Sidebar */}
                <div className="w-1/3 border-r border-slate-100 dark:border-slate-700 overflow-y-auto p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-3 px-2">Scheduled Sessions</p>
                  {selectedStream?.live_sessions?.map((session: any) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      title={`Select session: ${session.title}`}
                      aria-label={`Manage artifacts for session ${session.title}`}
                      className={`w-full text-left p-3 rounded-2xl transition-all ${
                        selectedSessionId === session.id 
                        ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 border border-cyan-100 dark:border-cyan-800" 
                        : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <p className="text-xs font-bold truncate">{session.title}</p>
                      <p className="text-[10px] opacity-70">{new Date(session.scheduled_at).toLocaleDateString()}</p>
                    </button>
                  ))}
                </div>

                {/* Artifact View */}
                <div className="flex-1 overflow-y-auto p-6">
                  {selectedSessionId ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Host Knowledge Artifacts</h4>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <button 
                            onClick={() => setArtifactData({...artifactData, type: 'pdf'})}
                            title="Select Research PDF"
                            aria-label="Set artifact type to Research PDF"
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${artifactData.type === 'pdf' ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-cyan-200'}`}
                          >
                            <FileText size={20} className={artifactData.type === 'pdf' ? 'text-cyan-600' : 'text-slate-400'} />
                            <span className="text-[10px] font-bold">Research PDF</span>
                          </button>
                          <button 
                            onClick={() => setArtifactData({...artifactData, type: 'link'})}
                            title="Select External Link"
                            aria-label="Set artifact type to External Link"
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${artifactData.type === 'link' ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-cyan-200'}`}
                          >
                            <Link2 size={20} className={artifactData.type === 'link' ? 'text-cyan-600' : 'text-slate-400'} />
                            <span className="text-[10px] font-bold">External Link</span>
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Artifact Label</label>
                            <input 
                              type="text"
                              placeholder="e.g. Week 1 Supporting Docs"
                              value={artifactData.title}
                              onChange={(e) => setArtifactData({...artifactData, title: e.target.value})}
                              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                          </div>

                          {artifactData.type === 'pdf' ? (
                            <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-cyan-400 transition-all group">
                              <input 
                                type="file" 
                                accept=".pdf"
                                title="Upload PDF artifact"
                                aria-label="Upload PDF artifact"
                                onChange={(e) => setArtifactData({...artifactData, file: e.target.files?.[0] || null})}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <UploadCloud size={32} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                              <p className="text-xs text-slate-500 font-medium">{artifactData.file ? artifactData.file.name : "Drop PDF here or click to browse"}</p>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Knowledge Signal (URL)</label>
                              <input 
                                type="url"
                                placeholder="https://..."
                                value={artifactData.url}
                                onChange={(e) => setArtifactData({...artifactData, url: e.target.value})}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                              />
                            </div>
                          )}

                          <button 
                            onClick={handleUploadArtifact}
                            disabled={uploading || !artifactData.title}
                            className="w-full py-4 gradient-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {uploading ? "Provisioning..." : <><CheckCircle size={18} /> Deploy Artifact</>}
                          </button>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                        <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 px-1">Active Artifacts</h5>
                        <div className="space-y-2">
                          {selectedStream?.live_sessions?.find((s: any) => s.id === selectedSessionId)?.content_blocks?.map((block: any) => (
                            <div key={block.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                              <div className="flex items-center gap-3">
                                {block.type === 'pdf' ? <FileText size={14} className="text-red-500" /> : <Link2 size={14} className="text-cyan-500" />}
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{block.title}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase">{block.type}</span>
                            </div>
                          ))}
                          {!selectedStream?.live_sessions?.find((s: any) => s.id === selectedSessionId)?.content_blocks?.length && (
                            <p className="text-xs text-slate-400 italic text-center py-4">No artifacts deployed for this session</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10">
                      <BarChart3 size={48} className="text-slate-200 mb-4" />
                      <h4 className="text-slate-400 font-medium">Select a session hub to manage knowledge artifacts</h4>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstructorDashboard;
