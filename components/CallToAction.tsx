"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Full-width Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-sky-700" />
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 font-bold text-[11px] uppercase tracking-widest mb-6">
              Start Today
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Ready to Transform Your Learning Journey?
            </h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed mb-8 max-w-lg">
              Join thousands of students who have already started their path to success with our expert-led courses and AI-powered platform.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-10">
              {[
                "Access to 100+ expert-led courses",
                "AI-powered personalized study plans",
                "Live interactive sessions with instructors",
                "Lifetime access to course materials",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-teal-300 flex-shrink-0" />
                  <span className="text-white/90 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                id="cta-get-started"
                className="group px-8 py-4 bg-white text-teal-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2.5"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
              <Image
                src="/instructor-teaching.png"
                alt="Instructor teaching on Fatra Academy"
                width={540}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold">
                  98%
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Satisfaction Rate</p>
                  <p className="text-sm font-bold text-slate-900">Student Approval</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
