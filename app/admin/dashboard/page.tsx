"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Users, BookOpen, DollarSign, TrendingUp, Home, UserPlus,
  CheckCircle2, XCircle, Bell, LogOut, ShieldCheck, Cpu, BarChart3,
  Search, Plus, Trash2, Filter, ShieldAlert, MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  
  /* User Management State */
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [userTab, setUserTab] = useState("all"); // "all" or "applications"
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  const [liveStreams, setLiveStreams] = useState<any[]>([]);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState<any>(null);
  const [duplicateInstructorId, setDuplicateInstructorId] = useState("");


  const fetchAllUsers = async () => {
    try {
      const res = await api.get("/users/manage/");
      setAllUsers(res.data);
    } catch (err) {
      console.error("All users fetch error:", err);
    }
  };

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

  const fetchLiveStreams = async () => {
    try {
      const res = await api.get("/courses/live-streams/");
      setLiveStreams(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Live streams fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" || user?.is_superuser) {
      fetchStats();
      fetchAllUsers();
      fetchLiveStreams();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleInstructorAction = async (userId: number, approve: boolean) => {
    setActionLoading(userId);
    try {
      const endpoint = approve
        ? `/users/manage/${userId}/approve_instructor/`
        : `/users/manage/${userId}/reject_instructor/`;
      await api.post(endpoint);
      fetchStats();
      fetchAllUsers();
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/manage/", newUser);
      setShowAddModal(false);
      setNewUser({ username: "", email: "", password: "", role: "STUDENT" });
      fetchAllUsers();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error adding user");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/manage/${userId}/`);
      fetchAllUsers();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting user");
    }
  };

  const handleUpdateRole = async (userId: number, newRole: string) => {
    try {
      await api.patch(`/users/manage/${userId}/`, { role: newRole });
      fetchAllUsers();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error updating role");
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

  const handleDuplicateStream = async () => {
    if (!selectedStream || !duplicateInstructorId) return;
    try {
      await api.post(`/courses/live-streams/${selectedStream.id}/duplicate/`, {
        instructor_id: duplicateInstructorId
      });
      setShowDuplicateModal(false);
      setDuplicateInstructorId("");
      fetchLiveStreams();
      alert("Stream duplicated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error duplicating stream");
    }
  };


  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && !user.is_superuser)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6 text-slate-800 dark:text-slate-100">
        <ShieldCheck size={56} className="text-indigo-600 mb-5" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Access Required</h1>
        <p className="text-slate-500 mb-6">You need administrator privileges to access this panel.</p>
        <Link href="/" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Go Home</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
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
    { id: "live", label: "Live Streams", icon: Cpu },
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
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">Fatra<span className="text-indigo-600"> Academy</span></span>
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
                                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
                                >
                                  <Check size={16} /> Approve
                                </button>
                                <button
                                  onClick={() => handleInstructorAction(app.id, false)}
                                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
                                >
                                  <X size={16} /> Reject
                                </button>
                              </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "live" && (
                <div className="space-y-6">
                  <div className="welcome-banner p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Live Stream Moderation</h2>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">Orchestrate synchronous learning cohorts and instructor capacity</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-white/50 dark:bg-slate-700/50 px-4 py-2 rounded-xl border border-white/20">
                        <p className="text-[10px] uppercase font-bold text-slate-500">Active Streams</p>
                        <p className="text-xl font-black text-indigo-600">{liveStreams.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {liveStreams.length === 0 ? (
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
                        <Cpu size={40} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-slate-500">No active live streams in the network.</p>
                      </div>
                    ) : (
                      liveStreams.map((stream: any) => (
                        <div key={stream.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col lg:flex-row items-center gap-6 group hover:border-indigo-200 shadow-sm transition-all">
                          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0">
                            {stream.title[0]}
                          </div>
                          <div className="flex-1 text-center lg:text-left">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{stream.title}</h4>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1.5"><Users size={14} /> {stream.instructor_name}</span>
                              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-indigo-500" /> {stream.group_type}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-8 px-6 border-l border-r border-slate-100 dark:border-slate-700 hidden lg:flex">
                            <div className="text-center">
                              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Capacity</p>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold ${stream.enrollment_count >= stream.max_students ? 'text-red-500' : 'text-emerald-500'}`}>
                                  {stream.enrollment_count}/{stream.max_students}
                                </span>
                                <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${stream.enrollment_count >= stream.max_students ? 'bg-red-500' : 'bg-emerald-500'}`}
                                    style={{ width: `${Math.min(100, (stream.enrollment_count / stream.max_students) * 100)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {stream.enrollment_count >= stream.max_students && (
                              <button 
                                onClick={() => {
                                  setSelectedStream(stream);
                                  setShowDuplicateModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                              >
                                <Plus size={16} /> Duplicate (Full)
                              </button>
                            )}
                            <button className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                              <MoreVertical size={20} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeModule === "revenue" && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="welcome-banner p-6 rounded-2xl flex-1">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight flex items-center gap-2">
                        <Users className="text-indigo-600" size={24} />
                        User Management
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Control platform access and instructor nodes</p>
                    </div>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus size={18} /> Add New User
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit border border-slate-200 dark:border-slate-700">
                    <button 
                      onClick={() => setUserTab("all")}
                      className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${userTab === "all" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                      All Platform Users
                    </button>
                    <button 
                      onClick={() => setUserTab("applications")}
                      className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${userTab === "applications" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                      Node Applications
                      {stats?.pending_instructors?.length > 0 && (
                        <span className="bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                          {stats.pending_instructors.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {userTab === "all" ? (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                      {/* Table Header / Filters */}
                      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            type="text" 
                            placeholder="Search by name, email or role..."
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <Filter className="text-slate-400" size={18} />
                          <select 
                            value={roleFilter}
                            aria-label="Filter by role"
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="flex-1 md:w-48 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                          >
                            <option value="all">All Roles</option>
                            <option value="STUDENT">Students</option>
                            <option value="INSTRUCTOR">Instructors</option>
                            <option value="ADMIN">Admins</option>
                            <option value="SUPER_ADMIN">Super Admins</option>
                          </select>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                              <th className="px-6 py-4">User Identity</th>
                              <th className="px-6 py-4">Node Role</th>
                              <th className="px-6 py-4">Participation</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {allUsers
                              .filter(u => {
                                const matchesSearch = u.username.toLowerCase().includes(userSearch.toLowerCase()) || 
                                                     u.email.toLowerCase().includes(userSearch.toLowerCase());
                                const matchesRole = roleFilter === "all" || u.role === roleFilter;
                                return matchesSearch && matchesRole;
                              })
                              .map((u) => {
                                const canManage = user?.role === 'SUPER_ADMIN' || (user?.role === 'ADMIN' && !['ADMIN', 'SUPER_ADMIN'].includes(u.role));
                                return (
                                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                                    <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                                          {u.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                          <div className="font-bold text-slate-800 dark:text-white mb-0.5">{u.username}</div>
                                          <div className="text-xs text-slate-500">{u.email}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <select 
                                        value={u.role}
                                        aria-label="Change user role"
                                        disabled={!canManage}
                                        onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                        className={`text-xs font-bold px-3 py-1.5 rounded-full border-none focus:ring-0 cursor-pointer transition-all ${
                                          u.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' :
                                          u.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30' :
                                          u.role === 'INSTRUCTOR' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-700'
                                        } ${!canManage && 'opacity-70 cursor-not-allowed text-center'}`}
                                      >
                                        <option value="STUDENT">Student</option>
                                        <option value="INSTRUCTOR">Instructor</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="SUPER_ADMIN">Super Admin</option>
                                      </select>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-indigo-500" 
                                            style={{ width: `${Math.min(100, (u.points || 0) / 10)}%` }}
                                          />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500">{u.points || 0} pts</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <button 
                                          onClick={() => handleDeleteUser(u.id)}
                                          disabled={!canManage}
                                          className={`p-2 rounded-xl transition-all ${
                                            canManage 
                                              ? 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
                                              : 'text-slate-300 cursor-not-allowed opacity-50'
                                          }`}
                                          title={canManage ? "Delete user" : "Insufficient permissions"}
                                        >
                                          <Trash2 size={18} />
                                        </button>
                                        {!canManage && (
                                          <span title="Protected account">
                                            <ShieldAlert size={14} className="text-slate-300" />
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(stats?.pending_instructors || []).length === 0 ? (
                        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-16 text-center shadow-sm">
                          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Protocol Fully Synced</h3>
                          <p className="text-slate-500 max-w-sm mx-auto">All faculty node applications have been reviewed. No pending entities in the queue.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {stats.pending_instructors.map((app: any) => (
                            <div key={app.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-indigo-200 transition-all shadow-sm">
                              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-500/10">
                                {app.username?.[0]?.toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">{app.username}</h4>
                                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 bg-amber-50 text-amber-600 dark:bg-amber-900/20 rounded-md">Candidate</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-500">
                                  <div>
                                    <p className="font-medium text-slate-400 mb-0.5 uppercase tracking-tighter">Academic Field</p>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-bold">{app.expertise || 'Generalist'}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-slate-400 mb-0.5 uppercase tracking-tighter">Experience</p>
                                    <p className="text-slate-700 dark:text-slate-200 font-bold">{app.years_of_experience} Cycles</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="font-medium text-slate-400 mb-0.5 uppercase tracking-tighter">Contact Hub</p>
                                    <p className="text-slate-700 dark:text-slate-200 font-bold">{app.email}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 w-full md:w-auto shrink-0 border-t md:border-l md:border-t-0 pt-4 md:pt-0 md:pl-6 border-slate-100 dark:border-slate-700">
                                <button
                                  onClick={() => handleInstructorAction(app.id, true)}
                                  disabled={actionLoading === app.id}
                                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/10"
                                >
                                  {actionLoading === app.id ? <Cpu size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                                  Authorize
                                </button>
                                <button
                                  onClick={() => handleInstructorAction(app.id, false)}
                                  disabled={actionLoading === app.id}
                                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                                >
                                  <XCircle size={16} /> Terminate
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <UserPlus className="text-indigo-600" size={20} />
                  Provision New Identity
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)} 
                  aria-label="Close modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Network Username</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Satoshi_99"
                    value={newUser.username}
                    onChange={e => setNewUser({...newUser, username: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Communication Hub (Email)</label>
                  <input 
                    required
                    type="email" 
                    placeholder="satoshi@fatra.academy"
                    value={newUser.email}
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Access Protocol (Password)</label>
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    value={newUser.password}
                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Institutional Role</label>
                  <select 
                    value={newUser.role}
                    aria-label="New user role"
                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="STUDENT">Student (Default Node)</option>
                    <option value="INSTRUCTOR">Instructor (Faculty)</option>
                    {user?.role === 'SUPER_ADMIN' && <option value="ADMIN">Admin (Protocol Moderator)</option>}
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Confirm Provision
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Duplicate Stream Modal */}
      <AnimatePresence>
        {showDuplicateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDuplicateModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">Scale Cohort Node</h3>
              <p className="text-sm text-slate-500 mb-6">Create a duplicate stream for <b>{selectedStream?.title}</b> to handle excess demand.</p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Assigned Faculty ID</label>
                  <input 
                    type="number"
                    placeholder="Enter Instructor User ID"
                    value={duplicateInstructorId}
                    onChange={(e) => setDuplicateInstructorId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setShowDuplicateModal(false)}
                    className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl text-sm font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDuplicateStream}
                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-500/20"
                  >
                    Launch Stream
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
