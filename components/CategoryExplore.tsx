"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Monitor, Heart, Code2, Brain, Palette, Globe, Shapes } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";

const CATEGORY_METADATA: Record<string, { icon: any; color: string; hoverColor: string }> = {
  programming: { icon: Code2, color: "from-blue-500 to-indigo-600", hoverColor: "from-blue-600/20 to-indigo-600/20" },
  "ai-and-softskills": { icon: Brain, color: "from-violet-500 to-purple-600", hoverColor: "from-violet-600/20 to-purple-600/20" },
  mathematics: { icon: Shapes, color: "from-teal-500 to-emerald-600", hoverColor: "from-teal-600/20 to-emerald-600/20" },
  biology: { icon: Heart, color: "from-pink-500 to-rose-600", hoverColor: "from-pink-600/20 to-rose-600/20" },
  physics: { icon: Monitor, color: "from-orange-500 to-amber-600", hoverColor: "from-orange-600/20 to-amber-600/20" },
  english: { icon: Globe, color: "from-cyan-500 to-indigo-600", hoverColor: "from-cyan-600/20 to-indigo-600/20" },
};

const getCategoryMetadata = (slug: string = "") => {
  const normalized = slug.toLowerCase();
  return CATEGORY_METADATA[normalized] || { 
    icon: BookOpen, 
    color: "from-slate-500 to-slate-700", 
    hoverColor: "from-slate-600/10 to-slate-700/10" 
  };
};

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  node_count?: number;
}

const CategoryExplore = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses/categories/").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      // Take top 3 for the landing page premium view
      setCategories(data.slice(0, 3));
    }).catch((err) => {
      console.error("Failed to sync category hub:", err);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 px-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-4 inline-block">
              Institutional Registry
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 uppercase">Top Categories</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
              Choose from our elite selection of professional disciplines and begin your journey toward technical mastery today.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 bg-slate-50 dark:bg-slate-900/50 rounded-3xl animate-pulse border border-slate-100 dark:border-slate-800" />
            ))
          ) : (
            categories.map((cat, idx) => {
              const metadata = getCategoryMetadata(cat.slug);
              const IconComponent = metadata.icon;
              
              return (
                <motion.div
                  key={cat.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={`/courses?category=${cat.slug}`}
                    className="group relative block h-full p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden"
                  >
                    {/* Hover Glow Accent */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metadata.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-16 h-16 bg-gradient-to-br ${metadata.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 mb-6`}>
                        <IconComponent size={30} className="text-white" strokeWidth={2.5} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                        {cat.name}
                      </h3>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3 italic">
                        {cat.description || "Master the core principles and advanced methodologies of this discipline through our expert-led modules."}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-zinc-800">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Registration</span>
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {cat.node_count || 0} Professional Nodes
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
          
          {/* Fallback if no categories exist in DB yet */}
          {!loading && categories.length === 0 && (
            <div className="col-span-3 py-16 text-center bg-slate-50 dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-zinc-800">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium tracking-tight italic">Knowledge Registry is currently indexing... Check back shortly.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/20"
          >
            Browse All Disciplines <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryExplore;
