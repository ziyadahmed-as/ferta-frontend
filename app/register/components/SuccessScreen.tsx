"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface SuccessScreenProps {
  role: "STUDENT" | "INSTRUCTOR";
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ role }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center p-10 bg-white rounded-3xl border border-slate-200 shadow-2xl"
      >
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">You&apos;re All Set!</h1>
        <p className="text-slate-500 text-sm mb-6">
          {role === "INSTRUCTOR"
            ? "Your application has been submitted. Our team will review it shortly."
            : "Welcome to Fatra Academy! Redirecting you to sign in..."}
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl font-semibold text-sm"
        >
          Go to Login <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};
