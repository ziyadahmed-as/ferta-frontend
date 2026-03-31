"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star, CheckCircle2, Trophy, Clock, ArrowRight, BookOpen } from "lucide-react";
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-4 drop-shadow-sm font-mono">Precision-Engineered Learning</h2>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white leading-[1.1] tracking-tighter mb-6 italic">
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Skill Acquisition</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed opacity-80">
              Accelerating the digital transformation of professional skills through AI-orchestrated education and real-time mentor synchronization.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href="/courses" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 group">
                Initialize Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/register?role=instructor" className="px-6 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:border-indigo-600/30">
                 Join Our Faculty <BookOpen size={18} />
              </Link>
            </div>
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
