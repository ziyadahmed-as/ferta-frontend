"use client";

import React from "react";
import Image from "next/image";
import { MoveRight, Star, CheckCircle2, Trophy, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden bg-white dark:bg-black">
      {/* Background Blobs */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold tracking-wide mb-8 border border-indigo-100 dark:border-indigo-800"
          >
            <Star size={16} className="fill-indigo-600 dark:fill-indigo-400 border-none" />
            <span>Over 2,000+ courses listed</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-8"
          >
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600">Future</span> with Fatra Edu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
          >
            Join the most comprehensive learning platform featuring AI-assisted course building and integrated live streaming. Start your journey today and learn from industry leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98]">
              Browse Courses
              <MoveRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold text-lg border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Become Instructor
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-zinc-500 dark:text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="text-sm font-medium">Expert Tutors</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" />
              <span className="text-sm font-medium">Certification</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-sky-500" />
              <span className="text-sm font-medium">Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-indigo-500" />
              <span className="text-sm font-medium">AI Powered</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="flex-1 relative hidden lg:block"
        >
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-indigo-600/10 rounded-3xl blur-2xl group-hover:bg-indigo-600/20 transition-all duration-500" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800 shadow-2xl transition-all duration-500 group-hover:rotate-y-[-2deg] group-hover:rotate-x-[1deg]">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Learning Dashboard"
                width={800}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              
              {/* Floating Cards */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-black/90 backdrop-blur shadow-2xl p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800 group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">F</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">Learn to Code AI</h4>
                    <p className="text-xs text-zinc-500">Industry Standard Course</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-2">
                   <div className="h-full w-[70%] bg-indigo-600 rounded-full" />
                </div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-right">70% PROGRESSED</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
