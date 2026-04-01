"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Users, BookOpen, DollarSign, TrendingUp, Home, UserPlus,
  CheckCircle2, XCircle, Bell, LogOut, ShieldCheck, Cpu, BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

const platformGrowthData = [
  { month: "Jan", users: 42000, revenue: 85000 },
  { month: "Feb", users: 44500, revenue: 92000 },
  { month: "Mar", users: 46000, revenue: 98000 },
  { month: "Apr", users: 47200, revenue: 112000 },
  { month: "May", users: 49100, revenue: 135000 },
  { month: "Jun", users: 50234, revenue: 168000 },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState("overview");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchStats = async () => {
    try {
      const res = await api.get("/users/admin-stats/");
      setStats(res.data);
    } catch (err) {
      console.error("Admin stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN" || user?.is_superuser) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  /* Icon Wrappers */
  const handleInstructorAction = async (userId: number, approve: boolean) => {
    setActionLoading(userId);
    try {
      const endpoint = approve
        ? `/users/manage/${userId}/approve_instructor/`
        : `/users/manage/${userId}/reject_instructor/`;
      await api.post(endpoint);
      fetchStats();
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCourseAction = async (courseId: number, approve: boolean) => {
    setActionLoading(courseId);
    try {
      const endpoint = approve ? `/courses/${courseId}/approve/` : `/courses/${courseId}/reject/`;
      await api.post(endpoint);
      fetchStats();
    } catch (err) {
      console.error("Course action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (!user || (user.role !== "ADMIN" && !user.is_superuser)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
        <ShieldCheck size={56} className="text-indigo-600 mb-5" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Access Required</h1>
        <p className="text-slate-500 mb-6">You need administrator privileges to access this panel.</p>
        <Link href="/" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Go Home</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "revenue", label: "Revenue", icon: DollarSign },
  ];

  const statCards = [
    {
      label: "Total Users",
      value: stats?.users?.students + (stats?.users?.instructors || 0) || "50,234",
      sub: "+2,543 this month",
      icon: Users,
      iconClass: "icon-blue",
    },
    {
      label: "Active Courses",
      value: stats?.courses?.total || 256,
      sub: "+14 this month",
      icon: BookOpen,
      iconClass: "icon-teal",
    },
    {
      label: "Platform Revenue",
      value: stats?.revenue?.total ? `$${Math.round(stats.revenue.total / 1000)}K` : "$168K",
      sub: "+$23K this month",
      icon: DollarSign,
      iconClass: "icon-purple",
    },
    {
      label: "Growth Rate",
      value: "+23%",
      sub: "+5% from last month",
      icon: TrendingUp,
      iconClass: "icon-green",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">Edu<span className="text-indigo-600">Tech</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? "sidebar-active" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
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
              <p className="text-xs text-slate-500">Administrator</p>
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

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div></div>
          <div className="flex items-center gap-3">
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
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
            <button onClick={logout} title="Sign Out" className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeModule === "overview" && (
                <div className="space-y-6">
                  {/* Welcome */}
                  <div className="welcome-banner p-6 rounded-2xl">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                      Admin Dashboard 🔧
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Platform overview and management</p>
                  </div>

                  {/* Stats */}
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
                            <div className={`w-11 h-11 ${stat.iconClass} rounded-xl flex items-center justify-center`}>
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

                  {/* Platform Growth Chart */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-semibold text-slate-800 dark:text-white">Platform Growth Overview</h3>
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-indigo-500 inline-block rounded" /> Users</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-purple-500 inline-block rounded" /> Revenue</span>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats?.monthly_growth || platformGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                          <YAxis hide />
                          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={false} />
                          <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 icon-blue rounded-xl flex items-center justify-center">
                          <UserPlus size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Pending Instructors</h3>
                          <p className="text-xs text-slate-500">{stats?.pending_instructors?.length || 0} awaiting review</p>
                        </div>
                        <button
                          onClick={() => setActiveModule("users")}
                          className="ml-auto text-xs text-blue-600 font-semibold hover:underline"
                        >
                          Review →
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(stats?.pending_instructors || []).slice(0, 3).map((app: any) => (
                          <div key={app.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {app.username?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{app.username}</span>
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Pending</span>
                          </div>
                        ))}
                        {!stats?.pending_instructors?.length && (
                          <p className="text-xs text-slate-400 text-center py-2">No pending applications</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 icon-purple rounded-xl flex items-center justify-center">
                          <BookOpen size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Courses Awaiting Approval</h3>
                          <p className="text-xs text-slate-500">{stats?.courses?.pending_approval || 0} pending</p>
                        </div>
                        <button
                          onClick={() => setActiveModule("courses")}
                          className="ml-auto text-xs text-blue-600 font-semibold hover:underline"
                        >
                          Review →
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(stats?.courses?.pending_list || []).slice(0, 3).map((c: any) => (
                          <div key={c.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="w-7 h-7 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 text-xs font-bold shrink-0">
                              {c.title?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{c.title}</span>
                            <span className="text-xs text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-full">Review</span>
                          </div>
                        ))}
                        {!stats?.courses?.pending_list?.length && (
                          <p className="text-xs text-slate-400 text-center py-2">No pending courses</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "users" && (
                <div className="space-y-5">
                  <div className="welcome-banner p-5 rounded-2xl">
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Instructor Applications</h2>
                    <p className="text-slate-600 text-sm">{stats?.pending_instructors?.length || 0} applications awaiting review</p>
                  </div>

                  {(stats?.pending_instructors || []).length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
                      <CheckCircle2 size={40} className="mx-auto text-emerald-400 mb-3" />
                      <p className="text-slate-500 font-medium">All applications reviewed. No pending items.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.pending_instructors.map((app: any) => (
                        <div key={app.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
                          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {app.username?.[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-800 dark:text-white">{app.username}</h4>
                              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Applicant</span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                              <span>{app.email}</span>
                              <span>•</span>
                              <span>{app.years_of_experience} years exp.</span>
                              {app.expertise && (
                                <>
                                  <span>•</span>
                                  <span className="text-blue-600 font-medium">{app.expertise}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleInstructorAction(app.id, true)}
                              disabled={actionLoading === app.id}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                            >
                              {actionLoading === app.id ? <Cpu size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                              Approve
                            </button>
                            <button
                              onClick={() => handleInstructorAction(app.id, false)}
                              disabled={actionLoading === app.id}
                              className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeModule === "courses" && (
                <div className="space-y-5">
                  <div className="welcome-banner p-5 rounded-2xl">
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Course Moderation</h2>
                    <p className="text-slate-600 text-sm">{stats?.courses?.pending_approval || 0} courses awaiting approval</p>
                  </div>

                  {(stats?.courses?.pending_list || []).length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
                      <CheckCircle2 size={40} className="mx-auto text-emerald-400 mb-3" />
                      <p className="text-slate-500 font-medium">No courses awaiting moderation.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.courses.pending_list.map((c: any) => (
                        <div key={c.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-700 font-bold text-lg shrink-0">
                            {c.title?.[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{c.title}</h4>
                            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                              <span>By {c.instructor}</span>
                              <span>•</span>
                              <span>{c.category}</span>
                              <span>•</span>
                              <span className="text-blue-600 font-medium">${c.price}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleCourseAction(c.id, true)}
                              disabled={actionLoading === c.id}
                              className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                            >
                              {actionLoading === c.id ? <Cpu size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                              Approve
                            </button>
                            <button
                              onClick={() => handleCourseAction(c.id, false)}
                              disabled={actionLoading === c.id}
                              className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeModule === "revenue" && (
                <div className="space-y-5">
                  <div className="welcome-banner p-5 rounded-2xl">
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Revenue Analytics</h2>
                    <p className="text-slate-600 text-sm">Platform financial overview</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Total Revenue", value: stats?.revenue?.total ? `$${Math.round(stats.revenue.total).toLocaleString()}` : "$168,000", iconClass: "icon-purple" },
                      { label: "This Month", value: "$23,400", iconClass: "icon-blue" },
                      { label: "Growth Rate", value: "+23%", iconClass: "icon-green" },
                    ].map((item) => (
                      <div key={item.label} className="stat-card">
                        <div className={`w-10 h-10 ${item.iconClass} rounded-xl flex items-center justify-center mb-3`}>
                          <DollarSign size={18} className="text-white" />
                        </div>
                        <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Revenue & User Growth</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={platformGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                          <YAxis hide />
                          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                          <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} dot={false} name="Revenue ($)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
