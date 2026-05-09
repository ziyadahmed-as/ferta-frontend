"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { OverviewModule } from "./components/OverviewModule";
import { UserManagementModule } from "./components/UserManagementModule";
import { CourseAnalyticsModule } from "./components/CourseAnalyticsModule";
import { CoursesModule } from "./components/CoursesModule";
import { CategoriesModule } from "./components/CategoriesModule";
import { LiveSessionsModule } from "./components/LiveSessionsModule";
import { RevenueModule } from "./components/RevenueModule";
import { WithdrawalsModule } from "./components/WithdrawalsModule";
import { KnowledgeBaseModule } from "./components/KnowledgeBaseModule";
import { UserModals } from "./components/UserModals";
import { CourseModals } from "./components/CourseModals";
import { StreamModals } from "./components/StreamModals";
import { CategoryModals } from "./components/CategoryModals";
import { KnowledgeModals } from "./components/KnowledgeModals";

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
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "STUDENT" });
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
    title: "", slug: "", description: "", price: "0.00", category: "", instructor: "", course_type: "VIDEO_BASED", is_published: false
  });

  /* Live Stream Creation State */
  const [showAddStreamModal, setShowAddStreamModal] = useState(false);
  const [showEditStreamModal, setShowEditStreamModal] = useState(false);
  const [editStreamData, setEditStreamData] = useState<any>(null);
  const [newStream, setNewStream] = useState({
    title: "", description: "", instructor: "", scheduled_at: "", meeting_link: "", price: "5000.00", group_type: "VIP1"
  });

  /* Live Session Creation State */
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [selectedStreamForSession, setSelectedStreamForSession] = useState<any>(null);
  const [newSession, setNewSession] = useState({ title: "", description: "", scheduled_at: "", meeting_link: "" });

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

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/manage/");
      setAllUsers(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Users fetch error:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/users/admin-stats/");
      setStats(res.data);
      setError(null);
    } catch (err: any) {
      console.error("Admin stats fetch error:", err);
      // Only set error if we don't have any cached stats to show
      if (!stats) {
        setError("Unable to connect to the server. Please ensure the backend is running.");
      }
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

  const fetchKnowledge = async () => {
    try {
      const res = await api.get("/ai/documents/");
      setKnowledgeDocs(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Knowledge fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN" || user?.is_superuser) {
      fetchStats();
      fetchUsers();
      fetchCourses();
      fetchCategories();
      fetchLiveStreams();
      fetchKnowledge();
      fetchWithdrawals();
    } else {
      setLoading(false);
    }
  }, [user]);

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
      fetchKnowledge();
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
      fetchKnowledge();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error toggling document");
    }
  };

  const handleDeleteDocument = async (docId: number) => {
    if (!confirm("Are you sure you want to permanently delete this document?")) return;
    try {
      await api.delete(`/ai/documents/${docId}/`);
      fetchKnowledge();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting document");
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) return alert("Name and Slug are required.");
    try {
      await api.post("/courses/categories/", newCategory);
      setShowAddCategoryModal(false);
      setNewCategory({ name: "", slug: "", description: "" });
      fetchCategories();
      alert("Category created successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error creating category");
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory) return;
    try {
      await api.patch(`/courses/categories/${editCategory.id}/`, {
        name: editCategory.name,
        slug: editCategory.slug,
        description: editCategory.description
      });
      setShowEditCategoryModal(false);
      setEditCategory(null);
      fetchCategories();
      alert("Category updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error updating category");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/courses/categories/${id}/`);
      fetchCategories();
      alert("Category deleted.");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting category");
    }
  };

  const handleInstructorAction = async (userId: number, approve: boolean) => {
    setActionLoading(userId);
    try {
      if (approve) {
        await api.post(`/users/manage/${userId}/approve_instructor/`);
        alert("Instructor application approved. Role updated to INSTRUCTOR.");
      } else {
        await api.post(`/users/manage/${userId}/reject_instructor/`);
        alert("Instructor application rejected. Role returned to STUDENT.");
      }
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error processing application");
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
      fetchUsers();
      fetchStats();
      alert("User created successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || JSON.stringify(err.response?.data) || "Error creating user");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      await api.patch(`/users/manage/${editUser.id}/`, {
        username: editUser.username,
        email: editUser.email,
        role: editUser.role,
        is_active: editUser.is_active,
        first_name: editUser.first_name,
        last_name: editUser.last_name,
        bio: editUser.bio,
        expertise: editUser.expertise,
        education_level: editUser.education_level,
        website: editUser.website,
        portfolio: editUser.portfolio
      });
      setShowEditModal(false);
      setEditUser(null);
      fetchUsers();
      fetchStats();
      alert("User updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error updating user");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you absolutely sure you want to de-provision this user? This cannot be undone.")) return;
    try {
      await api.delete(`/users/manage/${userId}/`);
      alert("User removed from platform registry.");
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting user");
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editCourseData) {
      try {
        await api.patch(`/courses/courses/${editCourseData.id}/`, {
          title: editCourseData.title,
          slug: editCourseData.slug,
          description: editCourseData.description,
          price: editCourseData.price,
          is_published: editCourseData.is_published,
          course_type: editCourseData.course_type,
          instructor: editCourseData.instructor,
          category: editCourseData.category
        });
        setShowCourseModal(false);
        setEditCourseData(null);
        fetchCourses();
        fetchStats();
        alert("Course updated successfully!");
      } catch (err: any) {
        alert(err.response?.data?.detail || "Error updating course");
      }
    } else {
      if (!newCourse.title || !newCourse.slug || !newCourse.instructor || !newCourse.category) {
        return alert("Please fill all required fields (Title, Slug, Category, Instructor)");
      }
      try {
        await api.post("/courses/courses/", newCourse);
        setShowCourseModal(false);
        setNewCourse({
          title: "", slug: "", description: "", price: "0.00", category: "", instructor: "", course_type: "VIDEO_BASED", is_published: false
        });
        fetchCourses();
        fetchStats();
        alert("Course created successfully!");
      } catch (err: any) {
        alert(err.response?.data?.detail || JSON.stringify(err.response?.data) || "Error creating course");
      }
    }
  };

  const handleToggleCourseStatus = async (courseId: number, isPublished: boolean) => {
    try {
      await api.patch(`/courses/courses/${courseId}/`, { is_published: !isPublished });
      fetchCourses();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error updating course status");
    }
  };

  const handleCourseAction = async (courseId: number, approve: boolean) => {
    try {
      if (approve) {
        await api.post(`/courses/courses/${courseId}/approve/`);
        alert("Course approved successfully!");
      } else {
        await api.post(`/courses/courses/${courseId}/reject/`);
        alert("Course rejected and returned to instructor.");
      }
      fetchCourses();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.detail || `Error ${approve ? "approving" : "rejecting"} course`);
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm("Are you sure you want to permanently delete this course?")) return;
    try {
      await api.delete(`/courses/courses/${courseId}/`);
      fetchCourses();
      fetchStats();
      alert("Course deleted successfully.");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting course");
    }
  };

  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStream.title || !newStream.instructor) {
      return alert("Title and Instructor are required.");
    }
    try {
      await api.post("/courses/live-streams/", newStream);
      setShowAddStreamModal(false);
      setNewStream({
        title: "", description: "", instructor: "", scheduled_at: "", meeting_link: "", price: "5000.00", group_type: "VIP1"
      });
      fetchLiveStreams();
      fetchStats();
      alert("Live Stream created successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error creating stream");
    }
  };

  const handleEditStreamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStreamData) return;
    try {
      await api.patch(`/courses/live-streams/${editStreamData.id}/`, editStreamData);
      setShowEditStreamModal(false);
      setEditStreamData(null);
      fetchLiveStreams();
      alert("Stream updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error updating stream");
    }
  };

  const handleDeleteStream = async (id: number) => {
    if (!confirm("Are you sure you want to delete this live stream?")) return;
    try {
      await api.delete(`/courses/live-streams/${id}/`);
      fetchLiveStreams();
      fetchStats();
      alert("Live stream deleted.");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error deleting stream");
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStreamForSession || !newSession.title || !newSession.scheduled_at) return alert("Title and Schedule are required.");
    try {
      await api.post("/courses/live-sessions/", {
        live_stream: selectedStreamForSession.id,
        ...newSession
      });
      setShowAddSessionModal(false);
      setNewSession({ title: "", description: "", scheduled_at: "", meeting_link: "" });
      fetchLiveStreams();
      alert("Session added successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error adding session");
    }
  };

  const handleDuplicateStream = () => {
    if (!selectedStream || !duplicateInstructorId) return alert("Please select an instructor");
    api.post(`/courses/live-streams/${selectedStream.id}/duplicate/`, {
      instructor_id: duplicateInstructorId
    }).then(() => {
      setShowDuplicateModal(false);
      setDuplicateInstructorId("");
      fetchLiveStreams();
      alert("Stream duplicated successfully!");
    }).catch((err: any) => {
      alert(err.response?.data?.detail || "Error duplicating stream");
    });
  };

  if (!mounted) return null;

  if (!user || (user.role !== "ADMIN" && !user.is_superuser)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6">
        <ShieldAlert size={56} className="text-red-500 mb-5" />
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Access Denied</h1>
        <p className="text-slate-500 mb-6">You need administrative privileges to access this area.</p>
        <Link href="/" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Go Home</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Initializing Admin Console...</p>
        </div>
      </div>
    );
  }

  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesTab = userTab === "all" || 
                      (userTab === "applications" && u.role === "INSTRUCTOR" && !u.is_approved_instructor);
    return matchesSearch && matchesRole && matchesTab;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans text-slate-900 dark:text-slate-200">
      <AdminSidebar
        user={user}
        logout={logout}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isCourseManagementOpen={isCourseManagementOpen}
        setIsCourseManagementOpen={setIsCourseManagementOpen}
        setRoleFilter={setRoleFilter}
        setUserTab={setUserTab}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white dark:bg-slate-900 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] rounded-tl-3xl lg:rounded-none relative z-10">
        <AdminHeader 
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          user={user}
          logout={logout}
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
          <div className="absolute top-0 left-0 w-full h-96 bg-cyan-600/5 dark:bg-cyan-500/5 pointer-events-none -z-10" />

          {activeModule === "overview" && <OverviewModule stats={stats} liveStreams={liveStreams} setActiveModule={setActiveModule} setUserDetail={setUserDetail} setShowDetailModal={setShowDetailModal} setEditUser={setEditUser} setShowEditModal={setShowEditModal} handleDeleteUser={handleDeleteUser} />}
          {activeModule === "users" && <UserManagementModule stats={stats} currentUsers={currentUsers} filteredUsers={filteredUsers} userSearch={userSearch} setUserSearch={setUserSearch} roleFilter={roleFilter} setRoleFilter={setRoleFilter} userTab={userTab} setUserTab={setUserTab} setShowAddModal={setShowAddModal} setShowEditModal={setShowEditModal} setEditUser={setEditUser} setShowDetailModal={setShowDetailModal} setUserDetail={setUserDetail} handleDeleteUser={handleDeleteUser} handleInstructorAction={handleInstructorAction} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} startIndex={startIndex} itemsPerPage={itemsPerPage} actionLoading={actionLoading} />}
          {activeModule === "course_analytics" && <CourseAnalyticsModule stats={stats} setActiveModule={setActiveModule} />}
          {activeModule === "courses" && <CoursesModule allCourses={allCourses} courseSearch={courseSearch} setCourseSearch={setCourseSearch} courseTab={courseTab} setCourseTab={setCourseTab} coursePage={coursePage} setCoursePage={setCoursePage} courseItemsPerPage={courseItemsPerPage} setEditCourseData={setEditCourseData} setShowCourseModal={setShowCourseModal} setInspectCourse={setInspectCourse} setShowInspectModal={setShowInspectModal} handleDeleteCourse={handleDeleteCourse} handleCourseAction={handleCourseAction} />}
          {activeModule === "categories" && <CategoriesModule categories={categories} setShowAddCategoryModal={setShowAddCategoryModal} setEditCategory={setEditCategory} setShowEditCategoryModal={setShowEditCategoryModal} handleDeleteCategory={handleDeleteCategory} />}
          {activeModule === "live" && <LiveSessionsModule liveStreams={liveStreams} setShowAddStreamModal={setShowAddStreamModal} setEditStreamData={setEditStreamData} setShowEditStreamModal={setShowEditStreamModal} setSelectedStreamForSession={setSelectedStreamForSession} setShowAddSessionModal={setShowAddSessionModal} setSelectedStream={setSelectedStream} setShowDuplicateModal={setShowDuplicateModal} handleDeleteStream={handleDeleteStream} />}
          {activeModule === "revenue" && <RevenueModule stats={stats} />}
          {activeModule === "withdrawals" && <WithdrawalsModule withdrawals={withdrawals} handleApproveWithdrawal={handleApproveWithdrawal} />}
          {activeModule === "knowledge" && <KnowledgeBaseModule knowledgeDocs={knowledgeDocs} knowledgeSearch={knowledgeSearch} setKnowledgeSearch={setKnowledgeSearch} setShowUploadModal={setShowUploadModal} handleToggleDocument={handleToggleDocument} handleDeleteDocument={handleDeleteDocument} />}

          <UserModals showAddModal={showAddModal} setShowAddModal={setShowAddModal} newUser={newUser} setNewUser={setNewUser} handleAddUser={handleAddUser} showEditModal={showEditModal} setShowEditModal={setShowEditModal} editUser={editUser} setEditUser={setEditUser} handleEditSubmit={handleEditSubmit} showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal} userDetail={userDetail} />
          
          <CourseModals showCourseModal={showCourseModal} setShowCourseModal={setShowCourseModal} editCourseData={editCourseData} setEditCourseData={setEditCourseData} newCourse={newCourse} setNewCourse={setNewCourse} handleCourseSubmit={handleCourseSubmit} allUsers={allUsers} categories={categories} showInspectModal={showInspectModal} setShowInspectModal={setShowInspectModal} inspectCourse={inspectCourse} handleCourseAction={handleCourseAction} />
          
          <StreamModals showDuplicateModal={showDuplicateModal} setShowDuplicateModal={setShowDuplicateModal} selectedStream={selectedStream} duplicateInstructorId={duplicateInstructorId} setDuplicateInstructorId={setDuplicateInstructorId} handleDuplicateStream={handleDuplicateStream} showAddStreamModal={showAddStreamModal} setShowAddStreamModal={setShowAddStreamModal} newStream={newStream} setNewStream={setNewStream} handleCreateStream={handleCreateStream} allUsers={allUsers} showAddSessionModal={showAddSessionModal} setShowAddSessionModal={setShowAddSessionModal} selectedStreamForSession={selectedStreamForSession} newSession={newSession} setNewSession={setNewSession} handleCreateSession={handleCreateSession} showEditStreamModal={showEditStreamModal} setShowEditStreamModal={setShowEditStreamModal} editStreamData={editStreamData} setEditStreamData={setEditStreamData} handleEditStreamSubmit={handleEditStreamSubmit} />
          
          <CategoryModals showAddCategoryModal={showAddCategoryModal} setShowAddCategoryModal={setShowAddCategoryModal} newCategory={newCategory} setNewCategory={setNewCategory} handleCreateCategory={handleCreateCategory} showEditCategoryModal={showEditCategoryModal} setShowEditCategoryModal={setShowEditCategoryModal} editCategory={editCategory} setEditCategory={setEditCategory} handleUpdateCategory={handleUpdateCategory} />
          
          <KnowledgeModals showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal} uploadTitle={uploadTitle} setUploadTitle={setUploadTitle} uploadDescription={uploadDescription} setUploadDescription={setUploadDescription} setUploadFile={setUploadFile} handleUploadDocument={handleUploadDocument} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
