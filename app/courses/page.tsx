"use client";

import React, { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { BookOpen, Search, Layers, Users, Clock, ArrowRight, Filter, SlidersHorizontal } from "lucide-react";
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
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.results);
        setCategories(catsRes.data);
      } catch (err) {
        console.error("Catalog fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || c.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header Shard */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2 block font-mono italic">Institutional Asset Registry</span>
              <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white tracking-tighter italic">
                 Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Knowledge Network</span>
              </h1>
           </motion.div>
           <p className="text-zinc-500 font-medium text-sm max-w-md italic opacity-80 uppercase tracking-widest text-right">
              Hydrating your operational path with pre-vetted curriculum artifacts.
           </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 p-4 rounded-[2.5rem] mb-12 flex flex-col lg:flex-row gap-4 items-center shadow-xl shadow-zinc-200/20 dark:shadow-none">
           <div className="relative flex-1 group">
              <Search className="absolute left-6 top-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Query institutional nodes..." 
                title="Search Courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all text-sm italic"
              />
           </div>
           
           <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic whitespace-nowrap ${
                   !selectedCategory ? "bg-zinc-950 text-white shadow-xl" : "bg-white dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                 All Artifacts
              </button>
              {categories.map(cat => (
                 <button 
                   key={cat.id}
                   onClick={() => setSelectedCategory(cat.name)}
                   className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic whitespace-nowrap ${
                      selectedCategory === cat.name ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "bg-white dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                   }`}
                 >
                    {cat.name}
                 </button>
              ))}
           </div>
        </div>

        {/* Results Grid */}
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="h-[400px] bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] animate-pulse" />
                ))}
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
               {filteredCourses.map((c, i) => (
                 <motion.div
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ delay: i * 0.05 }}
                   key={c.id}
                   className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] overflow-hidden hover:border-indigo-600/30 transition-all flex flex-col shadow-xl shadow-zinc-200/10 dark:shadow-none"
                 >
                    <div className="relative h-56 overflow-hidden">
                       {c.thumbnail ? (
                         <Image fill src={c.thumbnail} alt={c.title} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                       ) : (
                         <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white">
                            <BookOpen size={48} className="opacity-20 translate-y-4" />
                         </div>
                       )}
                       <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 italic shadow-lg">
                             {c.category_name || "Institutional"}
                          </span>
                       </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                             <Users size={14} className="text-zinc-500" />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic">{c.instructor_name}</span>
                       </div>
                       
                       <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter mb-4 italic leading-tight group-hover:text-indigo-600 transition-colors">
                          {c.title}
                       </h3>
                       
                       <div className="mt-auto pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">
                             <span className="flex items-center gap-1.5"><Clock size={12}/> {c.course_type?.replace('_', ' ')}</span>
                          </div>
                          <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tighter">${c.price}</span>
                       </div>

                       <Link href={`/courses/${c.id}`} className="mt-6 w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center gap-2 group/btn font-black text-[10px] uppercase tracking-[0.2em] italic shadow-xl shadow-zinc-950/10 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all">
                          Initialize Node <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
            
            {!loading && filteredCourses.length === 0 && (
               <div className="col-span-full py-32 text-center">
                  <BookOpen size={64} className="mx-auto text-zinc-200 mb-6" />
                  <p className="text-zinc-500 font-black uppercase tracking-widest italic">No Institutional Nodes Found Matching Your Signal.</p>
               </div>
            )}
          </div>
        )}
      </main>
  );
};

const CoursesCatalog = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <Navbar />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center font-black tracking-widest italic animate-pulse uppercase text-zinc-500">
                    Decrypting Knowledge Network...
                </div>
            }>
                <CatalogContent />
            </Suspense>
            <Footer />
        </div>
    );
};

export default CoursesCatalog;
