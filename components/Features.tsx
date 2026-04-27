"use client";

import React from "react";
import { Sparkles, Video, Users2, ShieldCheck, Zap, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "AI-Powered Learning Paths",
      description: "Smart algorithms personalize your study plan based on your unique needs, helping you focus on the right topics at the right time.",
      icon: <Sparkles className="text-teal-600" />,
      bg: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      title: "Live Interactive Classes",
      description: "Join real-time sessions with expert instructors who provide guidance, answer questions, and ensure deep understanding of complex topics.",
      icon: <Video className="text-violet-600" />,
      bg: "bg-violet-50 dark:bg-violet-900/20"
    },
    {
      title: "Exam & GAT Preparation",
      description: "Comprehensive curricula specifically designed for entrance exams and GAT training, covering all essential modules and strategies.",
      icon: <Users2 className="text-emerald-600" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Recorded Courses 24/7",
      description: "Access high-quality prerecorded lessons anytime, anywhere, allowing for self-paced learning that fits your personal schedule.",
      icon: <Laptop className="text-cyan-600" />,
      bg: "bg-cyan-50 dark:bg-cyan-900/20"
    },
    {
      title: "Smart Performance Metrics",
      description: "Intelligent analytics provide recommendations based on your performance, ensuring you master every subject efficiently.",
      icon: <Zap className="text-rose-600" />,
      bg: "bg-rose-50 dark:bg-rose-900/20"
    },
    {
      title: "Flexible Learning Platform",
      description: "Access our adaptive education system from any device, providing a seamless and consistent learning experience globally.",
      icon: <ShieldCheck className="text-amber-600" />,
      bg: "bg-amber-50 dark:bg-amber-900/20"
    }
  ];

  return (
    <section className="section-padding bg-white dark:bg-zinc-950">
      <div className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-text italic">Platform Architecture</span>
          <h2 className="section-title italic tracking-tighter mb-6">Optimized Pedagogical Framework</h2>
          <p className="section-subtitle uppercase tracking-[0.2em] text-xs font-bold opacity-70 italic">
            Engineered for high-fidelity knowledge transfer and institutional scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-zinc-200/20 dark:shadow-none transition-transform`}>
                {React.cloneElement(feature.icon as React.ReactElement<{ size: number }>, { size: 24 })}
              </div>
              <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-3 leading-tight italic">{feature.title}</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-medium">
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
