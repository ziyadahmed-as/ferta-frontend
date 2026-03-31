"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Users, ArrowUpRight, Award, Zap } from "lucide-react";
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
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/courses/popular/");
        const data = Array.isArray(response.data) ? response.data : response.data.results;
        if (Array.isArray(data)) {
          // Take 4-8 (next batch of popular)
          setCourses(data.slice(4, 9));
        }
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading || courses.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-16">
           <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800 self-start">
              <Award size={14} className="fill-current" />
              Featured Selection
           </div>
           <h2 className="text-4xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">
             Next top popular <span className="text-indigo-600">featured courses</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {courses.map((course, idx) => (
             <motion.div
               key={course.id}
               initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="group relative flex flex-col sm:flex-row bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800/50 p-6 gap-8 hover:bg-white dark:hover:bg-zinc-900 hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500"
             >
                <div className="relative w-full sm:w-56 h-56 sm:h-auto rounded-[1.5rem] overflow-hidden shrink-0">
                  <Image 
                    src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                    {course.category_name}
                  </div>
                </div>

                <div className="flex flex-col justify-center flex-1">
                   <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                         <Zap size={12} fill="currentColor" /> Trending Now
                      </div>
                      <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                      <span className="text-xs font-bold text-zinc-500">{course.views_count} views</span>
                   </div>

                   <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 line-clamp-2 leading-[1.1] group-hover:text-indigo-600 transition-colors">
                     {course.title}
                   </h3>

                   <div className="flex items-center gap-6 mb-8 text-zinc-500 font-medium text-sm">
                      <div className="flex items-center gap-2">
                        <Users size={16} /> <span>{course.enrollment_count || 0} enrolled</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                         <Star size={16} fill="currentColor" /> <span className="font-bold">4.8</span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between mt-auto">
                      <span className="text-3xl font-black text-zinc-900 dark:text-white">
                        ${course.price || "Free"}
                      </span>
                      <Link href={`/courses/${course.slug}`} className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-sm flex items-center gap-2 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl shadow-zinc-900/10 active:scale-95">
                         Enroll Now <ArrowUpRight size={18} />
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

export default FeaturedCourses;
