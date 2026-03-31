"use client";

import React from "react";
import { Sparkles, Video, Users2, ShieldCheck, Zap, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "AI Course Builder",
      description: "Generate structured curriculums and lesson descriptions in seconds using our integrated AI tools.",
      icon: <Sparkles className="text-indigo-600" />,
      bg: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      title: "Live Streaming",
      description: "Host real-time interactive classes with students around the globe with high-quality video support.",
      icon: <Video className="text-blue-600" />,
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Student Community",
      description: "Engagement focused forums and groups to help students learn together and solve challenges.",
      icon: <Users2 className="text-emerald-600" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Secure Payments",
      description: "Integrated with Stripe for safe and smooth transitions, supporting multiple global currencies.",
      icon: <ShieldCheck className="text-amber-600" />,
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Course Analytics",
      description: "Detailed insights for instructors on student progress, engagement, and revenue generation.",
      icon: <Zap className="text-rose-600" />,
      bg: "bg-rose-50 dark:bg-rose-900/20"
    },
    {
      title: "Multi-device Learning",
      description: "Responsive platform optimized for mobile, tablet, and desktop for learning on the go.",
      icon: <Laptop className="text-sky-600" />,
      bg: "bg-sky-50 dark:bg-sky-900/20"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4">Core Platform Features</h2>
          <h3 className="text-4xl lg:text-6xl font-black text-zinc-900 dark:text-white mb-8 tracking-tighter">Everything you need to <span className="text-indigo-600 italic">Teach and Learn</span></h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-xl leading-relaxed">
            A complete suite of modern tools designed for instructors to build successful courses and for students to have a world-class learning experience.
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
              className="p-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 hover:border-indigo-600/30 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-zinc-200/20 dark:shadow-none`}>
                {React.cloneElement(feature.icon as React.ReactElement<{ size: number }>, { size: 32 })}
              </div>
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">{feature.title}</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
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
