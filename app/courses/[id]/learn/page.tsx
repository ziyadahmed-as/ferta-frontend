"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LearnHeader } from "./components/LearnHeader";
import { LearnSidebar } from "./components/LearnSidebar";
import { LessonContent } from "./components/LessonContent";
import { AiTutorSidebar } from "./components/AiTutorSidebar";

const LearnPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AI Tutor State
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Hello! I'm your AI Learning Assistant. How can I help you with this lesson today?" }
  ]);
  const [chatQuery, setChatQuery] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aiSidebarOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, aiSidebarOpen, isAiTyping]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/courses/${id}/`);
        const courseData = response.data;

        if (!courseData.is_enrolled && user?.role !== 'ADMIN') {
          router.push(`/courses/${id}`);
          return;
        }

        setCourse(courseData);

        // Flatten lessons to find currently selected or first lesson
        const allLessons = courseData.chapters.flatMap((c: any) => c.lessons);
        const lessonId = searchParams.get("lessonId");

        let initialLesson = allLessons[0];
        if (lessonId) {
          initialLesson = allLessons.find((l: any) => l.id === parseInt(lessonId)) || allLessons[0];
        }

        setCurrentLesson(initialLesson);

        // Track completed lessons
        const completed = allLessons.filter((l: any) => l.is_completed).map((l: any) => l.id);
        setCompletedLessons(completed);

      } catch (err) {
        console.error("Learn page fetch error:", err);
        setError("Failed to load course content. Please check your enrollment.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id, user, searchParams, router]);

  const handleLessonSelect = (lesson: any) => {
    setCurrentLesson(lesson);
    router.replace(`/courses/${id}/learn?lessonId=${lesson.id}`);
  };

  const goToNextLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.chapters.flatMap((c: any) => c.lessons);
    const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson?.id);
    if (currentIndex < allLessons.length - 1) {
      handleLessonSelect(allLessons[currentIndex + 1]);
    }
  };

  const goToPrevLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.chapters.flatMap((c: any) => c.lessons);
    const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      handleLessonSelect(allLessons[currentIndex - 1]);
    }
  };

  const handleMarkComplete = async () => {
    if (!currentLesson || completing) return;

    setCompleting(true);
    try {
      await api.post(`/interactions/lessons-progress/mark-completed/${currentLesson.id}/`);
      setCompletedLessons(prev => [...prev, currentLesson.id]);

      // Auto move to next lesson
      goToNextLesson();
    } catch (err: any) {
      console.error("Mark complete error:", err);
      // If the error is "Please complete the previous lesson first"
      if (err.response?.data?.detail) {
        alert(err.response.data.detail);
      }
    } finally {
      setCompleting(false);
    }
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim() || isAiTyping) return;

    const query = chatQuery;
    setChatQuery("");
    setChatHistory(prev => [...prev, { role: 'user', content: query }]);
    setIsAiTyping(true);

    try {
      const res = await api.post("/ai/learning-assistant/", {
        query,
        course_id: id,
        context: currentLesson ? `Current Lesson: ${currentLesson.title}\nDescription: ${currentLesson.description}` : undefined
      });
      setChatHistory(prev => [...prev, { role: 'ai', content: res.data.response }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Hydrating your learning environment...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 px-6 text-center">
      <X size={48} className="text-red-500 mb-4" />
      <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{error}</h1>
      <button onClick={() => router.push(`/courses/${id}`)} className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg">Back to Course</button>
    </div>
  );

  const allLessons = course?.chapters?.flatMap((c: any) => c.lessons) || [];
  const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson?.id);
  const isLastLesson = currentIndex === allLessons.length - 1;
  const isFirstLesson = currentIndex === 0;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden font-sans">
      <LearnHeader 
        course={course} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} 
        aiSidebarOpen={aiSidebarOpen} setAiSidebarOpen={setAiSidebarOpen} 
        completedLessons={completedLessons} allLessons={allLessons} 
      />

      <div className="flex flex-1 overflow-hidden relative">
        <LearnSidebar 
          course={course} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} 
          currentLesson={currentLesson} handleLessonSelect={handleLessonSelect} 
          completedLessons={completedLessons} 
        />

        <LessonContent 
          course={course} currentLesson={currentLesson} allLessons={allLessons} 
          currentIndex={currentIndex} isFirstLesson={isFirstLesson} isLastLesson={isLastLesson} 
          goToPrevLesson={goToPrevLesson} goToNextLesson={goToNextLesson} 
          completedLessons={completedLessons} handleMarkComplete={handleMarkComplete} 
          completing={completing} 
        />

        <AiTutorSidebar 
          aiSidebarOpen={aiSidebarOpen} setAiSidebarOpen={setAiSidebarOpen} 
          chatHistory={chatHistory} isAiTyping={isAiTyping} chatEndRef={chatEndRef} 
          chatQuery={chatQuery} setChatQuery={setChatQuery} handleAskAI={handleAskAI} 
        />
      </div>
    </div>
  );
};

export default LearnPage;
