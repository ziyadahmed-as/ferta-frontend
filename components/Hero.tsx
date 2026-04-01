"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
  course_count?: number;
}

const HERO_BG =
  "https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=1600";

const Hero = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get("/courses/categories/").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setCategories(data.slice(0, 3));
    }).catch(() => {});
  }, []);

  const defaultCategories = [
    { id: 1, name: "Entrance Exam & GAT Preparation", slug: "entrance-exam", course_count: 124 },
    { id: 2, name: "Technology Courses", slug: "technology", course_count: 56 },
    { id: 3, name: "Soft Skills", slug: "soft-skills", course_count: 31 },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Navbar spacer */}
        <div className="h-[72px]" />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Explore <span className="text-indigo-600">Learning</span> Paths
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              Choose from our comprehensive range of courses designed for every stage of your educational journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95"
              >
                Browse Courses
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 border-2 border-indigo-200 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Category Cards overlapping hero bottom */}
        <div className="relative z-10 pb-0">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
            {displayCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <Link
                  href={`/courses?category=${cat.slug}`}
                  className="block bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-slate-900 font-bold text-base mb-1 group-hover:text-indigo-600 transition-colors">{cat.name}</h3>
                      <p className="text-slate-500 text-sm font-medium">{cat.course_count || "—"} Courses</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 shadow-inner">
                      {idx === 0 ? "📚" : idx === 1 ? "💻" : "🎯"}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
