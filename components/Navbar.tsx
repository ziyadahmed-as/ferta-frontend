"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Bell, LogOut, ChevronDown, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN" || user.is_superuser) return "/admin/dashboard";
    if (user.role === "INSTRUCTOR") return "/instructor/dashboard";
    return "/student/dashboard";
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-sm border-b border-slate-200 dark:border-slate-800" : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <BookOpen size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">
            Fatra<span className="text-indigo-600"> Academy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/courses" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Courses
          </Link>
          <Link href="/register?role=instructor" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Teach
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                href={getDashboardLink()}
                className="hidden md:flex px-4 py-2 text-xs font-bold uppercase tracking-wider text-white gradient-primary rounded-xl hover:opacity-90 transition-all shadow-md shadow-blue-500/20 items-center gap-2"
              >
                <BookOpen size={14} />
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
              <button title="Notifications" className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-white dark:bg-slate-800"
                >
                  <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-800 dark:text-white leading-none">{user.username}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{user.role?.toLowerCase()}</p>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/10 py-2 z-50">
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <UserIcon size={15} /> Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <UserIcon size={15} /> Profile
                    </Link>
                    <hr className="my-1.5 border-slate-100 dark:border-slate-700" />
                    <button
                      onClick={() => { setProfileOpen(false); logout(); }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-xl hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 text-sm font-semibold text-white gradient-primary rounded-xl transition-all hover:opacity-90 shadow-md shadow-blue-500/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-6 flex flex-col gap-4 shadow-2xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-base font-semibold py-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800/50">Home</Link>
          <Link href="/courses" onClick={() => setIsOpen(false)} className="text-base font-semibold py-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800/50">Courses</Link>
          <Link href="/register?role=instructor" onClick={() => setIsOpen(false)} className="text-base font-semibold py-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800/50">Teach</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-base font-semibold py-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800/50">About</Link>
          
          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link href={getDashboardLink()} onClick={() => setIsOpen(false)} className="py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-black uppercase tracking-widest text-center shadow-sm">Dashboard</Link>
                <button onClick={() => { setIsOpen(false); logout(); }} className="py-3 px-4 text-red-600 border border-red-100 dark:border-red-900/30 rounded-xl text-sm font-black uppercase tracking-widest shadow-sm">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="py-3 px-4 text-center border-2 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-black uppercase tracking-widest shadow-sm">Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="py-3 px-4 text-center text-white gradient-primary rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
