"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { 
  ArrowLeft, Save, Plus, Trash2, Edit, GripVertical, 
  Video, FileText, ImageIcon, Type, Globe, 
  ChevronDown, ChevronUp, PlayCircle, Loader2, Sparkles,
  CheckCircle2, AlertCircle, SettingsIcon, Layout, Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EditCoursePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    
    const [course, setCourse] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("curriculum");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseRes, catsRes] = await Promise.all([
                    api.get(`/courses/courses/${id}/`),
                    api.get("/courses/categories/")
                ]);
                setCourse(courseRes.data);
                setCategories(catsRes.data);
            } catch (err) {
                console.error("Failed to fetch edit data", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    const handleUpdateBasic = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.patch(`/courses/courses/${id}/`, {
                title: course.title,
                description: course.description,
                price: course.price,
                category: course.category
            });
            alert("Course details updated successfully.");
        } catch (err) {
            console.error("Failed to update course", err);
        } finally {
            setSaving(false);
        }
    };

    const handleAddChapter = async () => {
        try {
            const res = await api.post("/courses/chapters/", {
                course: id,
                title: "New Module",
                order: course.chapters.length
            });
            setCourse({ ...course, chapters: [...course.chapters, { ...res.data, lessons: [] }] });
        } catch (err) {
            console.error("Failed to add chapter", err);
        }
    };

    const handleAddLesson = async (chapterId: number) => {
        try {
            const chapter = course.chapters.find((c: any) => c.id === chapterId);
            const res = await api.post("/courses/lessons/", {
                chapter: chapterId,
                title: "New Lesson",
                order: chapter.lessons.length
            });
            
            const updatedChapters = course.chapters.map((c: any) => 
                c.id === chapterId ? { ...c, lessons: [...c.lessons, res.data] } : c
            );
            setCourse({ ...course, chapters: updatedChapters });
        } catch (err) {
            console.error("Failed to add lesson", err);
        }
    };

    const handleDeleteChapter = async (chapId: number) => {
        if (!confirm("Are you sure you want to delete this chapter and all its lessons?")) return;
        try {
            await api.delete(`/courses/chapters/${chapId}/`);
            setCourse({ ...course, chapters: course.chapters.filter((c: any) => c.id !== chapId) });
        } catch (err) {
            console.error("Failed to delete chapter", err);
        }
    };

    const handleDeleteLesson = async (chapId: number, lessonId: number) => {
        if (!confirm("Delete this lesson?")) return;
        try {
            await api.delete(`/courses/lessons/${lessonId}/`);
            const updatedChapters = course.chapters.map((c: any) => 
                c.id === chapId ? { ...c, lessons: c.lessons.filter((l: any) => l.id !== lessonId) } : c
            );
            setCourse({ ...course, chapters: updatedChapters });
        } catch (err) {
            console.error("Failed to delete lesson", err);
        }
    };

    const generateAIStructure = async () => {
        setAiLoading(true);
        try {
            const res = await api.post(`/courses/courses/${id}/generate-ai-curriculum/`, { auto_create: true });
            // Refresh course data
            const refresh = await api.get(`/courses/courses/${id}/`);
            setCourse(refresh.data);
            alert("AI has generated a suggested structure for your course.");
        } catch (err) {
            console.error("AI Generation failed", err);
        } finally {
            setAiLoading(false);
        }
    };

    const submitForApproval = async () => {
        try {
            await api.post(`/courses/courses/${id}/submit_for_approval/`);
            setCourse({ ...course, is_submitted: true });
            alert("Course submitted for moderation. You'll receive a notification once it's reviewed.");
        } catch (err) {
            console.error("Submission failed", err);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Accessing Knowledge Node...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => router.push("/instructor/dashboard")}
                            title="Back to Dashboard"
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500 transition-all"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className={`w-2 h-2 rounded-full ${course.is_approved ? "bg-green-500" : "bg-amber-500"}`} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {course.is_approved ? "Live Deployment" : course.is_submitted ? "In Moderation" : "Draft Status"}
                                </span>
                            </div>
                            <h1 className="font-bold text-slate-800 dark:text-white truncate max-w-md">{course.title}</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={submitForApproval}
                            disabled={course.is_submitted || course.is_approved}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                course.is_submitted || course.is_approved 
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                : "gradient-primary text-white shadow-lg shadow-blue-500/20 active:scale-95"
                            }`}
                        >
                            {course.is_approved ? "Approved" : course.is_submitted ? "Pending Approval" : "Request Deployment"}
                        </button>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
                    {[
                        { id: "curriculum", label: "Curriculum Flow", icon: Layout },
                        { id: "basic", label: "Node Details", icon: Type },
                        { id: "settings", label: "Platform Config", icon: SettingsIcon }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                                activeTab === tab.id ? "text-blue-600" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-10">
                <AnimatePresence mode="wait">
                    {activeTab === "basic" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl mx-auto">
                            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 p-10 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8">Course Basics</h3>
                                <form onSubmit={handleUpdateBasic} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="course-title" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Title</label>
                                        <input 
                                            id="course-title"
                                            type="text" 
                                            placeholder="Enter course title"
                                            title="Course Title"
                                            value={course.title}
                                            onChange={(e) => setCourse({ ...course, title: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-bold text-slate-800 dark:text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="course-category" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                                            <select 
                                                id="course-category"
                                                title="Select Course Category"
                                                value={course.category}
                                                onChange={(e) => setCourse({ ...course, category: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-bold text-slate-800 dark:text-white appearance-none"
                                            >
                                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="course-price" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Price ($)</label>
                                            <input 
                                                id="course-price"
                                                type="number" 
                                                placeholder="0.00"
                                                title="Course Price"
                                                value={course.price}
                                                onChange={(e) => setCourse({ ...course, price: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-bold text-slate-800 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="course-description" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                                        <textarea 
                                            id="course-description"
                                            rows={6}
                                            placeholder="Write a compelling course description..."
                                            title="Course Description"
                                            value={course.description}
                                            onChange={(e) => setCourse({ ...course, description: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-medium text-slate-700 dark:text-slate-300 leading-relaxed"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="w-full py-4 gradient-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-95 transition-all"
                                    >
                                        {saving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Sync Details</>}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "curriculum" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Curriculum Master</h2>
                                    <p className="text-slate-500 text-sm font-medium">Design your learning trajectory with modules and artifacts.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={generateAIStructure}
                                        disabled={aiLoading}
                                        className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest text-blue-600 hover:border-blue-300 transition-all shadow-sm group"
                                    >
                                        {aiLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} className="group-hover:animate-bounce" />}
                                        AI Suggestion
                                    </button>
                                    <button 
                                        onClick={handleAddChapter}
                                        className="flex items-center gap-2 px-5 py-3 gradient-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all active:scale-95"
                                    >
                                        <Plus size={16} /> Add Module
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {course.chapters.length === 0 ? (
                                    <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] bg-white dark:bg-slate-800/10">
                                        <Monitor size={48} className="mx-auto text-slate-200 dark:text-slate-700 mb-4" />
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Registry is empty. Start by adding a module.</p>
                                    </div>
                                ) : (
                                    course.chapters.map((chapter: any, chapIdx: number) => (
                                        <div key={chapter.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-black text-xs">
                                                        {chapIdx + 1}
                                                    </div>
                                                    <label htmlFor={`chapter-title-${chapter.id}`} className="sr-only">Chapter Title</label>
                                                    <input 
                                                        id={`chapter-title-${chapter.id}`}
                                                        type="text" 
                                                        placeholder="Chapter Title"
                                                        title="Chapter Title"
                                                        value={chapter.title} 
                                                        onChange={(e) => {
                                                            const updated = course.chapters.map((c: any) => c.id === chapter.id ? { ...c, title: e.target.value } : c);
                                                            setCourse({ ...course, chapters: updated });
                                                        }}
                                                        onBlur={() => api.patch(`/courses/chapters/${chapter.id}/`, { title: chapter.title })}
                                                        className="bg-transparent border-none outline-none font-bold text-slate-800 dark:text-white text-lg focus:ring-0 w-80 truncate"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        onClick={() => handleAddLesson(chapter.id)}
                                                        className="text-[10px] font-black uppercase text-blue-600 tracking-widest hover:underline"
                                                    >
                                                        Add Lesson
                                                    </button>
                                                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                                                    <button 
                                                        onClick={() => handleDeleteChapter(chapter.id)}
                                                        title="Delete Chapter"
                                                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="p-4 space-y-2">
                                                {chapter.lessons.length === 0 ? (
                                                    <p className="text-center py-8 text-xs text-slate-400 font-medium">No lessons in this module yet.</p>
                                                ) : (
                                                    chapter.lessons.map((lesson: any) => (
                                                        <div key={lesson.id} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-700 rounded-2xl group hover:border-blue-500/10 hover:bg-white dark:hover:bg-slate-800 transition-all">
                                                            <div className="flex items-center gap-4">
                                                                <PlayCircle size={18} className="text-slate-300" />
                                                                <label htmlFor={`lesson-title-${lesson.id}`} className="sr-only">Lesson Title</label>
                                                                <input 
                                                                    id={`lesson-title-${lesson.id}`}
                                                                    type="text" 
                                                                    placeholder="Lesson Title"
                                                                    title="Lesson Title"
                                                                    value={lesson.title}
                                                                    onChange={(e) => {
                                                                        const updated = course.chapters.map((c: any) => {
                                                                            if (c.id === chapter.id) {
                                                                                return { ...c, lessons: c.lessons.map((l: any) => l.id === lesson.id ? { ...l, title: e.target.value } : l) };
                                                                            }
                                                                            return c;
                                                                        });
                                                                        setCourse({ ...course, chapters: updated });
                                                                    }}
                                                                    onBlur={() => api.patch(`/courses/lessons/${lesson.id}/`, { title: lesson.title })}
                                                                    className="bg-transparent border-none outline-none font-bold text-slate-700 dark:text-slate-300 text-sm focus:ring-0 w-64 truncate"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button 
                                                                    onClick={() => router.push(`/instructor/lessons/${lesson.id}/edit`)}
                                                                    title="Edit Lesson Content"
                                                                    className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 text-blue-600 shadow-sm"
                                                                >
                                                                    <Layout size={14} />
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleDeleteLesson(chapter.id, lesson.id)}
                                                                    title="Delete Lesson"
                                                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "settings" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-xl mx-auto text-center space-y-12 py-10">
                            <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle size={48} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Platform Control Panel</h3>
                                <p className="text-slate-500 font-medium">Manage deployment status and administrative locks.</p>
                            </div>
                            
                            <div className="space-y-4">
                                <button className="w-full py-4 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Unpublish Course Node</button>
                                <button className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-900/30 rounded-2xl font-bold hover:bg-red-100 transition-all">Decommission Knowledge Node</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default EditCoursePage;
