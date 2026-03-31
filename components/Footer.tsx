"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Share2, MessageCircle, LifeBuoy, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-white dark:bg-black px-6 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 w-full text-center md:text-left">
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Link href="/" className="flex items-center gap-2 group mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Fatra<span className="text-indigo-600">Edu</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
              Building the future of education with AI-powered tools and global live learning experiences.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all">
                 <Share2 size={20} />
              </Link>
              <Link href="#" className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all">
                 <MessageCircle size={20} />
              </Link>
              <Link href="#" className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all">
                 <LifeBuoy size={20} />
              </Link>
            </div>
          </div>

          <div>
             <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tighter">Explore Platform</h4>
             <ul className="flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 font-medium">
               <li><Link href="/courses" className="hover:text-indigo-600 transition-colors">Course Catalog</Link></li>
               <li><Link href="/instructors" className="hover:text-indigo-600 transition-colors">Featured Instructors</Link></li>
               <li><Link href="/partners" className="hover:text-indigo-600 transition-colors">University Partners</Link></li>
               <li><Link href="/live" className="hover:text-indigo-600 transition-colors">Upcoming Live Sessions</Link></li>
               <li><Link href="/pricing" className="hover:text-indigo-600 transition-colors">Subscription Plans</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tighter">Company & Community</h4>
             <ul className="flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 font-medium">
               <li><Link href="/about" className="hover:text-indigo-600 transition-colors">About Our Vision</Link></li>
               <li><Link href="/blog" className="hover:text-indigo-600 transition-colors">Learning Blog</Link></li>
               <li><Link href="/careers" className="hover:text-indigo-600 transition-colors">Careers at FatraEdu</Link></li>
               <li><Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
               <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tighter">Stay Connected</h4>
             <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-medium">Get the latest education news and course updates delivered to your inbox.</p>
             <div className="relative group overflow-hidden rounded-3xl">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="w-full pl-6 pr-14 py-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none text-zinc-900 dark:text-white font-medium" 
                />
                <button title="Subscribe" className="absolute right-3 top-3 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
                  <ArrowRight size={20} />
                </button>
             </div>
          </div>
        </div>

        <div className="w-full pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500 dark:text-zinc-600 text-sm font-bold tracking-widest uppercase">
          <p>© 2026 FATRAEDU. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 italic lowercase font-medium tracking-normal text-zinc-400"><Mail size={14}/> support@fatraedu.com</span>
            <Link href="https://ziyadahmed.tech" className="hover:text-indigo-600">Built by Ziyad Ahmed</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
