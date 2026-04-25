"use client";

import React, { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { BookOpen, Search, Layers, Users, Clock, ArrowRight, Filter, SlidersHorizontal, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const CatalogContent = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

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
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || c.category_slug === selectedCategory || c.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="section-padding container-max min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge-text italic">Educational Catalog</span>
          <h1 className="section-title italic tracking-tighter mb-6">
            Comprehensive <span className="text-transparent bg-clip-text gradient-primary text-slate-900 dark:text-white">Course Registry</span>
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto italic uppercase tracking-widest text-[10px] font-black opacity-60">
            Synchronizing mastery across our global network of professional and academic disciplines.
          </p>
        </motion.div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for courses, skills, or instructors..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-cyan-600/10 outline-none font-medium transition-all text-slate-800 dark:text-white shadow-sm"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                title="Clear Search"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                !selectedCategory ? "gradient-primary text-white shadow-md shadow-cyan-500/20" : "text-slate-500 hover:bg-white dark:hover:bg-slate-700"
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug || selectedCategory === cat.name ? "gradient-primary text-white shadow-md shadow-cyan-500/20" : "text-slate-500 hover:bg-white dark:hover:bg-slate-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="h-44 bg-slate-100 dark:bg-slate-700 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/4 animate-pulse" />
                <div className="h-6 bg-slate-100 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((c, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  key={c.id}
                  className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden hover:border-cyan-300 dark:hover:border-cyan-600 transition-all flex flex-col shadow-sm hover:shadow-xl hover:shadow-cyan-500/5"
                >
                  <Link href={`/courses/${c.id}`} className="block relative h-48 overflow-hidden">
                    {c.thumbnail ? (
                      <Image fill src={c.thumbnail} alt={c.title} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <BookOpen size={40} className="text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 shadow-sm border border-white/20">
                        {c.category_name}
                      </span>
                    </div>
                  </Link>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-600">
                        <Users size={12} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{c.instructor_name}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug group-hover:text-cyan-600 transition-colors">
                      {c.title}
                    </h3>

                    <div className="flex items-center gap-1 mb-4 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs text-slate-400 ml-1">(4.8)</span>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                        <Clock size={12}/> 12 Hours
                      </div>
                      <span className="text-xl font-bold text-slate-900 dark:text-white">${c.price}</span>
                    </div>

                    <Link href={`/courses/${c.id}`} className="mt-5 w-full py-3.5 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm hover:gradient-primary hover:text-white transition-all group/btn active:scale-95">
                      View Course <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!loading && filteredCourses.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No courses found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter to find what you're looking for.</p>
              <button 
                onClick={() => {setSearch(""); setSelectedCategory(null);}} 
                className="mt-6 text-cyan-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More Button - Placeholder */}
          {filteredCourses.length > 0 && !loading && (
            <div className="text-center">
              <button className="px-8 py-3.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:border-cyan-600 hover:text-cyan-600 transition-all">
                Load More Courses
              </button>
            </div>
          )}
        </>
      )}
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
