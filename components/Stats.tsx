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
    <section className="py-20 px-6 relative overflow-hidden stats-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Trusted by Thousands of Learners</h2>
          <p className="text-blue-100 text-sm max-w-md mx-auto">Join our growing community of students and instructors worldwide</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
             >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                    {stat.icon}
                </div>
                <span className="text-3xl font-bold text-white block mb-1">{stat.value}</span>
                <span className="text-blue-100 text-sm">{stat.label}</span>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
