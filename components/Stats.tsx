"use client";

import React, { useEffect, useState } from "react";
import { Users, GraduationCap, Globe2, Shapes } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";

const formatCount = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K+";
  }
  return num + "+";
};

const Stats = () => {
  const [statsData, setStatsData] = useState({
    students_count: 0,
    instructors_count: 0,
    countries_count: 0,
    courses_count: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/courses/courses/platform_stats/");
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching platform stats:", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Active Students", value: formatCount(statsData.students_count), icon: <Users size={28} /> },
    { label: "Expert Instructors", value: formatCount(statsData.instructors_count), icon: <GraduationCap size={28} /> },
    { label: "Countries Served", value: statsData.countries_count + "+", icon: <Globe2 size={28} /> },
    { label: "Courses Available", value: formatCount(statsData.courses_count), icon: <Shapes size={28} /> }
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="max-w-xl">
           <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 font-mono font-black">Institutional Growth Metrics</h2>
           <h3 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">Powering the <span className="text-indigo-500">Global Knowledge</span> Economy</h3>
           <p className="text-zinc-400 text-xl leading-relaxed">
             Our community is architected for rapid, high-impact growth. We provide students with the infrastructure to thrive in the modern economy and faculty with the tools to engineer successful educational businesses.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1 w-full max-w-2xl">
           {stats.map((stat, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="p-10 bg-zinc-900 border border-zinc-800/50 rounded-[2.5rem] group hover:border-indigo-500/30 transition-all duration-300"
             >
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 border border-zinc-700/50 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-white mb-3 tracking-tighter transition-colors group-hover:text-indigo-400">
                    {stat.value}
                  </span>
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
                    {stat.label}
                  </span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
