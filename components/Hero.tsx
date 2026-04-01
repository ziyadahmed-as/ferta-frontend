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
      <section className="relative min-h-screen flex flex-col">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
        </div>

        {/* Navbar spacer */}
        <div className="h-[72px]" />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              Explore <span className="text-indigo-600">Learning</span> Paths
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              Choose from our comprehensive range of courses designed for every stage of your educational journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95"
              >
                Browse Courses
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 border-2 border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all hover:scale-105 active:scale-95"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom spacer */}
        <div className="h-20" />
      </section>
    </>
  );
};

export default Hero;
