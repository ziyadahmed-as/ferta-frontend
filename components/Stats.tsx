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
    { label: "Active Students", value: formatCount(statsData.students_count), icon: <Users size={26} />, color: "from-teal-500 to-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20" },
    { label: "Expert Instructors", value: formatCount(statsData.instructors_count), icon: <GraduationCap size={26} />, color: "from-sky-500 to-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "Countries Served", value: statsData.countries_count + "+", icon: <Globe2 size={26} />, color: "from-teal-400 to-sky-500", bg: "bg-teal-50 dark:bg-teal-900/20" },
    { label: "Courses Available", value: formatCount(statsData.courses_count), icon: <Shapes size={26} />, color: "from-sky-400 to-teal-500", bg: "bg-sky-50 dark:bg-sky-900/20" }
  ];

  return (
    <section className="relative py-20 bg-slate-50 dark:bg-slate-900/50 px-6 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100/30 dark:bg-teal-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-100/30 dark:bg-sky-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold text-[11px] uppercase tracking-widest mb-4">
              Platform Impact
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base font-medium">
              Join a growing community of learners and educators making an impact worldwide.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group text-center p-8 bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {React.cloneElement(stat.icon as React.ReactElement<{ className: string }>, { className: "text-teal-600 dark:text-teal-400" })}
                </div>
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white block mb-2 tracking-tight">{stat.value}</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
