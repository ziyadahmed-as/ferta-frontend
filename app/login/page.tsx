"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const LoginPage = () => {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(formData);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-6 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 dark:from-indigo-900/10 to-transparent -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 p-10 md:p-16 shadow-2xl shadow-indigo-500/5"
      >
        <div className="text-center mb-12">
          <Link href="/" className="flex flex-col items-center gap-4 group mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <BookOpen size={32} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white italic">Fatra<span className="text-indigo-600">Edu</span></span>
          </Link>
          <h1 className="text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white tracking-tighter mb-2 italic">Welcome Back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm italic opacity-80 uppercase tracking-widest">Continue your learning journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {isRegistered && (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-[2rem] text-emerald-700 dark:text-emerald-400 text-sm font-bold flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest italic">Registration Successful!</p>
                <p className="text-[10px] font-medium opacity-80 uppercase tracking-tighter mt-1 italic">Sign in with your new credentials</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-bold animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 ml-4 mb-1 italic font-mono">Username</label>
            <div className="relative group">
              <input
                id="username"
                type="text"
                placeholder="Institutional ID"
                title="Username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none text-zinc-900 dark:text-white text-sm font-medium placeholder:italic placeholder:opacity-50"
              />
              <Mail className="absolute left-6 top-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 ml-4 mb-1 italic font-mono">Access Key</label>
            <div className="relative group">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                title="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none text-zinc-900 dark:text-white text-sm font-black tracking-[0.5em] placeholder:tracking-normal placeholder:italic placeholder:opacity-50"
              />
              <Lock className="absolute left-6 top-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 mt-4 italic"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Initialize Session <ArrowRight size={20}/></>
            )}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest italic">
            First Protocol?{" "}
            <Link href="/register" className="text-indigo-600 font-black hover:underline underline-offset-4">Create Node</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
