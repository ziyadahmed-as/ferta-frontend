"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Users, DollarSign, Star, Home } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";
import { InstructorSidebar } from "./components/InstructorSidebar";
import { InstructorHeader } from "./components/InstructorHeader";
import { InstructorStats } from "./components/InstructorStats";
import { InstructorCharts } from "./components/InstructorCharts";
import { InstructorContent } from "./components/InstructorContent";
import { InstructorModals } from "./components/InstructorModals";

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
      value: stats?.wallet_balance ? `${Math.round(stats.wallet_balance).toLocaleString()} Birr` : "—",
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
      <InstructorSidebar user={user} logout={logout} navItems={navItems} activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="flex-1 overflow-y-auto">
        <InstructorHeader user={user} logout={logout} />

        <div className="p-6 space-y-6">
          <InstructorStats user={user} statCards={statCards} />
          
          <InstructorCharts analytics={analytics} progressData={progressData} />

          <InstructorContent 
            user={user} activeTab={activeTab} setActiveTab={setActiveTab} 
            courses={courses} liveStreams={liveStreams} 
            setSelectedStream={setSelectedStream} setShowManageModal={setShowManageModal} 
          />
        </div>
      </main>

      <InstructorModals 
        showManageModal={showManageModal} setShowManageModal={setShowManageModal} 
        selectedStream={selectedStream} selectedSessionId={selectedSessionId} 
        setSelectedSessionId={setSelectedSessionId} artifactData={artifactData} 
        setArtifactData={setArtifactData} handleUploadArtifact={handleUploadArtifact} 
        uploading={uploading} 
      />
    </div>
  );
};

export default InstructorDashboard;
