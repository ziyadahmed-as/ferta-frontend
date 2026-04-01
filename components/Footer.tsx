"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Share2, MessageCircle, Globe, ExternalLink, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">EduTech</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Building the future of education with comprehensive courses for every stage of your learning journey.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, MessageCircle, Globe, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" title="Social link" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Courses</h4>
            <ul className="space-y-3">
              {["All Courses", "Entrance Exam Prep", "Technology", "Soft Skills", "Certifications"].map((item) => (
                <li key={item}>
                  <Link href="/courses" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Teach on EduTech", href: "/register?role=instructor" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest updates on new courses and features.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-4 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="absolute right-2 top-2 w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
                <ArrowRight size={14} />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Mail size={13} />
              support@edutech.com
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 EduTech. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
