"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large Teal Circle - Top Right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-950/30 dark:to-sky-950/30 opacity-80" />
        {/* Small Circle - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-teal-50 to-transparent dark:from-teal-950/20 dark:to-transparent opacity-60" />
        {/* Floating Dots Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0d948810_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#0d948808_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-60" />
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 via-sky-500 to-teal-600 opacity-30" />
      </div>

      {/* Navbar spacer */}
      <div className="h-[72px] absolute top-0 w-full" />

      {/* Hero Content - Split Screen Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-72px)]">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40 mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 tracking-wide uppercase">
                #1 Learning Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-6">
              Learn Without
              <span className="block mt-1">
                <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">Limits</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg font-medium">
              Access world-class courses, live interactive sessions, and AI-powered learning tools designed for your success in entrance exams and beyond.
            </p>

            {/* Feature Checks */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {["AI-Powered Study Plans", "Expert Instructors", "Live & Recorded"].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <CheckCircle2 size={18} className="text-teal-500 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                id="hero-cta-explore"
                className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-2xl font-bold text-sm transition-all shadow-xl shadow-teal-600/25 hover:shadow-teal-600/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                Explore Courses
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                id="hero-cta-register"
                className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-sm hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                <Play size={16} className="text-teal-600" />
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Image & Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Main Image Container */}
            <div className="relative w-full max-w-[540px]">
              {/* Decorative circle behind image */}
              <div className="absolute -top-6 -right-6 w-full h-full rounded-[2rem] bg-gradient-to-br from-teal-100 to-sky-100 dark:from-teal-900/20 dark:to-sky-900/20 rotate-3" />
              
              {/* Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 dark:shadow-black/30 border border-white/50 dark:border-slate-800">
                <Image
                  src="/hero-students.png"
                  alt="Fatra Academy Students"
                  width={540}
                  height={420}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>


            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z" className="fill-slate-50 dark:fill-slate-900/50" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
