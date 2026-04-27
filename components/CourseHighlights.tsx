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
      } catch (error) {
        console.error("Error fetching popular courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-zinc-950 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-48 h-8 bg-white dark:bg-zinc-800 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="h-96 bg-white dark:bg-zinc-800 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="badge-text italic">Curated Excellence</span>
            <h2 className="section-title italic tracking-tighter mb-6">Mastery Highlights</h2>
            <p className="section-subtitle uppercase tracking-[0.2em] text-[10px] font-black opacity-60 italic">Synchronizing academic rigor with professional trajectory through elite programs.</p>
          </div>
          <Link href="/courses" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal-600 hover:gap-4 transition-all duration-300 italic">
            Synchronize All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 sm:p-8 lg:p-10 bg-white dark:bg-zinc-900/50 rounded-[2.5rem] lg:rounded-[3rem] border border-zinc-200 dark:border-zinc-800 hover:border-teal-600/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white border border-white/20">
                    {course.category_name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500">
                  <PlayCircle size={48} className="text-white drop-shadow-xl" />
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-xs font-bold text-zinc-500">{course.rating || 4.9} (120+)</span>
                </div>

                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2 leading-tight transition-colors">
                  {course.title}
                </h4>

                <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-500 text-sm mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Users size={16} />
                    <span>{course.enrollment_count} Students</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock size={16} />
                    <span>8 Weeks</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-teal-600 uppercase tracking-tighter">Lifetime access</span>
                    <span className="text-2xl font-black text-zinc-900 dark:text-white">
                      {course.price ? `${course.price} Birr` : "Free"}
                    </span>
                  </div>
                  <Link href={`/courses/${course.slug}`} className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black hover:bg-teal-600 dark:hover:bg-teal-600 transition-all duration-300">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseHighlights;
