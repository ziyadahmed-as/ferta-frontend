"use client";

import React from "react";
import { Sparkles, Video, Users2, ShieldCheck, Zap, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "AI-Powered Learning Paths",
      description: "Smart algorithms personalize your study plan based on your unique needs, helping you focus on the right topics at the right time.",
      icon: <Sparkles size={24} />,
      color: "from-teal-500 to-teal-600",
      bg: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      title: "Live Interactive Classes",
      description: "Join real-time sessions with expert instructors who provide guidance, answer questions, and ensure deep understanding.",
      icon: <Video size={24} />,
      color: "from-sky-500 to-sky-600",
      bg: "bg-sky-50 dark:bg-sky-900/20",
    },
    {
      title: "Exam & GAT Preparation",
      description: "Comprehensive curricula specifically designed for entrance exams and GAT training, covering all essential modules.",
      icon: <Users2 size={24} />,
      color: "from-teal-600 to-sky-500",
      bg: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      title: "Recorded Courses 24/7",
      description: "Access high-quality prerecorded lessons anytime, anywhere, for self-paced learning that fits your schedule.",
      icon: <Laptop size={24} />,
      color: "from-sky-600 to-teal-500",
      bg: "bg-sky-50 dark:bg-sky-900/20",
    },
    {
      title: "Smart Performance Metrics",
      description: "Intelligent analytics provide recommendations based on your performance, ensuring you master every subject.",
      icon: <Zap size={24} />,
      color: "from-teal-500 to-sky-600",
      bg: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      title: "Flexible Learning Platform",
      description: "Access our adaptive education system from any device, providing a seamless learning experience globally.",
      icon: <ShieldCheck size={24} />,
      color: "from-sky-500 to-teal-600",
      bg: "bg-sky-50 dark:bg-sky-900/20",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-teal-50/50 to-transparent dark:from-teal-950/10 dark:to-transparent rounded-full blur-3xl -translate-y-1/2 opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-bold text-[11px] uppercase tracking-widest mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-xl mx-auto">
              Our platform provides the tools, resources, and support for effective learning outcomes.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-400 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 text-white group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
