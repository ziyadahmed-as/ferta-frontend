"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Share2, MessageCircle, Globe, ExternalLink, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 text-slate-600 dark:text-slate-400 pt-20 pb-12 px-6 border-t border-slate-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <BookOpen size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Fatra<span className="text-teal-600"> Academy</span></span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
              Building the future of education with comprehensive courses for every stage of your learning journey.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, MessageCircle, Globe, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" title="Social link" className="w-9 h-9 bg-slate-50 dark:bg-zinc-900 hover:bg-teal-600 dark:hover:bg-teal-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100 dark:border-zinc-800">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-widest">Courses</h4>
            <ul className="space-y-3">
              {["All Courses", "Entrance Exam Prep", "Technology", "Soft Skills", "Certifications"].map((item) => (
                <li key={item}>
                  <Link href="/courses" className="text-sm text-slate-500 hover:text-teal-600 transition-colors font-medium">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Teach on Fatra Academy", href: "/register?role=instructor" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-500 hover:text-teal-600 transition-colors font-medium">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-widest">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest updates on new courses and features.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white dark:focus:bg-zinc-800 transition-all"
              />
              <button title="Subscribe to newsletter" className="absolute right-2 top-2 w-9 h-9 gradient-primary rounded-lg flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Mail size={13} />
              support@fatraacademy.com
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Fatra Academy. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
