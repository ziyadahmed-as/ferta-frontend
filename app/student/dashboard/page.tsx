"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Clock, Award, TrendingUp, Home, Calendar, Trophy,
  Bell, LogOut, PlayCircle, GraduationCap, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
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

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/courses/?enrolled=true");
        setCourses(Array.isArray(response.data) ? response.data : response.data.results || []);
      } catch (err) {
        console.error("Student enrollment fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchCourses();
  }, [user]);

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-6">
        <GraduationCap size={56} className="text-blue-600 mb-5" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Sign in Required</h1>
        <p className="text-slate-500 mb-6">Please sign in to access your student dashboard.</p>
        <Link href="/login" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Sign In</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "certificates", label: "Certificates", icon: Trophy },
  ];

  const stats = [
    { label: "Enrolled Courses", value: courses.length || 3, icon: BookOpen, iconClass: "icon-blue" },
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
            <span className="text-lg font-bold text-slate-800 dark:text-white">Edu<span className="text-blue-600">Tech</span></span>
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
            <span className="font-bold text-slate-800 dark:text-white md:hidden">FetraTech</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button title="Notifications" className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
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
            <Link href="/" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <LogOut size={16} />
            </Link>
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
                Welcome back, {user.username}! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">You're making great progress. Keep it up!</p>
            </div>
            <div className="text-5xl hidden sm:block">🎓</div>
          </motion.div>

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

          {/* My Courses */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 dark:text-white text-base">My Courses</h3>
              <Link href="/courses" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                Browse All <ChevronRight size={16} />
              </Link>
            </div>

            {courses.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No courses enrolled yet.</p>
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
                        <Link href={`/courses/${course.id}/learn`} className="text-xs text-blue-600 font-semibold hover:text-blue-700">Continue →</Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
