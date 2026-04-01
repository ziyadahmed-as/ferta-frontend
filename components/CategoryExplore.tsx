"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Monitor, Heart, Code2, Brain, Palette, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";

const defaultCategories = [
  { id: 1, name: "Entrance Exam & GAT Prep", slug: "entrance-exam", description: "Prepare for university entrance exams with expert guidance", icon: Brain, color: "from-indigo-500 to-violet-600", bg: "bg-indigo-50", course_count: 124 },
  { id: 2, name: "Technology Courses", slug: "technology", description: "Master modern tech skills from web dev to AI and cloud", icon: Code2, color: "from-teal-500 to-emerald-600", bg: "bg-teal-50", course_count: 56 },
  { id: 3, name: "Soft Skills", slug: "soft-skills", description: "Leadership, communication and professional development", icon: Heart, color: "from-pink-500 to-rose-600", bg: "bg-pink-50", course_count: 31 },
  { id: 4, name: "Digital Design", slug: "design", description: "UI/UX design, graphic design and visual communication", icon: Palette, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", course_count: 42 },
  { id: 5, name: "Business & Finance", slug: "business", description: "Entrepreneurship, accounting and business management", icon: Globe, color: "from-orange-500 to-amber-600", bg: "bg-orange-50", course_count: 38 },
  { id: 6, name: "Language Learning", slug: "languages", description: "Learn Arabic, English and more with native speakers", icon: BookOpen, color: "from-cyan-500 to-indigo-600", bg: "bg-cyan-50", course_count: 27 },
];

const CategoryExplore = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses/categories/").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      if (data.length > 0) setCategories(data.slice(0, 6));
      else setCategories(defaultCategories);
    }).catch(() => {
      setCategories(defaultCategories);
    }).finally(() => setLoading(false));
  }, []);

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="py-20 bg-white dark:bg-slate-800 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-indigo-600 font-semibold text-sm mb-2">Explore Categories</p>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">Browse Top Categories</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm">
              Choose from our comprehensive range of courses in multiple disciplines
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 bg-slate-100 dark:bg-slate-700 rounded-2xl animate-pulse" />
            ))
          ) : (
            displayCategories.map((cat, idx) => {
              const IconComponent = cat.icon || BookOpen;
              return (
                <motion.div
                  key={cat.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <Link
                    href={`/courses?category=${cat.slug || cat.name}`}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl ${cat.bg || "bg-slate-50"} dark:bg-slate-700/50 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700/40 hover:shadow-md transition-all group text-center`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${cat.color || "from-indigo-500 to-violet-600"} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">{cat.name}</p>
                      {cat.course_count && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cat.course_count} courses</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            View all categories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryExplore;
