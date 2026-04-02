"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen, Users, DollarSign, Star, TrendingUp, Home, Plus,
  Bell, LogOut, Settings, BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
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
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, coursesRes] = await Promise.all([
          api.get("/courses/courses/instructor_stats/"),
          api.get("/courses/courses/?mine=true"),
        ]);
        setStats(statsRes.data);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results || []);
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

  if (!user || (user.role !== "INSTRUCTOR" && !user.is_superuser && user.role !== "ADMIN")) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6 text-slate-800 dark:text-slate-100">
        <BookOpen size={56} className="text-blue-600 mb-5" />
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
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "revenue", label: "Revenue", icon: DollarSign },
  ];

  const statCards = [
    {
      label: "Total Courses",
      value: stats?.total_courses ?? courses.length,
      sub: "+2 this month",
      icon: BookOpen,
      iconClass: "icon-blue",
    },
    {
      label: "Total Students",
      value: stats?.total_enrollments?.toLocaleString() ?? "—",
      sub: "+1,234 this month",
      icon: Users,
      iconClass: "icon-teal",
    },
    {
      label: "Total Revenue",
      value: stats?.wallet_balance ? `$${Math.round(stats.wallet_balance).toLocaleString()}` : "—",
      sub: "+$12,340 this month",
      icon: DollarSign,
      iconClass: "icon-purple",
    },
    {
      label: "Avg. Rating",
      value: "4.8",
      sub: "+0.2 this month",
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
            <span className="text-lg font-bold text-slate-800 dark:text-white">Fatra<span className="text-blue-600"> Academy</span></span>
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
              <p className="text-xs text-slate-500">Instructor</p>
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
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div></div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
            <button title="Notifications" className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{user.username}</p>
                <p className="text-xs text-slate-500">Instructor</p>
              </div>
            </div>
            <button onClick={logout} title="Sign Out" className="p-2 text-slate-400 hover:text-red-500 transition-colors">
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
                Instructor Dashboard 🎓
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Manage your courses and track your teaching success</p>
            </div>
            <Link
              href="/instructor/courses/create"
              className="hidden sm:flex items-center gap-2 px-5 py-3 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-md shadow-blue-500/20"
            >
              <Plus size={18} />
              Create New Course
            </Link>
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
                <ResponsiveContainer width="100%" height="100%">
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
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Student Progress</h3>
              <div className="h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
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
                      item.name === 'In Progress' ? 'bg-blue-500' : 'bg-slate-200'
                    }`} />
                    <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                    <span className="ml-auto font-semibold text-slate-700 dark:text-slate-200">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Courses */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 dark:text-white">My Courses</h3>
              <Link href="/instructor/courses" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Manage All →
              </Link>
            </div>

            {courses.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 mb-4">No courses created yet.</p>
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
                          <Users size={13} /> {course.enrollment_count || 0} Students
                        </div>
                        <Link href={`/instructor/courses/${course.id}/edit`} title="Edit Course" className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                          <Settings size={14} className="text-slate-500 hover:text-blue-600" />
                        </Link>
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

export default InstructorDashboard;
