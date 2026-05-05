"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Share2, MessageCircle, Globe, ExternalLink, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <BookOpen size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Fatra<span className="text-teal-400">Academy</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
              Building the future of education with comprehensive courses for every stage of your learning journey.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, MessageCircle, Globe, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  title="Social link"
                  className="w-9 h-9 bg-slate-800 hover:bg-teal-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/50"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Courses</h4>
            <ul className="space-y-3">
              {["All Courses", "Entrance Exam Prep", "Technology", "Soft Skills", "Certifications"].map((item) => (
                <li key={item}>
                  <Link href="/courses" className="text-sm text-slate-400 hover:text-teal-400 transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Teach on Fatra Academy", href: "/register?role=instructor" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-teal-400 transition-colors font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest updates on new courses and features.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-4 pr-12 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-all"
              />
              <button
                title="Subscribe to newsletter"
                className="absolute right-2 top-2 w-9 h-9 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Mail size={13} />
              support@fatraacademy.com
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Fatra Academy. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
