"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_BG =
  "https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=1600";

const Hero = () => {

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
          {/* Top Gradient */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-100 dark:from-slate-900 to-transparent" />
          {/* Bottom Gradient */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
        </div>

        {/* Navbar spacer */}
        <div className="h-[72px]" />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800/50 mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 tracking-wide uppercase">
                World-Class Education
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              Master New Skills with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-700">Online Learning</span> & Accredited Programs
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              Join thousands of professionals mastering new skills through our accredited programs, interactive live sessions, and comprehensive curricula.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Explore Programs
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:border-teal-600 dark:hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:scale-105 active:scale-95"
              >
                Join as Faculty
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Trusted By Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 pt-8 border-t border-slate-200 dark:border-slate-800/50"
        >
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by professionals from leading institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Abstract institutional placeholder logos */}
             {['University Alliance', 'Tech Institute', 'Global Business School', 'Innovation Lab'].map((name, i) => (
                <div key={i} className="text-lg font-black text-slate-700 dark:text-slate-300 tracking-tighter flex items-center gap-2">
                   <div className="w-6 h-6 rounded bg-teal-600/20 flex items-center justify-center">
                     <div className="w-3 h-3 rounded-sm bg-teal-600" />
                   </div>
                   {name}
                </div>
             ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
