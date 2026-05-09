"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, GraduationCap, Users, ChevronRight } from "lucide-react";

interface RoleChoiceScreenProps {
  setRole: (role: "STUDENT" | "INSTRUCTOR") => void;
  setStep: (step: "choose" | "form") => void;
}

export const RoleChoiceScreen: React.FC<RoleChoiceScreenProps> = ({ setRole, setStep }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <BookOpen size={28} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Fatra<span className="text-cyan-600"> Academy</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-5 mb-2">Join Fatra Academy</h1>
          <p className="text-slate-500 text-base">Choose how you want to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setRole("STUDENT"); setStep("form"); }}
            className="bg-white border-2 border-slate-200 hover:border-cyan-400 hover:shadow-lg rounded-2xl p-8 text-left transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-md shadow-cyan-500/20">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">I&apos;m a Student</h2>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">
              Access thousands of courses, learn at your own pace, and achieve your educational goals.
            </p>
            <ul className="space-y-2 mb-6">
              {["Access to 250+ courses", "Learn from expert instructors", "Track your progress", "Get certificates"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-cyan-100 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl font-semibold text-sm">
              Register as Student <ChevronRight size={16} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setRole("INSTRUCTOR"); setStep("form"); }}
            className="bg-white border-2 border-slate-200 hover:border-teal-400 hover:shadow-lg rounded-2xl p-8 text-left transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-md shadow-teal-500/20">
              <Users size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">I&apos;m an Instructor</h2>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">
              Share your expertise with thousands of eager students worldwide and earn income.
            </p>
            <ul className="space-y-2 mb-6">
              {["Create unlimited courses", "Earn from your expertise", "Build your brand", "Join 500+ instructors"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold text-sm">
              Register as Instructor <ChevronRight size={16} />
            </div>
          </motion.button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};
