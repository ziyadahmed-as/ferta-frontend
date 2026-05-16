"use client";

import React, { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { BookOpen, Search, Layers, Users, Clock, ArrowRight, Filter, SlidersHorizontal, Star, X, Eye, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const CatalogContent = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialType = searchParams.get("type");
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [viewType, setViewType] = useState<string | null>(initialType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, catsRes] = await Promise.all([
          api.get("/courses/courses/"),
          api.get("/courses/categories/")
        ]);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results || []);
        setCategories(catsRes.data || []);
      } catch (err) {
        console.error("Catalog fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sync state with URL parameters for robust filtering
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlType = searchParams.get("type");
    setSelectedCategory(urlCategory);
    setViewType(urlType);
  }, [searchParams]);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || c.category_slug === selectedCategory || c.category_name === selectedCategory;
    const matchesType = !viewType || (viewType === "live" ? c.is_live : !c.is_live);
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <main className="min-h-screen bg-slate-50/30 dark:bg-slate-900/50">
      {/* Premium Hero Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 pt-32 pb-20">
        <div className="container-max px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-10"
          >
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-[3px] rounded-full border border-cyan-100/50 dark:border-cyan-800/30 mb-6">
                {viewType === "live" ? <TrendingUp size={14} /> : <BookOpen size={14} />}
                {viewType === "live" ? "Synchronous Learning Hub" : "Scholastic Repository"}
              </span>
              <h1 className="text-6xl md:text-7xl font-black text-slate-800 dark:text-white tracking-tighter leading-[0.9] mb-8">
                {viewType === "live" ? "Live Sync" : "Professional"} <br />
                <span className="text-transparent bg-clip-text gradient-primary">{viewType === "live" ? "Sessions" : "Course Registry"}</span>
              </h1>
              <p className="text-lg font-medium text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                {viewType === "live"
                  ? "Engage with expert faculty in real-time. Join high-fidelity synchronous sessions designed for immediate knowledge transfer and interactive mastery."
                  : "Explore our curated collection of high-fidelity knowledge nodes, meticulously orchestrated by global faculty to accelerate your professional evolution."}
              </p>
            </div>

            {/* Quick Stats / Social Proof */}
            <div className="flex gap-4 pb-2">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 min-w-[140px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{viewType === "live" ? "Active Streams" : "Active Nodes"}</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                  {viewType === "live" ? courses.filter(c => c.is_live).length : courses.length}+
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 min-w-[140px]">
                <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1">{viewType === "live" ? "Next Session" : "Success Rate"}</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">{viewType === "live" ? "Live" : "98.4%"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-max px-6 py-12">
        {/* Search & Filter Orchestration */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 transition-colors" size={22} />
              <input
                type="text"
                placeholder="Search Knowledge Registry..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-800 border-none rounded-[28px] shadow-2xl shadow-slate-200/50 dark:shadow-none focus:ring-4 focus:ring-cyan-600/10 outline-none text-base font-bold transition-all text-slate-800 dark:text-white placeholder:text-slate-300"
              />
              {search && (
                <button title="close"
                  onClick={() => setSearch("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-rose-500 rounded-full transition-all"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all whitespace-nowrap shadow-sm border ${!selectedCategory
                    ? "gradient-primary text-white border-transparent shadow-xl shadow-cyan-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-500 border-slate-100 dark:border-slate-700 hover:border-cyan-200"
                  }`}
              >
                All Variants
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all whitespace-nowrap shadow-sm border ${selectedCategory === cat.slug || selectedCategory === cat.name
                      ? "gradient-primary text-white border-transparent shadow-xl shadow-cyan-500/20"
                      : "bg-white dark:bg-slate-800 text-slate-500 border-slate-100 dark:border-slate-700 hover:border-cyan-200"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((c, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    key={c.id}
                    className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[32px] overflow-hidden hover:border-cyan-300 dark:hover:border-cyan-600 transition-all flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-cyan-500/10"
                  >
                    <Link href={`/courses/${c.id}`} className="block relative h-56 overflow-hidden">
                      {c.thumbnail ? (
                        <Image fill src={c.thumbnail} alt={c.title} className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
                          <BookOpen size={48} className="text-slate-200" />
                        </div>
                      )}
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 shadow-xl border border-white/20">
                          {c.category_name}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                          <Eye size={16} /> Inspect Module
                        </div>
                      </div>
                    </Link>

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-600">
                          <Users size={14} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">@{c.instructor_name}</span>
                      </div>

                      <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 line-clamp-2 tracking-tight group-hover:text-cyan-600 transition-colors">
                        {c.title}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-6">
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase">4.8 Logic Sync</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Clock size={14} className="text-teal-500" /> 12 Hours
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Enrollment Value</p>
                          <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">${c.price}</p>
                        </div>
                      </div>

                      <Link href={`/courses/${c.id}`} className="mt-8 w-full py-4 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[2.5px] border border-slate-100 dark:border-slate-600 hover:gradient-primary hover:text-white hover:border-transparent transition-all group/btn active:scale-95 shadow-sm">
                        Initialize Node <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {!loading && filteredCourses.length === 0 && (
              <div className="py-32 text-center bg-white dark:bg-slate-800 rounded-[48px] border-4 border-dashed border-slate-100 dark:border-slate-700 shadow-2xl shadow-slate-200/20">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <Search size={40} className="text-slate-200" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">No results in registry</h3>
                <p className="text-slate-400 max-w-sm mx-auto font-medium">Our global network could not locate knowledge nodes matching your current filter parameters.</p>
                <button
                  onClick={() => { setSearch(""); setSelectedCategory(null); }}
                  className="mt-8 px-8 py-4 bg-cyan-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Reset Registry Filters
                </button>
              </div>
            )}

            {/* Premium Load More Section */}
            {filteredCourses.length > 0 && !loading && (
              <div className="text-center pb-20">
                <button className="px-12 py-5 bg-white dark:bg-slate-800 border-none rounded-3xl text-slate-800 dark:text-white text-[10px] font-black uppercase tracking-[3px] shadow-2xl shadow-slate-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all border border-slate-100 dark:border-slate-700">
                  Sync More Nodes
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

const CoursesCatalog = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <Suspense fallback={
        <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium tracking-wider uppercase text-xs">Loading Catalog...</p>
        </div>
      }>
        <CatalogContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default CoursesCatalog;
