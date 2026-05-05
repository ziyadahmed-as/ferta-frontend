"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { 
  ArrowLeft, Save, Plus, Trash2, Video, FileText, 
  ImageIcon, Type, Globe, ChevronDown, ChevronUp, 
  PlayCircle, Loader2, Sparkles, CheckCircle2, 
  AlertCircle, Layout, Upload, Clock, Eye, EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EditLessonPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    
    const [lesson, setLesson] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await api.get(`/courses/lessons/${id}/`);
                setLesson(res.data);
            } catch (err) {
                console.error("Failed to fetch lesson data", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchLesson();
    }, [id]);

    const handleUpdateLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("title", lesson.title);
            formData.append("description", lesson.description || "");
            formData.append("duration", lesson.duration || "0");
            formData.append("is_preview", String(lesson.is_preview));
            formData.append("video_url", lesson.video_url || "");
            
            if (videoFile) {
                formData.append("video_file", videoFile);
            }

            await api.patch(`/courses/lessons/${id}/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                }
            });
            
            alert("Lesson updated successfully.");
            setVideoFile(null);
            setUploadProgress(0);
            
            // Refresh data
            const res = await api.get(`/courses/lessons/${id}/`);
            setLesson(res.data);
        } catch (err) {
            console.error("Failed to update lesson", err);
            alert("Update failed. Please check your connection and file size.");
        } finally {
            setSaving(false);
        }
    };

    const handleAddBlock = async (type: string) => {
        try {
            const res = await api.post("/courses/content-blocks/", {
                lesson: id,
                type,
                title: `New ${type} Block`,
                order: lesson.content_blocks.length
            });
            setLesson({ ...lesson, content_blocks: [...lesson.content_blocks, res.data] });
        } catch (err) {
            console.error("Failed to add block", err);
        }
    };

    const handleDeleteBlock = async (blockId: number) => {
        if (!confirm("Delete this content block?")) return;
        try {
            await api.delete(`/courses/content-blocks/${blockId}/`);
            setLesson({ ...lesson, content_blocks: lesson.content_blocks.filter((b: any) => b.id !== blockId) });
        } catch (err) {
            console.error("Failed to delete block", err);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Accessing Lesson Artifact...</p>
            </div>
        </div>
    );

    if (!lesson) return <div>Lesson not found.</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 font-sans">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => router.back()}
                            title="Go Back"
                            aria-label="Go Back"
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">Lesson Architect</span>
                            </div>
                            <h1 className="font-bold text-slate-800 dark:text-white truncate max-w-md">{lesson.title}</h1>
                        </div>
                    </div>
                    <button 
                        onClick={handleUpdateLesson}
                        disabled={saving}
                        className="px-6 py-2.5 gradient-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        {saving ? "Synchronizing..." : "Save Artifact"}
                    </button>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Core Data */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <Type size={20} className="text-cyan-500" /> Lesson Essentials
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Lesson Title</label>
                                <input 
                                    type="text" 
                                    title="Lesson Title"
                                    placeholder="Enter lesson title"
                                    value={lesson.title}
                                    onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                                <textarea 
                                    rows={4}
                                    title="Lesson Description"
                                    placeholder="Enter lesson description"
                                    value={lesson.description}
                                    onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                                        <Clock size={12} /> Duration (Min)
                                    </label>
                                    <input 
                                        type="number" 
                                        title="Lesson Duration"
                                        placeholder="0"
                                        value={lesson.duration}
                                        onChange={(e) => setLesson({ ...lesson, duration: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-bold text-slate-800 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                                        <Eye size={12} /> Visibility
                                    </label>
                                    <button 
                                        onClick={() => setLesson({ ...lesson, is_preview: !lesson.is_preview })}
                                        className={`w-full px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-between transition-all ${
                                            lesson.is_preview 
                                            ? "bg-cyan-50 text-cyan-600 border border-cyan-100" 
                                            : "bg-slate-50 text-slate-500 border border-slate-100 dark:bg-slate-950 dark:border-slate-800"
                                        }`}
                                    >
                                        {lesson.is_preview ? "Free Preview" : "Enrolled Only"}
                                        {lesson.is_preview ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <Layout size={20} className="text-cyan-500" /> Content Blocks
                        </h3>
                        
                        <div className="space-y-4">
                            {lesson.content_blocks.map((block: any) => (
                                <div key={block.id} className="p-5 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                            {block.type === 'text' && <Type size={18} />}
                                            {block.type === 'image' && <ImageIcon size={18} />}
                                            {block.type === 'pdf' && <FileText size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">{block.title}</p>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{block.type} Artifact</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDeleteBlock(block.id)}
                                        title="Delete block"
                                        aria-label="Delete block"
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}

                            <div className="grid grid-cols-3 gap-3 pt-4">
                                {[
                                    { type: 'text', icon: Type, label: 'Text' },
                                    { type: 'image', icon: ImageIcon, label: 'Image' },
                                    { type: 'pdf', icon: FileText, label: 'PDF' }
                                ].map((btn) => (
                                    <button 
                                        key={btn.type}
                                        onClick={() => handleAddBlock(btn.type)}
                                        className="py-3 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-600 hover:border-cyan-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <btn.icon size={14} /> {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Media & Actions */}
                <div className="space-y-8">
                    <section className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl text-white">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Video size={20} className="text-cyan-400" /> Video Signal
                        </h3>
                        
                        <div className="space-y-6">
                            {/* Drive Upload */}
                            <div className="relative group">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3 block">Cloud Pulse (Drive)</label>
                                <div className="border-2 border-dashed border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-cyan-500 transition-all cursor-pointer relative overflow-hidden bg-slate-800/30">
                                    <input 
                                        type="file" 
                                        title="Upload video file"
                                        aria-label="Upload video file"
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    {uploadProgress > 0 ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                                            <p className="text-xl font-black text-cyan-400">{uploadProgress}%</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload size={32} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                                            <p className="text-xs font-bold text-slate-500 text-center">
                                                {videoFile ? videoFile.name : "Drop video to upload to Google Drive"}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <div className="h-px flex-1 bg-slate-800" />
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">OR</span>
                                <div className="h-px flex-1 bg-slate-800" />
                            </div>

                            {/* External Link */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                                    <Globe size={12} /> External link
                                </label>
                                <input 
                                    type="url" 
                                    placeholder="YouTube, Drive, or Vimeo link"
                                    value={lesson.video_url || ""}
                                    onChange={(e) => setLesson({ ...lesson, video_url: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-800 border border-slate-700 rounded-2xl outline-none font-medium text-sm text-slate-300 focus:ring-2 focus:ring-cyan-500/40"
                                />
                            </div>

                            {lesson.video_file && (
                                <div className="mt-4 p-4 bg-cyan-900/20 border border-cyan-500/20 rounded-2xl">
                                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <CheckCircle2 size={12} /> Drive Asset Active
                                    </p>
                                    <p className="text-xs text-cyan-200/60 truncate font-mono">{lesson.video_file}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                         <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6">Mastery Logic</h4>
                         <p className="text-xs text-slate-500 leading-relaxed mb-6">
                            Once this artifact is deployed, it will be immediately accessible to all enrolled scholars in the curriculum hub.
                         </p>
                         <button 
                            onClick={() => router.push(`/courses/${lesson.chapter_course_id}/learn?lessonId=${lesson.id}`)}
                            className="w-full py-4 border border-slate-200 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-600 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2"
                         >
                            <PlayCircle size={16} /> Preview as Scholar
                         </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditLessonPage;
