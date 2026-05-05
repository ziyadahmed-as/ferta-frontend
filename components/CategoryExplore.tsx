"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Code2, Brain, Palette, Globe, Shapes } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORY_METADATA: Record<string, { icon: any; color: string; iconBg: string; title: string; desc: string; slug: string }> = {
  programming: {
    icon: Code2,
    title: "Programming",
    slug: "programming",
    desc: "Master modern languages and frameworks to build scalable, high-performance software solutions.",
    color: "from-teal-500 to-teal-600",
    iconBg: "bg-teal-50 dark:bg-teal-900/20",
  },
  softskills: {
    icon: Shapes,
    title: "Soft Skills",
    slug: "softskills",
    desc: "Develop essential leadership, communication, and emotional intelligence for professional excellence.",
    color: "from-sky-500 to-sky-600",
    iconBg: "bg-sky-50 dark:bg-sky-900/20",
  },
  ai: {
    icon: Brain,
    title: "Artificial Intelligence",
    slug: "ai",
    desc: "Explore neural networks, machine learning, and generative AI to lead the next technological frontier.",
    color: "from-teal-600 to-sky-600",
    iconBg: "bg-teal-50 dark:bg-teal-900/20",
  },
  live: {
    icon: Globe,
    title: "Live Sessions",
    slug: "live",
    desc: "Join real-time learning sessions led by industry experts and academic faculty.",
    color: "from-sky-600 to-teal-500",
    iconBg: "bg-sky-50 dark:bg-sky-900/20",
  },
};

const CategoryExplore = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eliteCategories = [
      CATEGORY_METADATA.programming,
      CATEGORY_METADATA.softskills,
      CATEGORY_METADATA.ai,
      CATEGORY_METADATA.live,
    ];
    setCategories(eliteCategories);
    setLoading(false);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 dark:bg-teal-950/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-bold text-[11px] uppercase tracking-widest mb-4">
              Browse Categories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Explore Our Top Categories
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-lg">
              Choose from our curated selection of professional disciplines and start your learning journey today.
            </p>
          </motion.div>
          <Link
            href="/courses"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:gap-3 transition-all duration-300"
          >
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-72 bg-slate-50 dark:bg-slate-900/50 rounded-3xl animate-pulse border border-slate-100 dark:border-slate-800" />
              ))
            : categories.map((cat, idx) => {
                const IconComponent = cat.icon;
                const isLive = cat.slug === "live";

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
                      className="group relative block h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-400 hover:shadow-xl hover:shadow-teal-500/8 overflow-hidden"
                    >
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-sky-50/0 group-hover:from-teal-50/60 group-hover:to-sky-50/40 dark:group-hover:from-teal-950/20 dark:group-hover:to-sky-950/20 transition-all duration-500 rounded-3xl" />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-6`}>
                          <IconComponent size={24} className="text-white" strokeWidth={2.5} />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 tracking-tight">
                          {cat.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-medium">
                          {cat.desc}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                            Explore →
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-12 md:hidden">
          <Link
            href="/courses"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-teal-600/20"
          >
            Browse All Categories <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryExplore;
