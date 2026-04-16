"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Users, BookOpen, DollarSign, TrendingUp, Home, UserPlus,
  CheckCircle2, XCircle, Bell, LogOut, ShieldCheck, Cpu, BarChart3,
  Search, Plus, Trash2, Filter, ShieldAlert, MoreVertical, Check, X, Edit, Eye, User, Calendar, Mail, Award, Book,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Tag, PlusCircle, LayoutDashboard,
  FileText, Upload, ToggleLeft, ToggleRight, FileUp
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userDetail, setUserDetail] = useState<any>(null);

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [liveStreams, setLiveStreams] = useState<any[]>([]);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState<any>(null);
  const [duplicateInstructorId, setDuplicateInstructorId] = useState("");
  
  /* Course Management State */
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseTab, setCourseTab] = useState("all"); // "all" or "pending"
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editCourseData, setEditCourseData] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    slug: "",
    description: "",
    price: "0.00",
    category: "",
    instructor: "",
    course_type: "VIDEO_BASED",
    is_published: false
  });

  /* Live Stream Creation State */
  const [showAddStreamModal, setShowAddStreamModal] = useState(false);
  const [showEditStreamModal, setShowEditStreamModal] = useState(false);
  const [editStreamData, setEditStreamData] = useState<any>(null);
  const [newStream, setNewStream] = useState({
    title: "",
    description: "",
    instructor: "",
    scheduled_at: "",
    meeting_link: "",
    price: "5000.00",
    group_type: "VIP1"
  });

  /* Live Session Creation State */
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [selectedStreamForSession, setSelectedStreamForSession] = useState<any>(null);
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    scheduled_at: "",
    meeting_link: ""
  });

  /* Categories State */
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "" });
  const [editCategory, setEditCategory] = useState<any>(null);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  /* Knowledge Base State */
  const [knowledgeDocs, setKnowledgeDocs] = useState<any[]>([]);
  const [knowledgeSearch, setKnowledgeSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const res = await api.get("/users/manage/");
      setAllUsers(Array.isArray(res.data) ? res.data : res.data.results || []);
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

  const fetchCategories = async () => {
    try {
      const res = await api.get("/courses/categories/");
      setCategories(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Categories fetch error:", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/courses/");
      setAllCourses(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Courses fetch error:", err);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/ai/documents/");
      setKnowledgeDocs(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Knowledge docs fetch error:", err);
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", uploadTitle);
      formData.append("description", uploadDescription);
      formData.append("file", uploadFile);
      await api.post("/ai/documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowUploadModal(false);
      setUploadTitle("");
      setUploadDescription("");
      setUploadFile(null);
      fetchDocuments();
      alert("Document uploaded successfully! The AI chatbot will now use it.");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error uploading document");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleToggleDocument = async (docId: number, currentActive: boolean) => {
    try {
      await api.patch(`/ai/documents/${docId}/`, { is_active: !currentActive });
      fetchDocuments();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error toggling document");
    }
  };

  const handleDeleteDocument = async (docId: number) => {
    if (!confirm("Are you sure you want to delete this document? The AI chatbot will no longer have access to it.")) return;
    try {
      await api.delete(`/ai/documents/${docId}/`);
      fetchDocuments();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting document");
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" || user?.is_superuser) {
      fetchStats();
      fetchAllUsers();
      fetchLiveStreams();
      fetchCategories();
      fetchCourses();
      fetchDocuments();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Reset to first page whenever search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [userSearch, roleFilter]);

  const filteredUsers = allUsers.filter(u => 
    u.username.toLowerCase().includes(userSearch.toLowerCase()) && 
    (roleFilter === "all" || u.role === roleFilter)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      const { password, ...updateData } = editUser;
      // Only include password if it's being changed
      const payload = password ? { ...updateData, password } : updateData;
      await api.patch(`/users/manage/${editUser.id}/`, payload);
      setShowEditModal(false);
      fetchAllUsers();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error updating user");
    }
  };

  const handleCourseAction = async (courseId: number, approve: boolean) => {
    setActionLoading(courseId);
    try {
      const endpoint = approve ? `/courses/courses/${courseId}/approve/` : `/courses/courses/${courseId}/reject/`;
      await api.post(endpoint);
      fetchStats();
      fetchCourses();
    } catch (err) {
      console.error("Course action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCourseData) {
        await api.patch(`/courses/courses/${editCourseData.id}/`, editCourseData);
        alert("Course updated successfully!");
      } else {
        await api.post("/courses/courses/", {
          ...newCourse,
          category: newCourse.category ? parseInt(newCourse.category) : null,
          instructor: newCourse.instructor ? parseInt(newCourse.instructor) : null,
          price: parseFloat(newCourse.price)
        });
        alert("Course created successfully!");
      }
      setShowCourseModal(false);
      setEditCourseData(null);
      setNewCourse({
        title: "",
        slug: "",
        description: "",
        price: "0.00",
        category: "",
        instructor: "",
        course_type: "VIDEO_BASED",
        is_published: false
      });
      fetchCourses();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error saving course");
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm("Are you sure you want to delete this course and all its contents?")) return;
    try {
      await api.delete(`/courses/courses/${courseId}/`);
      fetchCourses();
      fetchStats();
      alert("Course deleted successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting course");
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

  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStream.instructor) {
      alert("Please select an instructor");
      return;
    }
    try {
      const payload = {
        ...newStream,
        instructor: parseInt(newStream.instructor),
        price: parseFloat(newStream.price)
      };
      await api.post("/courses/live-streams/", payload);
      setShowAddStreamModal(false);
      setNewStream({ title: "", description: "", instructor: "", scheduled_at: "", meeting_link: "", price: "5000.00", group_type: "VIP1" });
      fetchLiveStreams();
      alert("Live Stream Created successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Error creating stream");
    }
  };

  const handleEditStreamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/courses/live-streams/${editStreamData.id}/`, editStreamData);
      setShowEditStreamModal(false);
      setEditStreamData(null);
      fetchLiveStreams();
      fetchStats();
      alert("Live Stream updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error updating stream");
    }
  };

  const handleDeleteStream = async (id: number) => {
    if (!confirm("Are you sure? This will delete the cohort and all its sessions.")) return;
    try {
      await api.delete(`/courses/live-streams/${id}/`);
      fetchLiveStreams();
      fetchStats();
      alert("Live Stream deleted successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting stream");
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStreamForSession) return;
    try {
      await api.post("/courses/live-sessions/", {
        ...newSession,
        live_stream: selectedStreamForSession.id
      });
      setShowAddSessionModal(false);
      setNewSession({ title: "", description: "", scheduled_at: "", meeting_link: "" });
      setSelectedStreamForSession(null);
      fetchLiveStreams();
      alert("Live Session / Schedule created successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Error creating schedule");
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/courses/categories/", newCategory);
      setShowAddCategoryModal(false);
      setNewCategory({ name: "", slug: "", description: "" });
      fetchCategories();
      alert("Category Created successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Error creating category");
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory) return;
    try {
      await api.patch(`/courses/categories/${editCategory.id}/`, editCategory);
      setShowEditCategoryModal(false);
      setEditCategory(null);
      fetchCategories();
      alert("Category Updated successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Error updating category");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/courses/categories/${id}/`);
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Error deleting category");
    }
  };


  if (!mounted) return null;

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
    { id: "categories", label: "Categories", icon: Tag },
    { id: "live", label: "Live Sessions", icon: Cpu },
    { id: "knowledge", label: "Knowledge Base", icon: FileText },
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
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveModule("courses")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeModule === "courses" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
            >
              Courses
            </button>
            <button 
              onClick={() => setActiveModule("live")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeModule === "live" ? "bg-rose-600 text-white shadow-lg shadow-rose-500/20" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
            >
              Live Sessions
            </button>
          </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 icon-teal rounded-xl flex items-center justify-center">
                          <TrendingUp size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Live Sessions Hub</h3>
                          <p className="text-xs text-slate-500">{liveStreams?.length || 0} active hubs</p>
                        </div>
                        <button
                          onClick={() => setActiveModule("live")}
                          className="ml-auto text-xs text-teal-600 font-semibold hover:underline"
                        >
                          Manage →
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(liveStreams || []).slice(0, 3).map((s: any) => (
                          <div key={s.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="w-7 h-7 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-teal-600 text-xs font-bold shrink-0">
                              {s.title?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{s.title}</span>
                            <span className="text-[10px] text-teal-600 font-bold">{s.enrollment_count}/{s.max_students}</span>
                          </div>
                        ))}
                        {!liveStreams?.length && (
                          <p className="text-xs text-slate-400 text-center py-2">No active hubs</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "users" && (
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
                          {stats?.pending_instructors?.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {userTab === "all" ? (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            type="text" 
                            placeholder="Search users..."
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Filter size={18} className="text-slate-400" />
                          <select 
                            value={roleFilter}
                            title="Filter by role"
                            aria-label="Filter by role"
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-indigo-500"
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
                          <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <tr>
                              <th className="px-6 py-4">User Identity</th>
                              <th className="px-6 py-4">Institutional Role</th>
                              <th className="px-6 py-4">Registry / Expertise</th>
                              <th className="px-6 py-4">Knowledge Nodes</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {currentUsers.map((u) => (
                              <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white text-xs font-bold">{u.username?.[0]?.toUpperCase() || "U"}</div>
                                    <div>
                                      <p className="text-sm font-bold text-slate-800 dark:text-white">{u.username}</p>
                                      <p className="text-[10px] text-slate-500">{u.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                    u.role === 'SUPER_ADMIN' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 
                                    u.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 
                                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                  }`}>{u.role}</span>
                                </td>
                                <td className="px-6 py-4">
                                  {u.role === 'INSTRUCTOR' ? (
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">
                                        {u.expertise || 'General Instruction'}
                                      </span>
                                      <span className="text-[10px] text-slate-400">{u.education_level || 'Faculty'}</span>
                                    </div>
                                  ) : u.role === 'STUDENT' ? (
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                        {u.points || 0} Unified Points
                                      </span>
                                      <span className="text-[10px] text-slate-400">Active Scholar</span>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-slate-400">System Admin</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                                    {u.role === 'INSTRUCTOR' && (u.taught_courses || []).length > 0 ? (
                                      u.taught_courses.map((c: string, idx: number) => (
                                        <span key={idx} className="text-[9px] bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100 dark:border-indigo-800">
                                          {c}
                                        </span>
                                      ))
                                    ) : u.role === 'STUDENT' && (u.enrolled_courses || []).length > 0 ? (
                                      u.enrolled_courses.map((c: string, idx: number) => (
                                        <span key={idx} className="text-[9px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-800">
                                          {c}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-[10px] text-slate-400">No activity logs</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button 
                                      onClick={() => { setUserDetail(u); setShowDetailModal(true); }}
                                      title="System Identity Detail"
                                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                    >
                                      <Eye size={16} />
                                    </button>
                                    <button 
                                      onClick={() => { setEditUser(u); setShowEditModal(true); }}
                                      title="Edit User"
                                      className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteUser(u.id)} 
                                      title="Delete User"
                                      aria-label="Delete User"
                                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="px-6 py-4 bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <p className="text-xs text-slate-500 font-medium">
                            Showing <span className="text-slate-800 dark:text-slate-200">{startIndex + 1}</span> to <span className="text-slate-800 dark:text-slate-200">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of <span className="text-slate-800 dark:text-slate-200">{filteredUsers.length}</span> nodes
                          </p>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => setCurrentPage(1)}
                              disabled={currentPage === 1}
                              title="First Page"
                              className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            >
                              <ChevronsLeft size={16} />
                            </button>
                            <button 
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={currentPage === 1}
                              title="Previous Page"
                              className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            
                            <div className="flex items-center gap-1 px-2">
                              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) pageNum = i + 1;
                                else if (currentPage <= 3) pageNum = i + 1;
                                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                else pageNum = currentPage - 2 + i;
                                
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                      currentPage === pageNum 
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                            </div>

                            <button 
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              disabled={currentPage === totalPages}
                              title="Next Page"
                              className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            >
                              <ChevronRight size={16} />
                            </button>
                            <button 
                              onClick={() => setCurrentPage(totalPages)}
                              disabled={currentPage === totalPages}
                              title="Last Page"
                              className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            >
                              <ChevronsRight size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(stats?.pending_instructors || []).map((app: any) => (
                        <div key={app.id} className="group relative bg-white dark:bg-slate-800 rounded-[32px] border border-slate-200 dark:border-slate-700/50 p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/10">
                          <div className="flex items-start gap-6">
                            <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-lg relative shrink-0">
                               {app.username?.[0]?.toUpperCase() || "C"}
                               <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center border-4 border-white dark:border-slate-800">
                                  <ShieldAlert size={12} className="text-white" />
                               </div>
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between gap-2 mb-1">
                                  <h4 className="font-black text-xl text-slate-800 dark:text-white truncate tracking-tight">{app.username}</h4>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md">Pending Validation</span>
                               </div>
                               <p className="text-xs font-bold text-slate-400 mb-4">{app.email}</p>
                               
                               <div className="flex items-center gap-3 mb-6">
                                  <div className="px-3 py-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Specialization: TBD</div>
                                  <div className="px-3 py-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Clearance: L1</div>
                               </div>

                               <div className="flex gap-3">
                                  <button 
                                    onClick={() => handleInstructorAction(app.id, true)} 
                                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                  >
                                    <Check size={14} /> 
                                    <span className="hidden sm:inline">Grant Node Access</span>
                                  </button>
                                  <button 
                                     onClick={() => handleInstructorAction(app.id, false)} 
                                     title="Decline Node Access Request"
                                     className="px-6 py-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 transition-all"
                                   >
                                     <X size={14} /> 
                                   </button>
                               </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!stats?.pending_instructors || stats.pending_instructors.length === 0) && (
                        <div className="col-span-full py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                           <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                              <CheckCircle2 size={32} className="text-emerald-500" />
                           </div>
                           <h4 className="text-lg font-black text-slate-800 dark:text-white">Protocol Clear</h4>
                           <p className="text-sm text-slate-500">No pending instructor applications found in the registry.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeModule === "courses" && (
                <div className="space-y-8">
                  <div className="gradient-primary-soft p-12 rounded-[48px] relative overflow-hidden group border border-indigo-100/50 dark:border-indigo-900/20">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-125 transition-all duration-1000" />
                     <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div>
                          <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter flex items-center gap-5">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl text-indigo-600">
                               <BookOpen size={36} />
                            </div>
                            Knowledge Lab
                          </h2>
                          <p className="text-slate-600 dark:text-slate-300 text-xl font-medium opacity-80 max-w-xl leading-relaxed">Systematic orchestration, validation, and curation of the Fatra Academy intellectual property registry.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <div className="flex items-center gap-4">
                             <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl px-8 py-5 rounded-[32px] border border-white/60 shadow-2xl shadow-indigo-500/10 text-center">
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[3px] mb-1">Artifact Content</p>
                                <p className="text-5xl font-black text-indigo-600 tracking-tighter">{allCourses.length}</p>
                             </div>
                             <div className="bg-amber-500 px-8 py-5 rounded-[32px] shadow-2xl shadow-amber-500/30 text-white text-center">
                                <p className="text-[10px] uppercase font-black text-amber-100 tracking-[3px] mb-1">Queue Size</p>
                                <p className="text-5xl font-black tracking-tighter">{allCourses.filter(c => !c.is_approved && c.is_submitted).length}</p>
                             </div>
                           </div>
                           <button 
                             onClick={() => { setEditCourseData(null); setShowCourseModal(true); }}
                             className="w-full sm:w-auto h-20 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black text-xs uppercase tracking-[3px] shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4"
                           >
                             <PlusCircle size={24} /> New Node
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 p-2 bg-slate-100 dark:bg-slate-800/80 rounded-[28px] w-fit border border-slate-200 dark:border-slate-700/50">
                    <button 
                      onClick={() => setCourseTab("all")}
                      className={`px-10 py-4 rounded-[22px] text-xs font-black uppercase tracking-[2px] transition-all ${courseTab === "all" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-2xl" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Institutional Registry
                    </button>
                    <button 
                      onClick={() => setCourseTab("moderation")}
                      className={`px-10 py-4 rounded-[22px] text-xs font-black uppercase tracking-[2px] transition-all flex items-center gap-4 ${courseTab === "moderation" ? "bg-white dark:bg-slate-700 text-rose-500 shadow-2xl" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Validation Queue
                      {allCourses.filter(c => !c.is_approved && c.is_submitted).length > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-xl shadow-lg animate-bounce">
                          {allCourses.filter(c => !c.is_approved && c.is_submitted).length}
                        </span>
                      )}
                    </button>
                  </div>

                  {courseTab === "all" ? (
                    <div className="bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                      <div className="p-8 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-[450px] shadow-2xl shadow-indigo-500/5">
                          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                          <input 
                            type="text" 
                            placeholder="Search Knowledge Artifacts..."
                            value={courseSearch}
                            onChange={(e) => setCourseSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-none rounded-[28px] text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                          />
                        </div>
                        <div className="flex items-center gap-4">
                           <button title="Global Filter" className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400"><Filter size={20}/></button>
                           <button title="Density Toggle" className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400"><LayoutDashboard size={20}/></button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 text-[10px] font-black uppercase tracking-[3px] border-b border-slate-100 dark:border-slate-800">
                            <tr>
                              <th className="px-10 py-6">Knowledge Artifact</th>
                              <th className="px-10 py-6">Assigned Faculty</th>
                              <th className="px-10 py-6 text-center">Status Protocol</th>
                              <th className="px-10 py-6 text-right">Registry Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {allCourses
                              .filter(c => courseSearch === "" || c.title.toLowerCase().includes(courseSearch.toLowerCase()))
                              .map((c: any) => (
                                <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 group transition-all">
                                  <td className="px-10 py-8">
                                    <div className="flex items-center gap-6">
                                      <div className="w-20 h-16 rounded-[22px] overflow-hidden bg-slate-100 border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-transform">
                                        <img src={c.thumbnail || "/api/placeholder/120/80"} alt={c.title} className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md uppercase tracking-widest mb-1.5 inline-block">{c.category_name || "General"}</span>
                                        <p className="text-base font-black text-slate-800 dark:text-white tracking-tight leading-tight">{c.title}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center text-white text-[10px] font-black uppercase shadow-xl">
                                         {c.instructor_username?.charAt(0)}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">@{c.instructor_username}</span>
                                        <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Validated Faculty</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-10 py-8">
                                    <div className="flex justify-center">
                                      {c.is_approved ? (
                                        <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-black uppercase tracking-[2px] rounded-[14px] border border-emerald-100/50 dark:border-emerald-800/30">
                                          <CheckCircle2 size={14} /> Authenticated
                                        </span>
                                      ) : c.is_submitted ? (
                                        <span className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[10px] font-black uppercase tracking-[2px] rounded-[14px] border border-amber-100/50 dark:border-amber-800/30">
                                          <ShieldAlert size={14} /> Validation Req.
                                        </span>
                                      ) : (
                                        <span className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-400 text-[10px] font-black uppercase tracking-[2px] rounded-[14px]">
                                          Draft Artifact
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-10 py-8 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button 
                                        onClick={() => { setEditCourseData(c); setShowCourseModal(true); }}
                                        className="p-4 bg-slate-50 dark:bg-slate-900/50 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                                        title="Modify Artifact"
                                      >
                                        <Edit size={18} />
                                      </button>
                                      <button 
                                        onClick={() => handleDeleteCourse(c.id)}
                                        className="p-4 bg-slate-50 dark:bg-slate-900/50 text-slate-400 hover:text-rose-500 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                                        title="De-provision Artifact"
                                      >
                                        <Trash2 size={18} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {allCourses.filter(c => !c.is_approved && c.is_submitted).map((c: any) => (
                         <div key={c.id} className="bg-white dark:bg-slate-800 rounded-[48px] border-b-8 border-amber-500 p-10 shadow-2xl shadow-indigo-500/5 flex flex-col gap-8 transition-transform hover:-translate-y-2 duration-500">
                            <div className="flex gap-8">
                               <div className="w-40 h-28 rounded-3xl overflow-hidden shadow-2xl shrink-0 border-4 border-white dark:border-slate-900">
                                  <img src={c.thumbnail || "/api/placeholder/160/120"} alt="ModView" className="w-full h-full object-cover" />
                               </div>
                               <div className="flex-1 space-y-3">
                                  <div className="flex items-center gap-3">
                                     <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg">L2 Queue</span>
                                     <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter leading-tight line-clamp-2">{c.title}</h4>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-white text-[8px] font-black overflow-hidden">
                                        {c.instructor_username?.charAt(0)}
                                     </div>
                                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">By Faculty: <span className="text-slate-700 dark:text-slate-200">@{c.instructor_username}</span></p>
                                  </div>
                               </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Catalog ID</p>
                                  <p className="text-lg font-black text-slate-800 dark:text-white leading-none">MOD-{c.id}</p>
                               </div>
                               <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Asset Valuation</p>
                                  <p className="text-lg font-black text-slate-800 dark:text-white leading-none">${c.price}</p>
                               </div>
                            </div>
                            <div className="flex gap-4">
                               <button 
                                 onClick={() => handleCourseAction(c.id, true)}
                                 className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[28px] text-xs font-black uppercase tracking-[3px] shadow-2xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-4"
                               >
                                 <CheckCircle2 size={24} /> Authenticate
                               </button>
                                <button 
                                  onClick={() => handleCourseAction(c.id, false)}
                                  title="Reject Course Submission"
                                  className="px-10 py-5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-[28px] text-xs font-black uppercase tracking-[3px] hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 dark:border-slate-800"
                                >
                                  <XCircle size={24} />
                                </button>
                            </div>
                         </div>
                       ))}
                       {allCourses.filter(c => !c.is_approved && c.is_submitted).length === 0 && (
                         <div className="col-span-full py-40 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[64px] border-4 border-dashed border-slate-200 dark:border-slate-800">
                            <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-10">
                               <Book size={64} className="text-slate-300" />
                            </div>
                            <h4 className="text-4xl font-black text-slate-700 dark:text-slate-200 tracking-tighter">Queue Integrity Level 100%</h4>
                            <p className="text-slate-500 max-w-lg mx-auto mt-6 text-xl font-medium">No pending knowledge artifacts require administrative validation at this cycle point.</p>
                         </div>
                       )}
                    </div>
                  )}
                </div>
              )}

              {activeModule === "categories" && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="welcome-banner p-6 rounded-2xl flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Categories</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">Manage course topics and taxonomy</p>
                      </div>
                      <div className="bg-white/50 dark:bg-slate-700/50 px-4 py-2 rounded-xl border border-white/20">
                        <p className="text-[10px] uppercase font-bold text-slate-500">Categories</p>
                        <p className="text-xl font-black text-indigo-600">{categories.length}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAddCategoryModal(true)}
                      className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus size={18} /> Add Category
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((cat: any, idx) => (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all border-b-4 border-b-indigo-500"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                            <Tag size={24} />
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => { setEditCategory(cat); setShowEditCategoryModal(true); }} 
                              title="Edit Category"
                              className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteCategory(cat.id)} 
                              title="Delete Category"
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight line-clamp-1">{cat.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-6 line-clamp-2 h-8 italic">
                          {cat.description || "Administrative taxonomy node for intellectual indexing."}
                        </p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Node Count</span>
                            <span className="text-lg font-black text-indigo-600">{cat.node_count || 0}</span>
                          </div>
                          <div className="px-3 py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Active</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {categories.length === 0 && (
                      <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[48px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <Tag size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 font-medium tracking-tight">Taxonomy Registry Empty</p>
                      </div>
                    )}
                  </div>
                </div>
              )}


              {activeModule === "live" && (
                <div className="space-y-8">
                  <div className="gradient-primary-soft p-12 rounded-[48px] relative overflow-hidden group border border-indigo-100/50 dark:border-indigo-900/20">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-125 transition-all duration-1000" />
                     <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div>
                          <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter flex items-center gap-5">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl text-indigo-600">
                               <TrendingUp size={36} />
                            </div>
                            Live Session Hub
                          </h2>
                          <p className="text-slate-600 dark:text-slate-300 text-xl font-medium opacity-80 max-w-xl leading-relaxed">Orchestrate and moderate synchronous learning experiences, session slots, and faculty presence.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl px-8 py-5 rounded-[32px] border border-white/60 shadow-2xl shadow-indigo-500/10 text-center">
                              <p className="text-[10px] uppercase font-black text-slate-400 tracking-[3px] mb-1">Active Hubs</p>
                              <p className="text-5xl font-black text-indigo-600 tracking-tighter">{liveStreams.length}</p>
                           </div>
                           <button 
                             onClick={() => setShowAddStreamModal(true)}
                             className="w-full sm:w-auto h-20 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black text-xs uppercase tracking-[3px] shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4"
                           >
                             <PlusCircle size={24} /> New Session
                           </button>

                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {liveStreams.map((stream: any) => (
                      <div key={stream.id} className="group bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700/50 p-10 shadow-sm transition-all hover:shadow-2xl hover:shadow-indigo-500/10 border-l-8 border-l-indigo-600">
                        <div className="flex flex-col lg:flex-row gap-10">
                           <div className="lg:w-1/3 space-y-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-20 h-20 gradient-primary rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-xl">
                                    {stream.title?.[0] || "L"}
                                 </div>
                                 <div className="flex-1">
                                    <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter leading-tight">{stream.title}</h4>
                                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">@{stream.instructor_name}</p>
                                 </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Utilization</p>
                                    <div className="flex items-end gap-1">
                                       <p className={`text-xl font-black ${stream.enrollment_count >= stream.max_students ? 'text-rose-500' : 'text-emerald-500'}`}>{stream.enrollment_count}</p>
                                       <p className="text-xs font-bold text-slate-400 pb-1">/ {stream.max_students}</p>
                                    </div>
                                 </div>
                                 <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                       <p className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase">Live</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex flex-col gap-3">
                                 <button 
                                   onClick={() => { setSelectedStreamForSession(stream); setShowAddSessionModal(true); }}
                                   className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[24px] text-xs font-black uppercase tracking-[2px] shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-3"
                                 >
                                   <Calendar size={18} /> Add Schedule Slot
                                 </button>
                                 <div className="flex gap-3">
                                    <button 
                                      onClick={() => { setEditStreamData(stream); setShowEditStreamModal(true); }}
                                      className="flex-1 py-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                                    >
                                      Modify
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteStream(stream.id)}
                                      title="Delete Cohort"
                                      className="px-6 py-4 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-[22px] hover:bg-rose-100 transition-all"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                 </div>
                                 {stream.enrollment_count >= stream.max_students && (
                                   <button 
                                     onClick={() => { setSelectedStream(stream); setShowDuplicateModal(true); }}
                                     className="w-full py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 shadow-sm"
                                   >
                                     Scale Cohort (Full)
                                   </button>
                                 )}
                              </div>
                           </div>

                           <div className="flex-1 border-l border-slate-100 dark:border-slate-700 lg:pl-10 space-y-6">
                              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[3px] flex items-center gap-3">
                                 <TrendingUp size={14} /> Knowledge Delivery Timeline
                              </h5>
                              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                 {stream.live_sessions && stream.live_sessions.length > 0 ? stream.live_sessions.map((session: any) => (
                                   <div key={session.id} className="relative group/session bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-all">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                         <div>
                                            <h6 className="text-base font-black text-slate-800 dark:text-white mb-2 leading-none">{session.title}</h6>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                               <span className="flex items-center gap-1.5"><Calendar size={12} className="text-indigo-500" /> {new Date(session.scheduled_at).toLocaleDateString()}</span>
                                               <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-indigo-500" /> {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                         </div>
                                         {session.meeting_link && (
                                           <a 
                                             href={session.meeting_link} 
                                             target="_blank" 
                                             rel="noreferrer" 
                                             className="px-6 py-2.5 bg-white dark:bg-slate-800 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
                                           >
                                             Meet Link <PlusCircle size={12} />
                                           </a>
                                         )}
                                      </div>
                                   </div>
                                 )) : (
                                   <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/20 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No active sessions mapped.</p>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                    {liveStreams.length === 0 && (
                      <div className="py-32 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[64px] border-4 border-dashed border-slate-200 dark:border-slate-800">
                         <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl mx-auto mb-8">
                            <TrendingUp size={48} className="text-slate-300" />
                         </div>
                         <h4 className="text-3xl font-black text-slate-700 dark:text-slate-300 tracking-tighter">Synchronous Learning Inactive</h4>
                         <p className="text-slate-500 max-w-sm mx-auto mt-4 text-lg">No synchronous cohorts are currently registered in the administrative registry.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeModule === "revenue" && (
                <div className="space-y-8">
                    <div className="gradient-primary-soft p-12 rounded-[48px] border border-indigo-100/50 dark:border-indigo-900/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2 tracking-tighter">Financial Architecture</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium opacity-80">Real-time revenue monitoring and protocol growth analytics.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/60 shadow-xl">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fiscal Velocity</p>
                          <p className="text-3xl font-black text-indigo-600">+12.4%</p>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/60 shadow-xl">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Index</p>
                          <p className="text-3xl font-black text-emerald-500">9.8</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700 p-8">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Platform Revenue Growth</h3>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-indigo-600 rounded-full" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross (USD)</span>
                          </div>
                        </div>
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={platformGrowthData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} />
                              <YAxis hide />
                              <Tooltip contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }} />
                              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, fill: "#4f46e5", strokeWidth: 3, stroke: "#fff" }} activeDot={{ r: 8 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-800 p-10 rounded-[48px] border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-2xl">
                          <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/30"><DollarSign size={32} className="text-white" /></div>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[4px] mb-2 leading-none">Gross Revenue</p>
                          <p className="text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">${stats?.revenue?.total || "168,000"}</p>
                          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-500">
                            <TrendingUp size={14} /> +18.2% from last cycle
                          </div>
                        </div>

                        <div className="bg-slate-900 dark:bg-indigo-950 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                           <div className="relative z-10">
                              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[4px] mb-2">Protocol Balance</p>
                              <p className="text-4xl font-black text-white tracking-tighter">$42,850.24</p>
                              <button className="mt-8 w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-colors">Initiate Payout</button>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                       <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Recent Financial Events</h3>
                          <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:underline">View All Ledger →</button>
                       </div>
                       <div className="overflow-x-auto">
                          <table className="w-full text-left">
                             <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400">
                                <tr>
                                   <th className="px-8 py-5">Event ID</th>
                                   <th className="px-8 py-5">Subject</th>
                                   <th className="px-8 py-5">Amount</th>
                                   <th className="px-8 py-5">Timestamp</th>
                                   <th className="px-8 py-5 text-right">Verification</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {[1, 2, 3, 4, 5].map((i) => (
                                   <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                      <td className="px-8 py-6 text-xs font-black text-slate-400">TX-9902{i}</td>
                                      <td className="px-8 py-6">
                                         <p className="text-sm font-bold text-slate-800 dark:text-white">Knowledge Node Enrollment</p>
                                         <p className="text-[10px] text-slate-500 font-medium italic">Protocol: Stripe_L2</p>
                                      </td>
                                      <td className="px-8 py-6 text-sm font-black text-slate-800 dark:text-white">$49.99</td>
                                      <td className="px-8 py-6 text-xs font-medium text-slate-500">2026.04.{15-i}</td>
                                      <td className="px-8 py-6 text-right">
                                         <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-black rounded-lg uppercase">Confirmed</span>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>
                  </div>
              )}

              {activeModule === "knowledge" && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="welcome-banner p-6 rounded-2xl flex-1">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight flex items-center gap-2">
                        <FileText className="text-indigo-600" size={24} />
                        AI Knowledge Base
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Upload documents that the AI chatbot can access and answer questions from.</p>
                    </div>
                    <button 
                      onClick={() => setShowUploadModal(true)}
                      className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Upload size={18} /> Upload Document
                    </button>
                  </div>

                  {/* Info Banner */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl p-5 flex items-start gap-3">
                    <FileUp className="text-indigo-600 shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">How it works</p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-300 mt-1">Upload PDF, TXT, or MD files here. Active documents are automatically indexed into the AI platform chatbot&apos;s knowledge base. Users chatting with the bot will get answers from these documents.</p>
                    </div>
                  </div>

                  {/* Documents Table */}
                  <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text"
                          placeholder="Search knowledge artifacts..."
                          value={knowledgeSearch}
                          onChange={(e) => setKnowledgeSearch(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1">Total Logic</p>
                            <p className="text-xl font-black text-indigo-800 dark:text-indigo-200">{knowledgeDocs.length}</p>
                         </div>
                      </div>
                    </div>

                    {knowledgeDocs.filter(d => d.title.toLowerCase().includes(knowledgeSearch.toLowerCase())).length === 0 ? (
                      <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FileText size={32} className="text-slate-300 dark:text-slate-600" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg tracking-tight">No matching knowledge nodes</p>
                        <p className="text-sm text-slate-400 mt-2">Adjust your search parameters or provision new data.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400">
                            <tr>
                              <th className="px-8 py-5">Knowledge Variant</th>
                              <th className="px-8 py-5">Indexing Status</th>
                              <th className="px-8 py-5">Source Node</th>
                              <th className="px-8 py-5">Timestamp</th>
                              <th className="px-8 py-5 text-right">Operations</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {knowledgeDocs.filter(d => d.title.toLowerCase().includes(knowledgeSearch.toLowerCase())).map((doc: any) => (
                              <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                                      doc.file_extension === 'pdf' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' :
                                      doc.file_extension === 'md' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500' :
                                      'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500'
                                    }`}>
                                      <FileText size={24} />
                                    </div>
                                    <div>
                                      <p className="text-sm font-black text-slate-800 dark:text-white leading-tight">{doc.title}</p>
                                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{doc.file_extension} Artifact</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${doc.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${doc.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>
                                      {doc.is_active ? 'Provisioned & Active' : 'Standby'}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center text-[8px] font-black text-white">
                                         {doc.uploaded_by_username?.charAt(0) || 'A'}
                                      </div>
                                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">@{doc.uploaded_by_username || 'admin'}</span>
                                   </div>
                                </td>
                                <td className="px-8 py-6 text-xs font-black text-slate-400">{new Date(doc.created_at).toLocaleDateString().replace(/\//g, '.')}</td>
                                <td className="px-8 py-6 text-right">
                                  <div className="flex items-center justify-end gap-3">
                                    <button 
                                      onClick={() => handleToggleDocument(doc.id, doc.is_active)}
                                      className={`p-2.5 rounded-xl transition-all ${
                                        doc.is_active 
                                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:scale-110'
                                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600'
                                      }`}
                                      title={doc.is_active ? "Deactivate Node" : "Activate Node"}
                                    >
                                      {doc.is_active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteDocument(doc.id)}
                                      className="p-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-400 hover:text-rose-600 hover:scale-110 rounded-xl transition-all"
                                      title="Delete Artifact"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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
                    <option value="ADMIN">Admin (Protocol Moderator)</option>
                    <option value="SUPER_ADMIN">Super Admin (System Architect)</option>
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
                    title="Instructor User ID"
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

      {/* Add Stream Modal */}
      <AnimatePresence>
        {showAddStreamModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddStreamModal(false)}
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
                  <Plus className="text-indigo-600" size={20} />
                  Create Live Course
                </h3>
                <button 
                  onClick={() => setShowAddStreamModal(false)} 
                  title="Close Modal"
                  aria-label="Close"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCreateStream} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto w-[calc(100%+8px)] sm:w-auto -mr-2 pr-2 sm:mr-0 sm:pr-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Title</label>
                  <input 
                    required
                    type="text" 
                    title="Course Title"
                    placeholder="e.g. Advanced Crypto Strategies"
                    value={newStream.title}
                    onChange={e => setNewStream({...newStream, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Stream Description"
                    placeholder="What will students learn?"
                    value={newStream.description}
                    onChange={e => setNewStream({...newStream, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Instructor</label>
                  <select 
                    required
                    title="Select Instructor"
                    value={newStream.instructor}
                    onChange={e => setNewStream({...newStream, instructor: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">Select Instructor...</option>
                    {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                      <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Initial Schedule</label>
                    <input 
                      required
                      type="datetime-local" 
                      title="Initial Schedule Date"
                      value={newStream.scheduled_at}
                      onChange={e => setNewStream({...newStream, scheduled_at: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Price (USD)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      title="Course Price"
                      placeholder="0.00"
                      value={newStream.price}
                      onChange={e => setNewStream({...newStream, price: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Meeting Link</label>
                  <input 
                    type="url" 
                    placeholder="https://zoom.us/j/..."
                    value={newStream.meeting_link}
                    onChange={e => setNewStream({...newStream, meeting_link: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Group Type</label>
                  <select 
                    title="Group Type"
                    value={newStream.group_type}
                    onChange={e => setNewStream({...newStream, group_type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="VVIP">VVIP (1 Student)</option>
                    <option value="VIP1">VIP1 (5 Students)</option>
                    <option value="VIP2">VIP2 (10 Students)</option>
                    <option value="NORMAL">Normal (100 Students)</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3 pb-2">
                  <button 
                    type="button"
                    onClick={() => setShowAddStreamModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Session Modal */}
      <AnimatePresence>
        {showAddSessionModal && selectedStreamForSession && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddSessionModal(false)}
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
                  <Calendar className="text-emerald-500" size={20} />
                  Add Schedule / Session
                </h3>
                <button 
                  onClick={() => setShowAddSessionModal(false)} 
                  title="Close"
                  aria-label="Close"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="px-6 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500">Scheduling for course:</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{selectedStreamForSession.title}</p>
              </div>

              <form onSubmit={handleCreateSession} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Session Title</label>
                  <input 
                    required
                    type="text" 
                    title="Session Title"
                    placeholder="e.g. Genesis Block Node"
                    value={newSession.title}
                    onChange={e => setNewSession({...newSession, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Session Description"
                    placeholder="Technical nodes and discovery..."
                    value={newSession.description}
                    onChange={e => setNewSession({...newSession, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Time & Date</label>
                  <input 
                    required
                    type="datetime-local" 
                    title="Time & Date"
                    value={newSession.scheduled_at}
                    onChange={e => setNewSession({...newSession, scheduled_at: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Meeting Link</label>
                  <input 
                    type="url" 
                    title="Meeting Link"
                    placeholder="https://zoom.us/j/..."
                    value={newSession.meeting_link}
                    onChange={e => setNewSession({...newSession, meeting_link: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddSessionModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Save Schedule
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Course Modal (Add/Edit) */}
      <AnimatePresence>
        {showCourseModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowCourseModal(false); setEditCourseData(null); }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <BookOpen className="text-indigo-600" size={20} />
                  {editCourseData ? "Modify Academic Node" : "Provision New Node"}
                </h3>
                <button 
                  onClick={() => { setShowCourseModal(false); setEditCourseData(null); }} 
                  title="Close Modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCourseSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Title</label>
                    <input 
                      required
                      type="text" 
                      title="Course Title"
                      placeholder="e.g. Full-Stack Dev Level 1"
                      value={editCourseData ? editCourseData.title : newCourse.title}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, title: e.target.value})
                        : setNewCourse({...newCourse, title: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">URL Slug</label>
                    <input 
                      required
                      type="text" 
                      title="URL Slug"
                      placeholder="full-stack-dev-1"
                      value={editCourseData ? editCourseData.slug : newCourse.slug}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, slug: e.target.value})
                        : setNewCourse({...newCourse, slug: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Academic Abstract (Description)</label>
                  <textarea 
                    title="Academic Abstract"
                    placeholder="Provide a high-fidelity summary..."
                    value={editCourseData ? editCourseData.description : newCourse.description}
                    onChange={e => editCourseData 
                      ? setEditCourseData({...editCourseData, description: e.target.value})
                      : setNewCourse({...newCourse, description: e.target.value})
                    }
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Type</label>
                    <select 
                      title="Course Type"
                      value={editCourseData ? editCourseData.course_type : newCourse.course_type}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, course_type: e.target.value})
                        : setNewCourse({...newCourse, course_type: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="VIDEO_BASED">Video-Based Course</option>
                      <option value="LIVE_STREAM">Live Stream Cohort</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Enrollment Price (USD)</label>
                    <input 
                      required
                      type="number" 
                      title="Price"
                      step="0.01"
                      value={editCourseData ? editCourseData.price : newCourse.price}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, price: e.target.value})
                        : setNewCourse({...newCourse, price: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Curator (Instructor)</label>
                    <select 
                      required
                      title="Select Curator"
                      value={editCourseData ? editCourseData.instructor : newCourse.instructor}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, instructor: e.target.value})
                        : setNewCourse({...newCourse, instructor: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="">Select Faculty Node...</option>
                      {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                        <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Taxonomy (Category)</label>
                    <select 
                      required
                      title="Select Taxonomy"
                      value={editCourseData ? editCourseData.category : newCourse.category}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, category: e.target.value})
                        : setNewCourse({...newCourse, category: e.target.value})
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="">Select Domain...</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      title="Publish Status"
                      checked={editCourseData ? editCourseData.is_published : newCourse.is_published}
                      onChange={e => editCourseData 
                        ? setEditCourseData({...editCourseData, is_published: e.target.checked})
                        : setNewCourse({...newCourse, is_published: e.target.checked})
                      }
                      className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">Publish to Platform Registry</span>
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => { setShowCourseModal(false); setEditCourseData(null); }}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {editCourseData ? "Sync Modifications" : "Launch Knowledge Node"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && editUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
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
                  <Edit className="text-indigo-600" size={20} />
                  Modify Network Identity
                </h3>
                <button 
                  onClick={() => setShowEditModal(false)} 
                  aria-label="Close edit modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Network Username</label>
                  <input 
                    required
                    type="text" 
                    title="User Network Alias"
                    placeholder="Username"
                    value={editUser.username}
                    onChange={e => setEditUser({...editUser, username: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Communication Hub (Email)</label>
                  <input 
                    required
                    type="email" 
                    title="User Communication Hub"
                    placeholder="Email Address"
                    value={editUser.email}
                    onChange={e => setEditUser({...editUser, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Access Protocol (Password - Leave blank to keep current)</label>
                  <input 
                    type="password" 
                    title="Password"
                    placeholder="••••••••"
                    value={editUser.password || ""}
                    onChange={e => setEditUser({...editUser, password: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Institutional Role</label>
                  <select 
                    value={editUser.role}
                    title="Institutional Role"
                    aria-label="Edit user role"
                    onChange={e => setEditUser({...editUser, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="STUDENT">Student (Default Node)</option>
                    <option value="INSTRUCTOR">Instructor (Faculty)</option>
                    <option value="ADMIN">Admin (Protocol Moderator)</option>
                    <option value="SUPER_ADMIN">Super Admin (System Architect)</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update Identity
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showDetailModal && userDetail && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              {/* Institutional Banner */}
              <div className="h-40 gradient-primary relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <button 
                  onClick={() => setShowDetailModal(false)}
                  title="Close Institutional View"
                  className="absolute top-6 right-6 p-2.5 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-xl transition-all hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Core Identity Section */}
              <div className="px-10 pb-10 -mt-16 relative">
                <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
                  <div className="relative group">
                    <div className="w-36 h-36 rounded-[36px] bg-white dark:bg-slate-800 border-8 border-white dark:border-slate-900 flex items-center justify-center text-5xl font-black text-indigo-600 shadow-2xl relative z-10 overflow-hidden">
                      {userDetail.username?.charAt(0)?.toUpperCase() || "U"}
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg z-20 border-4 border-white dark:border-slate-900">
                      <ShieldCheck size={24} />
                    </div>
                  </div>
                  
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">
                        {userDetail.username}
                      </h3>
                      {userDetail.role === 'SUPER_ADMIN' && (
                        <span className="px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black uppercase tracking-tighter rounded-md">Architect</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-xl border border-indigo-100/50 dark:border-indigo-800/30">
                        Institutional Role: {userDetail.role}
                      </span>
                      {userDetail.is_approved_instructor && (
                        <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 border border-emerald-100/50 dark:border-emerald-800/30">
                           <Award size={14} /> Verified Professional
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Section: Core Bio & Meta */}
                  <div className="lg:col-span-2 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Communication Registry</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                              <Mail size={18} className="text-indigo-500" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Endpoint</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{userDetail.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                              <User size={18} className="text-indigo-500" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Legal Identity</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{userDetail.first_name} {userDetail.last_name || '(REDACTED)'}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Platform Status</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <span className="text-xs font-bold text-slate-500">Node Connectivity</span>
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                              <span className="text-xs font-black text-slate-700 dark:text-slate-200">ACTIVE</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <span className="text-xs font-bold text-slate-500">Security Clearance</span>
                            <span className="text-xs font-black text-indigo-600 uppercase">Level 4</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Biological Summary</h4>
                      <div className="relative p-6 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-[28px] border border-indigo-100/50 dark:border-indigo-800/30">
                        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
                          &quot;{userDetail.bio || "No biological summary provided to the registry."}&quot;
                        </p>
                        <div className="absolute -top-3 -left-3 bg-white dark:bg-slate-900 p-2 text-indigo-500">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L20.017 3C21.1216 3 22.017 3.89543 22.017 5V19C22.017 20.1046 21.1216 21 20.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H4.01697C2.9124 8 2.01697 7.10457 2.01697 6V3L8.01697 3C9.12154 3 10.017 3.89543 10.017 5V19C10.017 20.1046 9.12154 21 8.01697 21H2.01697Z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Scorecard & Activity */}
                  <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-all duration-1000" />
                      <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Performance Scorecard</h4>
                      <div className="space-y-6 relative z-10">
                        <div>
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-bold text-slate-400">Unified Trust Score</span>
                            <span className="text-3xl font-black tracking-tighter">{(userDetail.points || 0).toLocaleString()}</span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (userDetail.points || 0) / 100)}%` }}
                              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Global Ranking</p>
                            <p className="text-xl font-bold tracking-tighter">{userDetail.peer_ranking || "TOP 0.1%"}</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Impact Radius</p>
                            <p className="text-xl font-bold tracking-tighter">8.4x</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Knowledge Portfolio</h4>
                      <div className="flex flex-wrap gap-2">
                        {userDetail.role === 'INSTRUCTOR' ? (
                          (userDetail.taught_courses || []).length > 0 ? userDetail.taught_courses.map((c: string, i: number) => (
                            <span key={i} className="px-3 py-2 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-sm transition-all hover:scale-105">{c}</span>
                          )) : <p className="text-xs text-slate-400 italic">No authored nodes registered in repository.</p>
                        ) : (
                          (userDetail.enrolled_courses || []).length > 0 ? userDetail.enrolled_courses.map((c: string, i: number) => (
                            <span key={i} className="px-3 py-2 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 shadow-sm transition-all hover:scale-105">{c}</span>
                          )) : <p className="text-xs text-slate-400 italic">Currently unsynced from primary Knowledge Nodes.</p>
                        )}
                      </div>
                    </div>

                    {userDetail.role === 'INSTRUCTOR' && (
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border border-slate-100 dark:border-slate-700/50">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-3">Professional Specialization</h4>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
                            <TrendingUp size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{userDetail.expertise || 'General Scholastics'}</p>
                            <p className="text-xs text-slate-500">{userDetail.education_level}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-white dark:bg-slate-700 rounded-lg text-[10px] font-bold shadow-sm">{userDetail.years_of_experience || 0}+ Years</span>
                          <span className="px-2 py-1 bg-white dark:bg-slate-700 rounded-lg text-[10px] font-bold shadow-sm">Verified Credentials</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex gap-4 pt-10 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => { setShowDetailModal(false); setEditUser(userDetail); setShowEditModal(true); }}
                    className="flex-1 py-5 gradient-primary text-white text-xs font-black uppercase tracking-[3px] rounded-[24px] shadow-2xl shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Modify Institutional Record
                  </button>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="px-10 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-[3px] rounded-[24px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    Decommission View
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Category Modal */}
      <AnimatePresence>
        {showAddCategoryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCategoryModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Tag className="text-indigo-600" size={20} />
                  Add Category
                </h3>
                <button 
                  onClick={() => setShowAddCategoryModal(false)} 
                  title="Close Modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Name</label>
                  <input 
                    required
                    type="text" 
                    title="Category Name"
                    placeholder="e.g. Programming"
                    value={newCategory.name}
                    onChange={e => setNewCategory({...newCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Slug</label>
                  <input 
                    required
                    type="text" 
                    title="Category Slug"
                    placeholder="artificial-intelligence"
                    value={newCategory.slug}
                    onChange={e => setNewCategory({...newCategory, slug: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Category Description"
                    placeholder="Topics covered in this node domain..."
                    value={newCategory.description}
                    onChange={e => setNewCategory({...newCategory, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-20"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddCategoryModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Category Modal */}
      <AnimatePresence>
        {showEditCategoryModal && editCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditCategoryModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Edit className="text-indigo-600" size={20} />
                  Edit Category
                </h3>
                <button 
                  onClick={() => setShowEditCategoryModal(false)} 
                  title="Close Modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleUpdateCategory} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Name</label>
                  <input 
                    required
                    type="text" 
                    title="Category Name"
                    value={editCategory.name}
                    onChange={e => setEditCategory({...editCategory, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Slug</label>
                  <input 
                    required
                    type="text" 
                    title="Category Slug"
                    value={editCategory.slug}
                    onChange={e => setEditCategory({...editCategory, slug: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Edit Category Description"
                    placeholder="Description"
                    value={editCategory.description || ""}
                    onChange={e => setEditCategory({...editCategory, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-20"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowEditCategoryModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Edit Stream Modal */}
      <AnimatePresence>
        {showEditStreamModal && editStreamData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }}
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
                  <Plus className="text-indigo-600" size={20} />
                  Modify Live Course
                </h3>
                <button 
                  onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }} 
                  title="Close Modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleEditStreamSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Course Title</label>
                  <input 
                    required
                    type="text" 
                    title="Update Course Title"
                    placeholder="e.g. Advanced Crypto Strategies"
                    value={editStreamData.title}
                    onChange={e => setEditStreamData({...editStreamData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Update Stream Description"
                    placeholder="Description"
                    value={editStreamData.description}
                    onChange={e => setEditStreamData({...editStreamData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Instructor</label>
                  <select 
                    required
                    title="Select Instructor"
                    value={editStreamData.instructor}
                    onChange={e => setEditStreamData({...editStreamData, instructor: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">Select Instructor...</option>
                    {allUsers.filter(u => u.role === 'INSTRUCTOR').map(u => (
                      <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Scheduled At</label>
                    <input 
                      required
                      type="datetime-local" 
                      title="Update Schedule"
                      value={editStreamData.scheduled_at ? new Date(editStreamData.scheduled_at).toISOString().slice(0, 16) : ""}
                      onChange={e => setEditStreamData({...editStreamData, scheduled_at: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Price (USD)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      title="Course Price"
                      placeholder="0.00"
                      value={editStreamData.price}
                      onChange={e => setEditStreamData({...editStreamData, price: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Meeting Link</label>
                  <input 
                    type="url" 
                    placeholder="https://zoom.us/j/..."
                    value={editStreamData.meeting_link}
                    onChange={e => setEditStreamData({...editStreamData, meeting_link: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Group Type</label>
                  <select 
                    value={editStreamData.group_type}
                    title="Select Group Type"
                    onChange={e => setEditStreamData({...editStreamData, group_type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="VVIP">VVIP (1 Student)</option>
                    <option value="VIP1">VIP1 (5 Students)</option>
                    <option value="VIP2">VIP2 (10 Students)</option>
                    <option value="NORMAL">Normal (100 Students)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox"
                        title="Toggle Active Status"
                        checked={editStreamData.is_active}
                        onChange={e => setEditStreamData({...editStreamData, is_active: e.target.checked})}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded"
                    />
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Is Active</label>
                </div>

                <div className="pt-4 flex gap-3 pb-2">
                  <button 
                    type="button"
                    onClick={() => { setShowEditStreamModal(false); setEditStreamData(null); }}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update Stream
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Document Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
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
                  <Upload className="text-indigo-600" size={20} />
                  Upload Knowledge Document
                </h3>
                <button 
                  onClick={() => setShowUploadModal(false)} 
                  aria-label="Close modal"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleUploadDocument} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Document Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Platform FAQ, Student Handbook"
                    value={uploadTitle}
                    onChange={e => setUploadTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description (Optional)</label>
                  <textarea 
                    placeholder="Brief description of the document content..."
                    value={uploadDescription}
                    onChange={e => setUploadDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">File (PDF, TXT, or MD)</label>
                  <div className="relative">
                    <input 
                      required
                      type="file" 
                      accept=".pdf,.txt,.md"
                      title="Select Document File"
                      placeholder="Select document file"
                      onChange={e => setUploadFile(e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                    />
                  </div>
                  {uploadFile && (
                    <p className="text-xs text-emerald-600 font-medium px-1 flex items-center gap-1">
                      <Check size={12} /> {uploadFile.name} ({(uploadFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={uploadLoading || !uploadFile}
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    {uploadLoading ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload size={16} /> Upload Document</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
