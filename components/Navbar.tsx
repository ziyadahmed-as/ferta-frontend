"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, User as UserIcon, LogIn, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <BookOpen size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Fatra<span className="text-indigo-600">Edu</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/courses" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Courses
          </Link>
          <Link href="/instructors" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Instructors
          </Link>
          <Link href="/about" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            About
          </Link>
          
          <div className="flex items-center gap-3 ml-4">
            {user ? (
              <div className="flex items-center gap-3">
                  <Link href="/dashboard" className="px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all flex items-center gap-2">
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Link>

                  {user.role === 'ADMIN' && (
                    <Link href="/admin/dashboard" className="px-4 py-2 text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all flex items-center gap-2">
                      <ShieldCheck size={14} />
                      Governance
                    </Link>
                  )}
                <div className="h-8 w-px bg-zinc-200 dark:border-zinc-800"></div>
                <button 
                  onClick={logout}
                  className="px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-all flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-indigo-600">
                   <UserIcon size={20} />
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all flex items-center gap-2">
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link href="/register" className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all shadow-md shadow-indigo-500/10">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-zinc-600 dark:text-zinc-400">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
           <Link href="/courses" className="text-lg font-medium p-2 text-zinc-700 dark:text-zinc-300">Courses</Link>
          <Link href="/instructors" className="text-lg font-medium p-2 text-zinc-700 dark:text-zinc-300">Instructors</Link>
          <Link href="/about" className="text-lg font-medium p-2 text-zinc-700 dark:text-zinc-300">About</Link>
          <hr className="border-zinc-200 dark:border-zinc-800" />
          {user ? (
            <>
              <Link href="/dashboard" className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center font-semibold text-zinc-700 dark:text-zinc-200">Dashboard</Link>
              <button onClick={logout} className="w-full py-3 rounded-xl bg-rose-600 text-white text-center font-semibold">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center font-semibold text-zinc-700 dark:text-zinc-200">Sign In</Link>
              <Link href="/register" className="w-full py-3 rounded-xl bg-indigo-600 text-white text-center font-semibold shadow-lg shadow-indigo-500/20">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
