"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Users, BookOpen, DollarSign, TrendingUp, Home, UserPlus,
  CheckCircle2, XCircle, Bell, LogOut, ShieldCheck, Cpu, BarChart3,
  Search, Plus, Trash2, Filter, ShieldAlert, MoreVertical, Check, X, Edit, Eye, User, Calendar, Mail, Award, Book,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Tag, PlusCircle, LayoutDashboard,
  FileText, Upload, ToggleLeft, ToggleRight, FileUp, Globe, Link2 as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar, Cell
} from "recharts";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState("overview");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isCourseManagementOpen, setIsCourseManagementOpen] = useState(true);

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
  const itemsPerPage = 10;

  const [liveStreams, setLiveStreams] = useState<any[]>([]);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState<any>(null);
  const [duplicateInstructorId, setDuplicateInstructorId] = useState("");
  
  /* Course Management State */
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseTab, setCourseTab] = useState("all"); // "all" or "pending"
  const [coursePage, setCoursePage] = useState(1);
  const courseItemsPerPage = 8;
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showInspectModal, setShowInspectModal] = useState(false);
  const [inspectCourse, setInspectCourse] = useState<any>(null);
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

  /* Withdrawals State */
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const fetchWithdrawals = async () => {
    try {
      const res = await api.get("/finance/withdrawals/");
      setWithdrawals(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Withdrawals fetch error:", err);
    }
  };

  const handleApproveWithdrawal = async (id: number) => {
    if (!confirm("Are you sure you want to approve this withdrawal request?")) return;
    try {
      await api.post(`/finance/withdrawals/${id}/approve/`);
      fetchWithdrawals();
      fetchStats();
      alert("Withdrawal approved successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error approving withdrawal");
    }
  };

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
      setError(null);
    } catch (err: any) {
      console.error("Admin stats fetch error:", err);
      setError("Unable to connect to the server. Please ensure the backend is running.");
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
      fetchWithdrawals();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Reset to first page whenever search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [userSearch, roleFilter, allUsers.length]);

  useEffect(() => {
    setCoursePage(1);
  }, [courseSearch, courseTab, allCourses.length]);

  const filteredUsers = allUsers.filter(u => 
    (u.username || "").toLowerCase().includes(userSearch.toLowerCase()) && 
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
      const data = err.response?.data;
      if (data && typeof data === "object") {
        // DRF returns field-keyed errors: { username: [...], email: [...], ... }
        const messages = Object.entries(data)
          .map(([field, msgs]) => {
            const label = field.charAt(0).toUpperCase() + field.slice(1);
            const msgStr = Array.isArray(msgs) ? msgs.join(" ") : String(msgs);
            return `${label}: ${msgStr}`;
          })
          .join("\n");
        alert(messages || "Error adding user");
      } else {
        alert("Error adding user");
      }
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
      const payload = password ? { ...updateData, password } : updateData;
      await api.patch(`/users/manage/${editUser.id}/`, payload);
      setShowEditModal(false);
      fetchAllUsers();
      fetchStats();
    } catch (err: any) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        const messages = Object.entries(data)
          .map(([field, msgs]) => {
            const label = field.charAt(0).toUpperCase() + field.slice(1);
            const msgStr = Array.isArray(msgs) ? msgs.join(" ") : String(msgs);
            return `${label}: ${msgStr}`;
          })
          .join("\n");
        alert(messages || "Error updating user");
      } else {
        alert("Error updating user");
      }
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
        <ShieldCheck size={56} className="text-teal-600 mb-5" />
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
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-6">
        <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-8 rounded-[32px] border border-red-100 dark:border-red-900/30 max-w-md text-center shadow-xl">
          <ShieldAlert size={48} className="mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Connection Failed</h2>
          <p className="text-sm opacity-80 mb-6">{error}</p>
          <button 
            onClick={() => { setError(null); setLoading(true); fetchStats(); fetchAllUsers(); fetchCourses(); fetchCategories(); fetchLiveStreams(); }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-red-500/20"
          >
            Retry Connection
          </button>
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
    { id: "withdrawals", label: "Payouts", icon: DollarSign },
  ];

  const statCards = [
    {
      label: "Total Users",
      value: stats?.users?.total || "0",
      sub: `+${stats?.users?.new_this_month || 0} this month`,
      icon: Users,
      iconClass: "icon-blue",
    },
    {
      label: "Active Courses",
      value: stats?.courses?.total || 0,
      sub: `+${stats?.courses?.approved || 0} approved`,
      icon: BookOpen,
      iconClass: "icon-teal",
    },
    {
      label: "Instructors",
      value: stats?.users?.instructors || "0",
      sub: `${stats?.pending_instructors?.length || 0} applications`,
      icon: User,
      iconClass: "icon-teal",
    },
    {
      label: "Total Revenue",
      value: stats?.revenue?.total ? `${Math.round(stats.revenue.total)} Birr` : "0 Birr",
      sub: `+${Math.round(stats?.revenue?.this_month || 0)} this month`,
      icon: DollarSign,
      iconClass: "icon-green",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 bg-[#0B1120] text-slate-300 flex flex-col hidden md:flex h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <BookOpen size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Fatra<span className="text-teal-500"> Academy</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {/* Dashboard Item */}
          <button
            onClick={() => setActiveModule("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeModule === "overview" 
                ? "bg-teal-600/10 text-teal-500" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          {/* Course Management Collapsible */}
          <div className="pt-4 pb-2">
            <button 
              onClick={() => setIsCourseManagementOpen(!isCourseManagementOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-[11px] font-black uppercase tracking-[2px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText size={14} />
                Course Management
              </div>
              <motion.div
                animate={{ rotate: isCourseManagementOpen ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={14} className="rotate-90" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isCourseManagementOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-1 mt-2"
                >
                  <button
                    onClick={() => setActiveModule("course_analytics")}
                    className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeModule === "course_analytics"
                        ? "text-teal-500 bg-teal-500/5" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <BarChart3 size={18} />
                    Course Dashboard
                  </button>

                  <button
                    onClick={() => { setActiveModule("users"); setRoleFilter("all"); setUserTab("all"); }}
                    className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeModule === "users" && roleFilter === "all" && userTab === "all"
                        ? "text-teal-500 bg-teal-500/5" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <Users size={18} />
                    All Users
                  </button>

                  <button
                    onClick={() => setActiveModule("courses")}
                    className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeModule === "courses" 
                        ? "text-teal-500" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <BookOpen size={18} />
                    Courses
                  </button>

                  <button
                    onClick={() => setActiveModule("categories")}
                    className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeModule === "categories" 
                        ? "text-teal-500" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <Tag size={18} />
                    Course Categories
                  </button>

                  <button
                    onClick={() => setActiveModule("revenue")}
                    className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeModule === "revenue" 
                        ? "text-teal-500" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <DollarSign size={18} />
                    Course Payments
                  </button>

                  <button
                    onClick={() => setActiveModule("notifications")}
                    className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeModule === "notifications" 
                        ? "text-teal-500" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <Bell size={18} />
                    Notification
                  </button>

                  <button
                    onClick={() => setActiveModule("withdrawals")}
                    className={`w-full flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeModule === "withdrawals" 
                        ? "text-teal-500" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <DollarSign size={18} />
                    Payouts
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-slate-800/50 mt-4">
            <button
              onClick={() => setActiveModule("knowledge")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeModule === "knowledge" 
                  ? "bg-teal-600/10 text-teal-500" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <FileText size={18} />
              Knowledge Base
            </button>
            <button
              onClick={() => setActiveModule("live")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeModule === "live" 
                  ? "bg-teal-600/10 text-teal-500" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <Cpu size={18} />
              Live Sessions
            </button>
          </div>
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-teal-500/20">
                {user.username?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.username}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Protocol Admin</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all group"
            >
              <LogOut size={14} className="group-hover:translate-x-0.5 transition-transform" /> 
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveModule("courses")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeModule === "courses" ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
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

                  {/* Platform Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Platform Growth Chart */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-slate-800 dark:text-white">Platform Growth Overview</h3>
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-teal-500 inline-block rounded" /> Users</span>
                          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-sky-500 inline-block rounded" /> Revenue</span>
                        </div>
                      </div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                          <LineChart data={stats?.monthly_growth || []}>
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

                    {/* Category Distribution Chart */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-slate-800 dark:text-white">Category Knowledge Distribution</h3>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Node Density</p>
                      </div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                          <BarChart data={stats?.category_distribution || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                            <YAxis hide />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "11px" }} />
                            <Bar dataKey="courses" radius={[6, 6, 0, 0]}>
                              {(stats?.category_distribution || []).map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#0891b2'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
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
                          className="ml-auto text-xs text-cyan-600 font-semibold hover:underline"
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
                          className="ml-auto text-xs text-cyan-600 font-semibold hover:underline"
                        >
                          Review →
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(stats?.courses?.pending_list || []).slice(0, 3).map((c: any) => (
                          <div key={c.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="w-7 h-7 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center text-sky-600 text-xs font-bold shrink-0">
                              {c.title?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{c.title}</span>
                            <span className="text-xs text-sky-600 bg-sky-50 dark:bg-sky-900/20 px-2 py-0.5 rounded-full">Review</span>
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

                  {/* Top Performing Courses */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                      <div>
                        <h3 className="font-black text-slate-800 dark:text-white tracking-tight">Top Performing Knowledge Nodes</h3>
                        <p className="text-xs text-slate-500 font-medium">Most impactful artifacts by enrollment and revenue</p>
                      </div>
                      <button 
                        onClick={() => setActiveModule("courses")}
                        className="text-xs font-black text-teal-600 uppercase tracking-widest hover:underline"
                      >
                        Registry Analysis →
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] border-b border-slate-50 dark:border-slate-700">
                          <tr>
                            <th className="px-6 py-4">Node Title</th>
                            <th className="px-6 py-4 text-center">Enrollments</th>
                            <th className="px-6 py-4 text-right">Yield (Birr)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                          {(stats?.top_courses || []).map((c: any) => (
                            <tr key={c.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-700/20 transition-colors">
                              <td className="px-6 py-4">
                                <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">{c.title}</p>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-xs font-black text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full">{c.enrollments}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <p className="text-sm font-black text-slate-700 dark:text-slate-200">{c.revenue.toLocaleString()}</p>
                              </td>
                            </tr>
                          ))}
                          {(!stats?.top_courses || stats.top_courses.length === 0) && (
                            <tr>
                              <td colSpan={3} className="px-6 py-10 text-center text-xs text-slate-400 font-medium">No performance data yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Users Registry */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-black text-slate-800 dark:text-white tracking-tight">Unified User Registry</h3>
                        <p className="text-xs text-slate-500 font-medium">Recently registered nodes and identities</p>
                      </div>
                      <button 
                        onClick={() => setActiveModule("users")}
                        className="text-xs font-black text-teal-600 uppercase tracking-widest hover:underline"
                      >
                        View Full Database
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">
                          <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Identity</th>
                            <th className="px-6 py-4">Institutional Role</th>
                            <th className="px-6 py-4">Registry Date</th>
                            <th className="px-6 py-4 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                          {(stats?.recent_users || []).map((u: any) => (
                            <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                              <td className="px-6 py-4 text-xs font-bold text-slate-500">#{u.id}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white text-[10px] font-black">{u.username?.[0]?.toUpperCase()}</div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{u.username}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                                  u.role === 'SUPER_ADMIN' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 
                                  u.role === 'ADMIN' ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' : 
                                  u.role === 'INSTRUCTOR' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' :
                                  'bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400'
                                }`}>{u.role}</span>
                              </td>
                              <td className="px-6 py-4 text-xs font-bold text-slate-500">{u.joined}</td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button 
                                    onClick={() => { setUserDetail(u); setShowDetailModal(true); }}
                                    title="View Detail"
                                    className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button 
                                    onClick={() => { setEditUser(u); setShowEditModal(true); }}
                                    title="Edit Identity"
                                    className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteUser(u.id)} 
                                    title="Revoke Access"
                                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {(!stats?.recent_users || stats.recent_users.length === 0) && (
                            <tr>
                              <td colSpan={4} className="px-6 py-10 text-center text-xs text-slate-400 font-medium">No recent activity detected in the user registry.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "course_analytics" && (
                <div className="space-y-8">
                  <div className="welcome-banner p-10 rounded-[40px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 tracking-tighter flex items-center gap-3">
                        <BarChart3 className="text-teal-600" size={32} />
                        Course Insights Engine
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">Deep analytics and performance metrics for knowledge artifacts</p>
                    </div>
                  </div>

                  {/* Course Specific Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Enrollments</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-white">{stats?.courses?.total_enrollments || "0"}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-teal-600">
                        <TrendingUp size={14} />
                        <span>+12% vs last month</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Course Rating</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-white">{stats?.courses?.avg_rating || "4.8"}</p>
                      <div className="mt-4 flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Award key={i} size={12} fill={i < 4 ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Revenue Yield</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-white">{stats?.revenue?.total ? `${Math.round(stats.revenue.total).toLocaleString()} ETB` : "0 ETB"}</p>
                      <div className="mt-4 text-xs font-bold text-slate-400">Total processed volume</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completion Rate</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-white">68%</p>
                      <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-teal-500 h-full w-[68%]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Category Distribution - Moved and Enhanced */}
                    <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Taxonomy Density</h3>
                        <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Artifact Distribution</span>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats?.category_distribution || []} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }} width={100} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }} />
                            <Bar dataKey="courses" radius={[0, 10, 10, 0]} barSize={20}>
                              {(stats?.category_distribution || []).map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#0ea5e9'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Top Performing Nodes */}
                    <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">High-Yield Artifacts</h3>
                        <button onClick={() => setActiveModule("courses")} className="text-[10px] font-black text-teal-600 uppercase tracking-[2px] hover:underline">Full Registry →</button>
                      </div>
                      <div className="space-y-6">
                        {(stats?.top_courses || []).map((c: any, idx: number) => (
                          <div key={c.id} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-black text-slate-700 dark:text-slate-200 line-clamp-1">{c.title}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{c.enrollments} Scholars</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-black text-teal-600">{(c.revenue || 0).toLocaleString()} ETB</p>
                            </div>
                          </div>
                        ))}
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
                        <Users className="text-teal-600" size={24} />
                        User Management
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Control platform access and instructor nodes</p>
                    </div>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus size={18} /> Add New User
                    </button>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit border border-slate-200 dark:border-slate-700">
                    <button 
                      onClick={() => setUserTab("all")}
                      className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${userTab === "all" ? "bg-white dark:bg-slate-700 text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                      All Platform Users
                    </button>
                    <button 
                      onClick={() => setUserTab("applications")}
                      className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${userTab === "applications" ? "bg-white dark:bg-slate-700 text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                      Node Applications
                      {stats?.pending_instructors?.length > 0 && (
                        <span className="bg-teal-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
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
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Filter size={18} className="text-slate-400" />
                          <select 
                            value={roleFilter}
                            title="Filter by role"
                            aria-label="Filter by role"
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-teal-500"
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
                              <th className="px-6 py-4">ID</th>
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
                                <td className="px-6 py-4 text-xs font-bold text-slate-500">#{u.id}</td>
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
                                    u.role === 'ADMIN' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 
                                    u.role === 'INSTRUCTOR' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400' :
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
                                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
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
                                        <span key={idx} className="text-[9px] bg-teal-50 dark:bg-teal-900/20 text-teal-600 px-1.5 py-0.5 rounded border border-teal-100 dark:border-teal-800">
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
                                    <div className="flex items-center justify-end gap-2">
                                      <button 
                                        onClick={() => { setUserDetail(u); setShowDetailModal(true); }}
                                        title="View Detail"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all hover:bg-cyan-100 dark:hover:bg-cyan-900/40"
                                      >
                                        <Eye size={14} /> Detail
                                      </button>
                                      <button 
                                        onClick={() => { setEditUser(u); setShowEditModal(true); }}
                                        title="Edit User"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all hover:bg-teal-100 dark:hover:bg-teal-900/40"
                                      >
                                        <Edit size={14} /> Edit
                                      </button>
                                      <button 
                                        onClick={() => handleDeleteUser(u.id)} 
                                        title="Delete User"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all hover:bg-rose-100 dark:hover:bg-rose-900/40"
                                      >
                                        <Trash2 size={14} /> Delete
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
                              className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            >
                              <ChevronsLeft size={16} />
                            </button>
                            <button 
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={currentPage === 1}
                              title="Previous Page"
                              className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
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
                                        ? "bg-teal-600 text-white shadow-md shadow-teal-500/20" 
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
                              className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            >
                              <ChevronRight size={16} />
                            </button>
                            <button 
                              onClick={() => setCurrentPage(totalPages)}
                              disabled={currentPage === totalPages}
                              title="Last Page"
                              className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
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
                        <div key={app.id} className="group relative bg-white dark:bg-slate-800 rounded-[32px] border border-slate-200 dark:border-slate-700/50 p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-teal-500/10">
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
                               
                               <div className="space-y-4 mb-6">
                                  <div className="flex flex-wrap gap-2">
                                     <div className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-[10px] font-bold text-teal-600 uppercase border border-teal-100 dark:border-teal-800">Expertise: {app.expertise || 'General'}</div>
                                     <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-[10px] font-bold text-blue-600 uppercase border border-blue-100 dark:border-blue-800">Experience: {app.years_of_experience}y</div>
                                     <div className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-[10px] font-bold text-purple-600 uppercase border border-purple-100 dark:border-purple-800">{app.education_level || 'Faculty'}</div>
                                     <div className="px-3 py-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg text-[10px] font-bold text-slate-500 uppercase">{app.instructor_type?.replace('_', ' ') || 'Instructor'}</div>
                                  </div>

                                  {app.cv_file && (
                                    <a 
                                      href={app.cv_file} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-2 text-[10px] font-black text-cyan-600 uppercase tracking-widest hover:text-cyan-700 transition-colors bg-cyan-50 dark:bg-cyan-900/20 w-fit px-4 py-2 rounded-xl border border-cyan-100 dark:border-cyan-800"
                                    >
                                      <FileText size={14} /> Open CV Registry
                                    </a>
                                  )}
                               </div>

                               <div className="flex gap-3">
                                  <button 
                                    onClick={() => handleInstructorAction(app.id, true)} 
                                    disabled={actionLoading === app.id}
                                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                  >
                                    <Check size={14} /> 
                                    <span>{actionLoading === app.id ? "Validating..." : "Grant Node Access"}</span>
                                  </button>
                                  <button 
                                     onClick={() => handleInstructorAction(app.id, false)} 
                                     disabled={actionLoading === app.id}
                                     title="Decline Node Access Request"
                                     className="px-6 py-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 transition-all disabled:opacity-50"
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
                  <div className="gradient-primary-soft p-12 rounded-[48px] relative overflow-hidden group border border-teal-100/50 dark:border-teal-900/20">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-125 transition-all duration-1000" />
                     <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div>
                          <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter flex items-center gap-5">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl text-teal-600">
                               <BookOpen size={36} />
                            </div>
                            Knowledge Lab
                          </h2>
                          <p className="text-slate-600 dark:text-slate-300 text-xl font-medium opacity-80 max-w-xl leading-relaxed">Systematic orchestration, validation, and curation of the Fatra Academy intellectual property registry.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <div className="flex items-center gap-4">
                             <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl px-8 py-5 rounded-[32px] border border-white/60 shadow-2xl shadow-teal-500/10 text-center">
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[3px] mb-1">Authenticated</p>
                                <p className="text-5xl font-black text-teal-600 tracking-tighter">{allCourses.filter(c => c.is_approved).length}</p>
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
                      className={`px-10 py-4 rounded-[22px] text-xs font-black uppercase tracking-[2px] transition-all ${courseTab === "all" ? "bg-white dark:bg-slate-700 text-teal-600 shadow-2xl" : "text-slate-500 hover:text-slate-700"}`}
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
                        <div className="relative w-full md:w-[450px] shadow-2xl shadow-teal-500/5">
                          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                          <input 
                            type="text" 
                            placeholder="Search Knowledge Artifacts..."
                            value={courseSearch}
                            onChange={(e) => setCourseSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-none rounded-[28px] text-sm font-bold focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
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
                             {(() => {
                               const filtered = allCourses.filter(c => courseSearch === "" || (c.title || "").toLowerCase().includes(courseSearch.toLowerCase()));
                               const totalCoursePages = Math.ceil(filtered.length / courseItemsPerPage);
                               const courseStartIndex = (coursePage - 1) * courseItemsPerPage;
                               const currentCourses = filtered.slice(courseStartIndex, courseStartIndex + courseItemsPerPage);
                               
                               return (
                                 <>
                                   {currentCourses.map((c: any) => (
                                     <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 group transition-all">
                                       <td className="px-10 py-8">
                                         <div className="flex items-center gap-6">
                                           <div className="w-20 h-16 rounded-[22px] overflow-hidden bg-slate-100 border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-transform">
                                             <img src={c.thumbnail || "/api/placeholder/120/80"} alt={c.title} className="w-full h-full object-cover" />
                                           </div>
                                           <div>
                                             <span className="text-[9px] font-black text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-md uppercase tracking-widest mb-1.5 inline-block">{c.category_name || "General"}</span>
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
                                             onClick={() => { setInspectCourse(c); setShowInspectModal(true); }}
                                             className="p-4 bg-white dark:bg-slate-900 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                                             title="Inspect Artifact"
                                           >
                                             <Eye size={18} />
                                           </button>
                                           <button 
                                             onClick={() => { setEditCourseData(c); setShowCourseModal(true); }}
                                             className="p-4 bg-white dark:bg-slate-900 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                                             title="Modify Artifact"
                                           >
                                             <Edit size={18} />
                                           </button>
                                           <button 
                                             onClick={() => handleDeleteCourse(c.id)}
                                             className="p-4 bg-white dark:bg-slate-900 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-2xl transition-all border border-slate-100 dark:border-slate-800"
                                             title="De-provision Artifact"
                                           >
                                             <Trash2 size={18} />
                                           </button>
                                         </div>
                                       </td>
                                     </tr>
                                   ))}
                                   {/* Pagination Controls for Courses */}
                                   {totalCoursePages > 1 && (
                                     <tr>
                                       <td colSpan={4} className="px-10 py-6 bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800">
                                         <div className="flex items-center justify-between">
                                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                             Artifacts <span className="text-slate-800 dark:text-white">{courseStartIndex + 1}-{Math.min(courseStartIndex + courseItemsPerPage, filtered.length)}</span> / {filtered.length}
                                           </p>
                                           <div className="flex items-center gap-2">
                                             <button 
                                               onClick={() => setCoursePage(prev => Math.max(1, prev - 1))}
                                               disabled={coursePage === 1}
                                               className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-20 transition-colors"
                                             >
                                               <ChevronLeft size={20} />
                                             </button>
                                             <div className="flex gap-1">
                                               {Array.from({ length: totalCoursePages }).map((_, i) => (
                                                 <button
                                                   key={i}
                                                   onClick={() => setCoursePage(i + 1)}
                                                   className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${coursePage === i + 1 ? "bg-teal-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                                                 >
                                                   {i + 1}
                                                 </button>
                                               ))}
                                             </div>
                                             <button 
                                               onClick={() => setCoursePage(prev => Math.min(totalCoursePages, prev + 1))}
                                               disabled={coursePage === totalCoursePages}
                                               className="p-2 text-slate-400 hover:text-teal-600 disabled:opacity-20 transition-colors"
                                             >
                                               <ChevronRight size={20} />
                                             </button>
                                           </div>
                                         </div>
                                       </td>
                                     </tr>
                                   )}
                                 </>
                               );
                             })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {allCourses.filter(c => !c.is_approved && c.is_submitted).map((c: any) => (
                         <div key={c.id} className="bg-white dark:bg-slate-800 rounded-[48px] border-b-8 border-amber-500 p-10 shadow-2xl shadow-teal-500/5 flex flex-col gap-8 transition-transform hover:-translate-y-2 duration-500">
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
                                  <p className="text-lg font-black text-slate-800 dark:text-white leading-none">{c.price} Birr</p>
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
                        <p className="text-xl font-black text-teal-600">{categories.length}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAddCategoryModal(true)}
                      className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                        className="group bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all border-b-4 border-b-teal-500"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                            <Tag size={24} />
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => { setEditCategory(cat); setShowEditCategoryModal(true); }} 
                              title="Edit Category"
                              className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
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
                            <span className="text-lg font-black text-teal-600">{cat.node_count || 0}</span>
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
                  <div className="gradient-primary-soft p-12 rounded-[48px] relative overflow-hidden group border border-teal-100/50 dark:border-teal-900/20">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-125 transition-all duration-1000" />
                     <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div>
                          <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter flex items-center gap-5">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl text-teal-600">
                               <TrendingUp size={36} />
                            </div>
                            Live Session Hub
                          </h2>
                          <p className="text-slate-600 dark:text-slate-300 text-xl font-medium opacity-80 max-w-xl leading-relaxed">Orchestrate and moderate synchronous learning experiences, session slots, and faculty presence.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl px-8 py-5 rounded-[32px] border border-white/60 shadow-2xl shadow-teal-500/10 text-center">
                              <p className="text-[10px] uppercase font-black text-slate-400 tracking-[3px] mb-1">Active Hubs</p>
                              <p className="text-5xl font-black text-teal-600 tracking-tighter">{liveStreams.length}</p>
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
                      <div key={stream.id} className="group bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700/50 p-10 shadow-sm transition-all hover:shadow-2xl hover:shadow-teal-500/10 border-l-8 border-l-teal-600">
                        <div className="flex flex-col lg:flex-row gap-10">
                           <div className="lg:w-1/3 space-y-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-20 h-20 gradient-primary rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-xl">
                                    {stream.title?.[0] || "L"}
                                 </div>
                                 <div className="flex-1">
                                    <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter leading-tight">{stream.title}</h4>
                                    <p className="text-sm font-bold text-teal-600 dark:text-teal-400">@{stream.instructor_name}</p>
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
                                   className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white rounded-[24px] text-xs font-black uppercase tracking-[2px] shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-3"
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
                                   <div key={session.id} className="relative group/session bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-teal-500/30 transition-all">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                         <div>
                                            <h6 className="text-base font-black text-slate-800 dark:text-white mb-2 leading-none">{session.title}</h6>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                               <span className="flex items-center gap-1.5"><Calendar size={12} className="text-teal-500" /> {new Date(session.scheduled_at).toLocaleDateString()}</span>
                                               <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-teal-500" /> {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                         </div>
                                         {session.meeting_link && (
                                           <a 
                                             href={session.meeting_link} 
                                             target="_blank" 
                                             rel="noreferrer" 
                                             className="px-6 py-2.5 bg-white dark:bg-slate-800 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
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
                    <div className="gradient-primary-soft p-12 rounded-[48px] border border-teal-100/50 dark:border-teal-900/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2 tracking-tighter">Financial Architecture</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium opacity-80">Real-time revenue monitoring and protocol growth analytics.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/60 shadow-xl">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fiscal Velocity</p>
                          <p className="text-3xl font-black text-teal-600">+12.4%</p>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/60 shadow-xl">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Index</p>
                          <p className="text-3xl font-black text-emerald-500">9.8</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                          <div className="flex items-center justify-between mb-8">
                            <div>
                              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Platform Growth</h3>
                              <p className="text-xs text-slate-500">Users & Revenue metrics (6 months)</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 bg-teal-600 rounded-full" />
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Users</span>
                              <span className="w-3 h-3 bg-purple-500 rounded-full ml-4" />
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</span>
                            </div>
                          </div>
                          <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={stats?.monthly_growth || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis 
                                    dataKey="month" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: "#94a3b8" }} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: "#94a3b8" }} 
                                    tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="users" 
                                    stroke="#0d9488" 
                                    strokeWidth={4} 
                                    dot={{ r: 4, fill: "#0d9488", strokeWidth: 2, stroke: "#fff" }} 
                                    activeDot={{ r: 6 }} 
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#8b5cf6" 
                                    strokeWidth={4} 
                                    dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }} 
                                    activeDot={{ r: 6 }} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-800 p-10 rounded-[48px] border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-2xl">
                          <div className="w-16 h-16 bg-teal-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-teal-500/30"><DollarSign size={32} className="text-white" /></div>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[4px] mb-2 leading-none">Gross Revenue</p>
                          <p className="text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">{stats?.revenue?.total?.toLocaleString() || "168,000"} Birr</p>
                          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-500">
                            <TrendingUp size={14} /> +18.2% from last cycle
                          </div>
                        </div>

                        <div className="bg-slate-900 dark:bg-indigo-950 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                           <div className="relative z-10">
                              <p className="text-[10px] font-black text-teal-400 uppercase tracking-[4px] mb-2">Protocol Balance</p>
                              <p className="text-4xl font-black text-white tracking-tighter">42,850 Birr</p>
                              <button className="mt-8 w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-50 transition-colors">Initiate Payout</button>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                       <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Recent Financial Events</h3>
                          <button className="text-xs font-bold text-teal-600 uppercase tracking-widest hover:underline">View All Ledger →</button>
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
                                {(stats?.recent_payments || []).map((p: any) => (
                                   <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                      <td className="px-8 py-6 text-xs font-black text-slate-400">{p.id}</td>
                                      <td className="px-8 py-6">
                                         <p className="text-sm font-bold text-slate-800 dark:text-white">{p.subject}</p>
                                         <p className="text-[10px] text-slate-500 font-medium italic">Scholarly Node: @{p.student}</p>
                                      </td>
                                      <td className="px-8 py-6 text-sm font-black text-slate-800 dark:text-white">{p.amount.toLocaleString()} Birr</td>
                                      <td className="px-8 py-6 text-xs font-medium text-slate-500">{p.timestamp}</td>
                                      <td className="px-8 py-6 text-right">
                                         <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-black rounded-lg uppercase">{p.status}</span>
                                      </td>
                                   </tr>
                                ))}
                                {(!stats?.recent_payments || stats.recent_payments.length === 0) && (
                                  <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm">No recent transactions detected in the protocol ledger.</td>
                                  </tr>
                                )}
                             </tbody>
                          </table>
                       </div>
                    </div>
                  </div>
              )}

              {activeModule === "withdrawals" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Instructor Payout Requests</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900 text-xs font-bold uppercase text-slate-500">
                          <tr>
                            <th className="px-6 py-4 rounded-l-xl">ID</th>
                            <th className="px-6 py-4">Instructor ID</th>
                            <th className="px-6 py-4">Amount (ETB)</th>
                            <th className="px-6 py-4">Account Details</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 rounded-r-xl text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                          {withdrawals.map((req: any) => (
                            <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                              <td className="px-6 py-4 text-sm text-slate-500">{req.id}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">{req.instructor}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">{parseFloat(req.amount).toLocaleString()}</td>
                              <td className="px-6 py-4 text-sm text-slate-500">{req.account_details}</td>
                              <td className="px-6 py-4 text-sm text-slate-500">{new Date(req.created_at).toLocaleDateString()}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
                                  req.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                  req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                                  'bg-slate-100 text-slate-700'
                                }`}>
                                  {req.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                {req.status === 'PENDING' && (
                                  <button
                                    onClick={() => handleApproveWithdrawal(req.id)}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm"
                                  >
                                    Approve Payout
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                          {withdrawals.length === 0 && (
                            <tr>
                              <td colSpan={7} className="px-6 py-8 text-center text-slate-500">No withdrawal requests found.</td>
                            </tr>
                          )}
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
                        <FileText className="text-teal-600" size={24} />
                        AI Knowledge Base
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Upload documents that the AI chatbot can access and answer questions from.</p>
                    </div>
                    <button 
                      onClick={() => setShowUploadModal(true)}
                      className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Upload size={18} /> Upload Document
                    </button>
                  </div>

                  {/* Info Banner */}
                  <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30 rounded-2xl p-5 flex items-start gap-3">
                    <FileUp className="text-teal-600 shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">How it works</p>
                      <p className="text-xs text-teal-600 dark:text-teal-300 mt-1">Upload PDF, TXT, or MD files here. Active documents are automatically indexed into the AI platform chatbot&apos;s knowledge base. Users chatting with the bot will get answers from these documents.</p>
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
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 rounded-xl border border-teal-100 dark:border-teal-800/50">
                            <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest leading-none mb-1">Total Logic</p>
                            <p className="text-xl font-black text-teal-800 dark:text-teal-200">{knowledgeDocs.length}</p>
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
                                      doc.file_extension === 'md' ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-500' :
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
                                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-teal-600'
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
                  <UserPlus className="text-teal-600" size={20} />
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Institutional Role</label>
                  <select 
                    value={newUser.role}
                    aria-label="New user role"
                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20"
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
                  <Plus className="text-teal-600" size={20} />
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Stream Description"
                    placeholder="What will students learn?"
                    value={newStream.description}
                    onChange={e => setNewStream({...newStream, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Instructor</label>
                  <select 
                    required
                    title="Select Instructor"
                    value={newStream.instructor}
                    onChange={e => setNewStream({...newStream, instructor: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Group Type</label>
                  <select 
                    title="Group Type"
                    value={newStream.group_type}
                    onChange={e => setNewStream({...newStream, group_type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Session Description"
                    placeholder="Technical nodes and discovery..."
                    value={newSession.description}
                    onChange={e => setNewSession({...newSession, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                  <BookOpen className="text-teal-600" size={20} />
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-24"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-5 h-5 rounded-lg border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-600 transition-colors">Publish to Platform Registry</span>
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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                  <Edit className="text-teal-600" size={20} />
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">First Name</label>
                    <input 
                      type="text" 
                      title="First Name"
                      placeholder="e.g. John"
                      value={editUser.first_name || ""}
                      onChange={e => setEditUser({...editUser, first_name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Last Name</label>
                    <input 
                      type="text" 
                      title="Last Name"
                      placeholder="e.g. Doe"
                      value={editUser.last_name || ""}
                      onChange={e => setEditUser({...editUser, last_name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Biography / About</label>
                  <textarea 
                    title="User Biography"
                    placeholder="Tell us about this user..."
                    value={editUser.bio || ""}
                    onChange={e => setEditUser({...editUser, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Institutional Role</label>
                  <select 
                    value={editUser.role}
                    title="Institutional Role"
                    aria-label="Edit user role"
                    onChange={e => setEditUser({...editUser, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  >
                    <option value="STUDENT">Student (Default Node)</option>
                    <option value="INSTRUCTOR">Instructor (Faculty)</option>
                    <option value="ADMIN">Admin (Protocol Moderator)</option>
                    <option value="SUPER_ADMIN">Super Admin (System Architect)</option>
                  </select>
                </div>

                {editUser.role === 'INSTRUCTOR' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-700 mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Expertise</label>
                        <input 
                          type="text" 
                          title="Expertise"
                          placeholder="e.g. Mathematics"
                          value={editUser.expertise || ""}
                          onChange={e => setEditUser({...editUser, expertise: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Education</label>
                        <input 
                          type="text" 
                          title="Education"
                          placeholder="e.g. PhD in AI"
                          value={editUser.education_level || ""}
                          onChange={e => setEditUser({...editUser, education_level: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Professional Website</label>
                        <input 
                          type="text" 
                          title="Website"
                          placeholder="https://..."
                          value={editUser.website || ""}
                          onChange={e => setEditUser({...editUser, website: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Portfolio Link</label>
                        <input 
                          type="text" 
                          title="Portfolio"
                          placeholder="https://..."
                          value={editUser.portfolio || ""}
                          onChange={e => setEditUser({...editUser, portfolio: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update Identity
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
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
                    <div className="w-36 h-36 rounded-[36px] bg-white dark:bg-slate-800 border-8 border-white dark:border-slate-900 flex items-center justify-center text-5xl font-black text-teal-600 shadow-2xl relative z-10 overflow-hidden">
                      {userDetail.username?.charAt(0)?.toUpperCase() || "U"}
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent" />
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
                      <span className="px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-widest rounded-xl border border-teal-100/50 dark:border-teal-800/30">
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
                              <Mail size={18} className="text-teal-500" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Endpoint</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{userDetail.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                              <User size={18} className="text-teal-500" />
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
                            <span className="text-xs font-black text-teal-600 uppercase">Level 4</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2.5px] pb-2 border-b border-slate-100 dark:border-slate-800">Biological Summary</h4>
                      <div className="relative p-6 bg-teal-50/30 dark:bg-teal-900/10 rounded-[28px] border border-teal-100/50 dark:border-teal-800/30">
                        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
                          &quot;{userDetail.bio || "No biological summary provided to the registry."}&quot;
                        </p>
                        <div className="absolute -top-3 -left-3 bg-white dark:bg-slate-900 p-2 text-teal-500">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L20.017 3C21.1216 3 22.017 3.89543 22.017 5V19C22.017 20.1046 21.1216 21 20.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H4.01697C2.9124 8 2.01697 7.10457 2.01697 6V3L8.01697 3C9.12154 3 10.017 3.89543 10.017 5V19C10.017 20.1046 9.12154 21 8.01697 21H2.01697Z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Scorecard & Activity */}
                  <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-teal-500/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-all duration-1000" />
                      <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-6">Performance Scorecard</h4>
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
                              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400" 
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
                            <span key={i} className="px-3 py-2 bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800/50 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 shadow-sm transition-all hover:scale-105">{c}</span>
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

                    {userDetail.role === 'INSTRUCTOR' && (
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border border-slate-100 dark:border-slate-700/50 mt-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-3">Professional Connections</h4>
                        <div className="space-y-3">
                          {userDetail.website && (
                            <a 
                              href={userDetail.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all border border-slate-100 dark:border-slate-700"
                            >
                              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/40 rounded-lg flex items-center justify-center text-teal-600">
                                <Globe size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Website</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{userDetail.website}</p>
                              </div>
                              <ChevronRight size={14} className="text-slate-300" />
                            </a>
                          )}
                          {userDetail.portfolio && (
                            <a 
                              href={userDetail.portfolio} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all border border-slate-100 dark:border-slate-700"
                            >
                              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900/40 rounded-lg flex items-center justify-center text-sky-600">
                                <LinkIcon size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Portfolio</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{userDetail.portfolio}</p>
                              </div>
                              <ChevronRight size={14} className="text-slate-300" />
                            </a>
                          )}
                          {!userDetail.website && !userDetail.portfolio && (
                            <p className="text-xs text-slate-400 italic text-center py-2">No external links registered.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex gap-4 pt-10 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => { setShowDetailModal(false); setEditUser(userDetail); setShowEditModal(true); }}
                    className="flex-1 py-5 gradient-primary text-white text-xs font-black uppercase tracking-[3px] rounded-[24px] shadow-2xl shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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

      <AnimatePresence>
        {showInspectModal && inspectCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInspectModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="flex flex-col lg:flex-row h-[85vh]">
                {/* Left: Artifact Visual & Identity */}
                <div className="lg:w-1/3 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 flex flex-col">
                  <div className="relative aspect-video lg:aspect-square overflow-hidden">
                    <img src={inspectCourse.thumbnail || "/api/placeholder/400/400"} alt="Artifact Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6">
                      <span className="px-3 py-1 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-2 inline-block shadow-lg">ID: MOD-{inspectCourse.id}</span>
                      <h3 className="text-2xl font-black text-white tracking-tighter leading-tight">{inspectCourse.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Faculty Custodian</h4>
                      <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-white text-sm font-black uppercase">
                          {inspectCourse.instructor_username?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-white leading-none mb-1">@{inspectCourse.instructor_username}</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Validated Faculty</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Institutional Category</h4>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-2xl">
                          <Tag size={20} />
                        </div>
                        <span className="text-lg font-black text-slate-700 dark:text-slate-200 tracking-tight">{inspectCourse.category_name || "Uncategorized"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Deep Analytics & Content */}
                <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
                  <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Artifact Deep-Inspection</h2>
                      <p className="text-xs text-slate-500 font-medium">Internal registry audit & performance monitoring</p>
                    </div>
                    <button onClick={() => setShowInspectModal(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-rose-500 transition-all hover:rotate-90">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
                    {/* Performance Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3 text-cyan-600 mb-3">
                          <Users size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Enrolled Scholars</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800 dark:text-white">{inspectCourse.enrollment_count || 0}</p>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3 text-emerald-600 mb-3">
                          <DollarSign size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Total Yield (ETB)</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800 dark:text-white">{(inspectCourse.price * (inspectCourse.enrollment_count || 0)).toLocaleString()}</p>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3 text-amber-500 mb-3">
                          <Award size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Quality Rating</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800 dark:text-white">4.9</p>
                      </div>
                    </div>

                    {/* Descriptive Summary */}
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] pb-2 border-b border-slate-100 dark:border-slate-800">Intellectual Abstract</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {inspectCourse.description || "No intellectual abstract provided for this knowledge node."}
                      </p>
                    </div>

                    {/* Content Registry Preview */}
                    <div className="space-y-4">
                       <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Knowledge Components (Lessons)</h4>
                         <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 rounded-md">8 Artifacts</span>
                       </div>
                       <div className="grid grid-cols-1 gap-3">
                          {[1,2,3].map(i => (
                            <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group hover:border-teal-500 transition-all">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-xs font-black text-slate-400">0{i}</div>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Systematic Module {i}: Advanced Orchestration</span>
                              </div>
                              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                                <span className="text-[10px] font-black text-slate-400">12:45 MIN</span>
                                <Eye size={14} className="text-teal-500" />
                              </div>
                            </div>
                          ))}
                          <div className="text-center py-4">
                             <button className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline">View Full Registry Registry →</button>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="p-10 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex gap-4">
                    <button 
                      onClick={() => { setEditCourseData(inspectCourse); setShowCourseModal(true); setShowInspectModal(false); }}
                      className="flex-1 py-5 gradient-primary text-white text-xs font-black uppercase tracking-[3px] rounded-[24px] shadow-2xl shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                      <Edit size={18} /> Modify Registry Entry
                    </button>
                    {!inspectCourse.is_approved && inspectCourse.is_submitted && (
                      <button 
                        onClick={() => { handleCourseAction(inspectCourse.id, true); setShowInspectModal(false); }}
                        className="px-10 py-5 bg-emerald-600 text-white text-xs font-black uppercase tracking-[3px] rounded-[24px] shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 size={18} /> Authenticate
                      </button>
                    )}
                  </div>
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
                  <Tag className="text-teal-600" size={20} />
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Category Description"
                    placeholder="Topics covered in this node domain..."
                    value={newCategory.description}
                    onChange={e => setNewCategory({...newCategory, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                  <Edit className="text-teal-600" size={20} />
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Edit Category Description"
                    placeholder="Description"
                    value={editCategory.description || ""}
                    onChange={e => setEditCategory({...editCategory, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                  <Plus className="text-teal-600" size={20} />
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description</label>
                  <textarea 
                    title="Update Stream Description"
                    placeholder="Description"
                    value={editStreamData.description}
                    onChange={e => setEditStreamData({...editStreamData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none h-20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Instructor</label>
                  <select 
                    required
                    title="Select Instructor"
                    value={editStreamData.instructor}
                    onChange={e => setEditStreamData({...editStreamData, instructor: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Group Type</label>
                  <select 
                    value={editStreamData.group_type}
                    title="Select Group Type"
                    onChange={e => setEditStreamData({...editStreamData, group_type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
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
                        className="w-4 h-4 text-teal-600 border-slate-300 rounded"
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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                  <Upload className="text-teal-600" size={20} />
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
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Description (Optional)</label>
                  <textarea 
                    placeholder="Brief description of the document content..."
                    value={uploadDescription}
                    onChange={e => setUploadDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
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
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-600 hover:file:bg-teal-100 cursor-pointer"
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
                    className="flex-1 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
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
