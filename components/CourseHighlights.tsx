"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Users, Clock, ArrowRight, PlayCircle } from "lucide-react";
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
  rating: number;
  enrollment_count: number;
}

const CourseHighlights = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/courses/popular/");
        const coursesData = Array.isArray(response.data) ? response.data : response.data.results;
        if (Array.isArray(coursesData)) {
          setCourses(coursesData.slice(0, 4));
        }
      } catch (error: any) {
        // Professional Error Protocol: Categorize synchronized delivery failure
        const errorContext = {
          hub: "Popular Courses Feed",
          status: error.response?.status || "SIGNAL_LOST",
          message: error.message || "Endpoint Unreachable",
          code: error.code || "ERR_NETWORK"
        };
        
        console.error(`[Fatra System] Operational Signal Lost:`, JSON.stringify(errorContext, null, 2));
        
        // Ensure UI stability during outages
        setCourses([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-48 h-8 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="h-96 bg-slate-50 dark:bg-slate-800 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50 dark:bg-sky-950/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold text-[11px] uppercase tracking-widest mb-4">
              Most Popular
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Top Rated Courses
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-lg">
              Handpicked courses loved by students across the globe.
            </p>
          </motion.div>
          <Link
            href="/courses"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:gap-3 transition-all duration-300"
          >
            View All Courses <ArrowRight size={16} />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/courses/${course.slug}`}
                className="group flex flex-col bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-xl hover:shadow-teal-500/8 transition-all duration-400 h-full hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-xs font-bold text-slate-800 dark:text-white">
                      {course.category_name}
                    </span>
                  </div>
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      course.price === 0
                        ? "bg-teal-500 text-white"
                        : "bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white"
                    }`}>
                      {course.price === 0 ? "Free" : `${course.price} Birr`}
                    </span>
                  </div>
                  {/* Hover Play Overlay */}
                  <div className="absolute inset-0 bg-teal-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <PlayCircle size={48} className="text-white drop-shadow-xl" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{course.rating || 4.9}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 mb-2 leading-snug">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  {course.instructor_name && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">by {course.instructor_name}</p>
                  )}

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Users size={14} />
                      <span className="text-xs font-medium">{course.enrollment_count} Students</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 ml-auto">
                      <Clock size={14} />
                      <span className="text-xs font-medium">8 Weeks</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseHighlights;
