"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
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
          <Link href="/" className="inline-block mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mx-auto">
              <Lock size={32} />
            </div>
          </Link>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter mb-4">Welcome Back</h1>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg">Continue your learning journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {isRegistered && (
            <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-3xl text-emerald-700 dark:text-emerald-400 text-sm font-bold flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-base font-black">Registration Successful!</p>
                <p className="font-medium opacity-80">Please sign in with your new credentials.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-bold animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-4 mb-2">Username</label>
            <div className="relative">
              <input
                id="username"
                type="text"
                placeholder="Your username"
                title="Username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-14 pr-6 py-5 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-3xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none text-zinc-900 dark:text-white font-medium"
              />
              <Mail className="absolute left-6 top-5 text-zinc-400" size={20} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-4 mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                title="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-14 pr-6 py-5 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-3xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none text-zinc-900 dark:text-white font-bold tracking-widest"
              />
              <Lock className="absolute left-6 top-5 text-zinc-400" size={20} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
                <>Sign In Now <ArrowRight size={24}/></>
            )}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">
            New here?{" "}
            <Link href="/register" className="text-indigo-600 font-black hover:underline underline-offset-4">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
