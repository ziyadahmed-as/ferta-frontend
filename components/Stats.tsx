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
    <section className="section-padding relative overflow-hidden bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-slate-800">
      <div className="container-max">
        <div className="text-center mb-16 relative z-10">
          <span className="badge-text italic">Global Scholarly Metrics</span>
          <h2 className="section-title italic tracking-tighter mb-4">Institutional <span className="text-transparent bg-clip-text gradient-primary">Impact Data</span></h2>
          <p className="section-subtitle max-w-xl mx-auto uppercase tracking-widest text-[10px] font-black opacity-60">Synchronizing excellence across thousands of knowledge nodes worldwide.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-4">
                    {stat.icon}
                </div>
                <span className="text-3xl font-black text-zinc-900 dark:text-white block mb-1 tracking-tighter">{stat.value}</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
              </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
