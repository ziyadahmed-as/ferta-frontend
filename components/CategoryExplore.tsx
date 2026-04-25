"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Monitor, Heart, Code2, Brain, Palette, Globe, Shapes } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";

const CATEGORY_METADATA: Record<string, { icon: any; color: string; hoverColor: string; title: string, desc: string, slug: string }> = {
  programming: { 
    icon: Code2, 
    title: "Programming",
    slug: "programming",
    desc: "Master modern languages and frameworks to build scalable, high-performance software solutions.",
    color: "from-cyan-500 to-teal-600", 
    hoverColor: "from-cyan-600/20 to-teal-600/20" 
  },
  softskills: { 
    icon: Shapes, 
    title: "Softskills",
    slug: "softskills",
    desc: "Develop essential leadership, communication, and emotional intelligence for professional excellence.",
    color: "from-teal-500 to-emerald-600", 
    hoverColor: "from-teal-600/20 to-emerald-600/20" 
  },
  ai: { 
    icon: Brain, 
    title: "Artificial Intelligence",
    slug: "ai",
    desc: "Explore neural networks, machine learning, and generative AI to lead the next technological frontier.",
    color: "from-violet-500 to-sky-600", 
    hoverColor: "from-violet-600/20 to-sky-600/20" 
  },
  live: { 
    icon: Globe, 
    title: "Live Sessions",
    slug: "live",
    desc: "Join real-time synchronous learning cycles led by industry experts and academic faculty.",
    color: "from-rose-500 to-orange-600", 
    hoverColor: "from-rose-600/20 to-orange-600/20" 
  },
};

const CategoryExplore = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We'll use the specific elite categories requested
    const eliteCategories = [
      CATEGORY_METADATA.programming,
      CATEGORY_METADATA.softskills,
      CATEGORY_METADATA.ai,
      CATEGORY_METADATA.live
    ];
    setCategories(eliteCategories);
    setLoading(false);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 px-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-bold text-[10px] uppercase tracking-widest mb-4 inline-block">
              Elite selection
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-violet-600 uppercase">Top Categories</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-medium">
              Choose from our elite selection of professional disciplines and begin your journey.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 bg-slate-50 dark:bg-slate-900/50 rounded-3xl animate-pulse border border-slate-100 dark:border-slate-800" />
            ))
          ) : (
            categories.map((cat, idx) => {
              const IconComponent = cat.icon;
              const isLive = cat.slug === 'live';
              
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={isLive ? "/courses?type=live" : `/courses?category=${cat.slug}`}
                    className="group relative block h-full p-8 rounded-[32px] bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 overflow-hidden"
                  >
                    {/* Hover Glow Accent */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 mb-6`}>
                        <IconComponent size={24} className="text-white" strokeWidth={2.5} />
                      </div>
                      
                      <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors uppercase tracking-tight">
                        {cat.title}
                      </h3>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-medium italic opacity-80">
                        {cat.desc}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-zinc-800">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Registry</span>
                          <span className="text-[11px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                            Explore Node
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[24px] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-teal-500/20"
          >
            Browse All Disciplines <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryExplore;
