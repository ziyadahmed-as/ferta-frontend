"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";
import { StudentSidebar } from "./components/StudentSidebar";
import { StudentHeader } from "./components/StudentHeader";
import { StudentStatsOverview } from "./components/StudentStatsOverview";
import { StudentCharts } from "./components/StudentCharts";
import { StudentCoursesList } from "./components/StudentCoursesList";
import { StudentModals } from "./components/StudentModals";
import { BookOpen, Clock, Award, TrendingUp, Calendar, Trophy, Home } from "lucide-react";

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
  const [itemForRating, setItemForRating] = useState<any>(null);
  const [itemTypeForRating, setItemTypeForRating] = useState<"stream" | "course">("stream");
  const [selectedStreamForLearn, setSelectedStreamForLearn] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* Secure Artifact Viewer State */
  const [showArtifactViewer, setShowArtifactViewer] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleRateItem = async () => {
    if (!itemForRating) return;
    setSubmittingRating(true);
    try {
      if (itemTypeForRating === "stream") {
        await api.post(`/courses/live-streams/${itemForRating.id}/rate_instructor/`, {
          rating,
          comment
        });
      } else {
        await api.post(`/interactions/reviews/`, {
          course: itemForRating.id,
          rating,
          comment
        });
      }
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
      <StudentSidebar user={user} logout={logout} navItems={navItems} activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="flex-1 overflow-y-auto">
        <StudentHeader user={user} />

        <div className="p-6 space-y-6">
          <StudentStatsOverview courses={courses} liveStreams={liveStreams} stats={stats} masteryData={masteryData} />

          <StudentCharts learningProgressData={learningProgressData} coursePerformanceData={coursePerformanceData} />

          <StudentCoursesList 
            activeTab={activeTab} setActiveTab={setActiveTab} 
            courses={courses} liveStreams={liveStreams} 
            setItemForRating={setItemForRating} setItemTypeForRating={setItemTypeForRating} 
            setShowRatingModal={setShowRatingModal} setSelectedStreamForLearn={setSelectedStreamForLearn} 
            setShowLearnModal={setShowLearnModal} 
          />
        </div>
      </main>

      <StudentModals 
        showRatingModal={showRatingModal} setShowRatingModal={setShowRatingModal} 
        itemTypeForRating={itemTypeForRating} itemForRating={itemForRating} 
        rating={rating} setRating={setRating} 
        comment={comment} setComment={setComment} 
        handleRateItem={handleRateItem} submittingRating={submittingRating} 
        showLearnModal={showLearnModal} setShowLearnModal={setShowLearnModal} 
        selectedStreamForLearn={selectedStreamForLearn} setActiveArtifact={setActiveArtifact} 
        setShowArtifactViewer={setShowArtifactViewer} showArtifactViewer={showArtifactViewer} 
        activeArtifact={activeArtifact} 
      />
    </div>
  );
};

export default StudentDashboard;
