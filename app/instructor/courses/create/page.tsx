"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { 
  ArrowLeft, Save, Plus, X, Upload, 
  BookOpen, Layers, DollarSign, Type, FileText, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const CreateCoursePage = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "0",
        course_type: "HARD_SKILL_RECORDED",
        thumbnail: null as File | null,
    });

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await api.get("/courses/categories/");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories");
            }
        };
        fetchCats();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData({ ...formData, thumbnail: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("price", formData.price);
        data.append("course_type", formData.course_type);
        if (formData.thumbnail) {
            data.append("thumbnail", formData.thumbnail);
        }

        try {
            const res = await api.post("/courses/courses/", data);
            router.push(`/instructor/courses/${res.data.id}/edit`);
        } catch (err) {
            console.error("Failed to create course", err);
            alert("Error creating course. Please check all fields.");
        } finally {
            setLoading(false);
        }
    };

    if (!user || (user.role !== "INSTRUCTOR" && !user.is_superuser)) {
        router.push("/instructor/dashboard");
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm uppercase tracking-widest">Back to Dashboard</span>
                </button>

                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                                <Plus size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create New Course</h1>
                                <p className="text-slate-500 font-medium">Initialize your scholarly knowledge artifact</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                        <Type size={14} /> Course Title
                                    </label>
                                    <input 
                                        required
                                        type="text" 
                                        name="title"
                                        title="Course Title"
                                        placeholder="e.g. Master UX/UI Design in 2026"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-cyan-600/10 outline-none font-bold text-slate-800 dark:text-white transition-all text-lg placeholder:text-slate-300"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                            <Layers size={14} /> Category
                                        </label>
                                        <select 
                                            required
                                            name="category"
                                            title="Select Course Category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none font-bold text-slate-700 dark:text-white transition-all text-sm appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Domain</option>
                                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                            <DollarSign size={14} /> Price (USD)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
                                            <input 
                                                required
                                                type="number" 
                                                name="price"
                                                title="Course Price"
                                                placeholder="0"
                                                min="0"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none font-bold text-slate-700 dark:text-white transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                        <FileText size={14} /> Description
                                    </label>
                                    <textarea 
                                        required
                                        name="description"
                                        title="Course Description"
                                        placeholder="Outline the learning objectives and course trajectory..."
                                        rows={5}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none font-medium text-slate-700 dark:text-slate-300 transition-all text-sm leading-relaxed"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                        <Upload size={14} /> Thumbnail Artifact
                                    </label>
                                    <div className="p-10 border-2 border-dashed border-slate-100 dark:border-slate-700 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-cyan-500/50 transition-all">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="thumbnail-upload"
                                        />
                                        <label htmlFor="thumbnail-upload" className="cursor-pointer">
                                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4 group-hover:scale-110 group-hover:text-cyan-500 transition-all shadow-sm">
                                                <BookOpen size={28} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                {formData.thumbnail ? formData.thumbnail.name : "Choose an identity image"}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recommended size 1280x720</p>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 gradient-primary text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-cyan-500/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={18} /> Initialize Course Artifact</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCoursePage;
