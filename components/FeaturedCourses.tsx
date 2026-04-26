"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Users, Clock, ArrowRight } from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
  instructor_name: string;
  category_name: string;
  enrollment_count: number;
  views_count: number;
}

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses/courses/popular/").then((response) => {
      const data = Array.isArray(response.data) ? response.data : response.data.results;
      if (Array.isArray(data)) setCourses(data.slice(0, 8));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading || courses.length === 0) return null;

  return (
    <section className="section-padding bg-white dark:bg-zinc-950">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="badge-text italic">Elite Selections</span>
            <h2 className="section-title italic tracking-tighter">Featured <span className="text-transparent bg-clip-text gradient-primary">Courses</span></h2>
          </div>
          <Link href="/courses" className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal-600 hover:text-teal-700 transition-colors italic">
            Synchronize with Registry <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={`/courses/${course.slug}`}
                className="group flex flex-col bg-white dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all h-full"
              >
                {/* Thumbnail */}
                <div className="relative h-44 bg-slate-100 dark:bg-zinc-800/50 overflow-hidden">
                  <Image
                    src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {course.category_name && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-teal-600 text-white text-xs font-semibold rounded-lg">
                      {course.category_name}
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    course.price === 0 ? "bg-emerald-100 text-emerald-700" : "bg-white text-slate-800"
                  }`}>
                    {course.price === 0 ? "Free" : `${course.price} Birr`}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-2 mb-2 leading-snug transition-colors">
                    {course.title}
                  </h3>
                  {course.instructor_name && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{course.instructor_name}</p>
                  )}
                  <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={13} fill="currentColor" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">4.8</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Users size={13} />
                      <span className="text-xs">{course.enrollment_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 ml-auto">
                      <Clock size={13} />
                      <span className="text-xs">8h</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl font-semibold text-sm">
            View All Courses <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
