"use client";

import React from "react";
import { ArrowRight, Video, Target, Heart, Zap, Sparkles, MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const businessCategories = [
  {
    id: "live",
    name: "Live Tutorial Hub",
    type: "LIVE_TUTORIAL",
    description: "Real-time interactive sessions with expert mentors and industry leaders.",
    icon: <Video size={36} />,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    shadow: "shadow-blue-500/20",
    courses: "50+ Active Streams"
  },
  {
    id: "hard",
    name: "Hard Skill (Pre-recorded Adaptive)",
    type: "HARD_SKILL_RECORDED",
    description: "Intensive technical training with AI-powered progress tracking and adaptivity.",
    icon: <MonitorPlay size={36} />,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    shadow: "shadow-emerald-500/20",
    courses: "200+ Specialized Paths"
  },
  {
    id: "soft",
    name: "Soft Skill Mastery",
    type: "SOFT_SKILL",
    description: "Professional development, leadership, and communication for modern careers.",
    icon: <Sparkles size={36} />,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-900/10",
    shadow: "shadow-amber-500/20",
    courses: "120+ Leadership Programs"
  }
];

const CategoryExplore = () => {
  return (
    <section className="py-24 bg-white dark:bg-black px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20"
           >
             Strategic Educational Frameworks
           </motion.div>
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter leading-tight"
           >
             Integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Knowledge Verticals</span>
           </motion.h2>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium"
           >
             A complete suite of modern tools designed for instructors to build successful courses and for students to have a world-class learning experience.
           </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-full"
            >
              <Link href={`/courses?type=${cat.type}`}>
                 <div className={`p-10 rounded-[3rem] h-full ${cat.bg} border-2 border-transparent hover:border-indigo-500/20 shadow-sm hover:shadow-2xl hover:${cat.shadow} transition-all duration-500 group-hover:-translate-y-3 flex flex-col items-start gap-8 relative overflow-hidden backdrop-blur-sm`}>
                    
                    {/* Floating Background Icon for Texture */}
                    <div className="absolute -top-6 -right-6 text-zinc-900/5 dark:text-white/5 group-hover:text-indigo-600/10 transition-colors duration-500 scale-[2.5]">
                       {cat.icon}
                    </div>

                    {/* Icon Container */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${cat.color} rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10 transition-transform duration-500 group-hover:rotate-6`}>
                      {cat.icon}
                    </div>

                    <div className="flex-1 relative z-10">
                       <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 leading-tight">
                         {cat.name}
                       </h3>
                       <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg leading-relaxed mb-6">
                         {cat.description}
                       </p>
                       <div className="inline-flex items-center gap-2 px-4 py-1 bg-white dark:bg-black/50 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-black text-indigo-600 dark:text-indigo-400">
                          <Zap size={14} className="fill-current" />
                          {cat.courses}
                       </div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-all duration-500 absolute bottom-10 right-10 opacity-0 lg:opacity-100 translate-y-4 lg:group-hover:translate-y-0">
                       <ArrowRight size={24} />
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

export default CategoryExplore;
