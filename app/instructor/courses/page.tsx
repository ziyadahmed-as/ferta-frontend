"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { 
  BookOpen, Plus, Search, Filter, MoreVertical, 
  Edit3, Trash2, Eye, Users, DollarSign, ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InstructorCoursesPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/courses/courses/?mine=true");
                setCourses(Array.isArray(res.data) ? res.data : res.data.results || []);
            } catch (err) {
                console.error("Failed to fetch instructor courses");
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchCourses();
    }, [user]);

    const filteredCourses = courses.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!user || (user.role !== "INSTRUCTOR" && !user.is_superuser)) {
        router.push("/instructor/dashboard");
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans pb-20">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <button 
                            onClick={() => router.push("/instructor/dashboard")}
                            className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors mb-4 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold text-[10px] uppercase tracking-widest">Back to Dashboard</span>
                        </button>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Course Inventory</h1>
                        <p className="text-slate-500 font-medium">Manage and monitor your catalog of knowledge artifacts</p>
                    </div>
                    {user.is_approved_instructor ? (
                        <Link 
                            href="/instructor/courses/create"
                            className="flex items-center gap-2 px-6 py-3.5 gradient-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:opacity-90 active:scale-95 transition-all"
                        >
                            <Plus size={18} /> Add New Artifact
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2 px-6 py-3.5 bg-slate-200 dark:bg-slate-800 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest cursor-not-allowed">
                            <Plus size={18} /> Restricted Access
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text"
                                placeholder="Search artifacts..."
                                title="Search Courses"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-cyan-600/5 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                                <Filter size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-700">Artifact</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-700">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-700">Scholars</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-700">Revenue</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-8 h-8 border-3 border-cyan-600 border-t-transparent rounded-full animate-spin" />
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hydrating Catalog...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredCourses.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No artifacts found in current registry</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCourses.map((course) => (
                                        <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 relative overflow-hidden shrink-0">
                                                        <Image 
                                                            src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80"}
                                                            alt={course.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800 dark:text-white mb-0.5 line-clamp-1">{course.title}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.category_name || "Uncategorized"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    course.is_approved 
                                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30" 
                                                    : "bg-amber-50 text-amber-600 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30"
                                                }`}>
                                                    {course.is_approved ? "Live" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                                                    <Users size={14} className="text-slate-400" />
                                                    {course.enrollment_count || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                                                    <DollarSign size={14} className="text-slate-400" />
                                                    {course.price || 0}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link 
                                                        href={`/courses/${course.id}`}
                                                        title="View Public Page"
                                                        className="p-2 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-400 hover:text-cyan-600 hover:border-cyan-100 transition-all"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link 
                                                        href={`/instructor/courses/${course.id}/edit`}
                                                        title="Edit Curriculum"
                                                        className="p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-all"
                                                    >
                                                        <Edit3 size={16} />
                                                    </Link>
                                                    <button 
                                                        title="Delete Artifact"
                                                        className="p-2 text-slate-400 hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCoursesPage;
