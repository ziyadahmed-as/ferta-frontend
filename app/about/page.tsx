"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ShieldCheck, Zap, Globe, Users, Award, ArrowRight, MonitorPlay, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden text-center border-b border-zinc-100 dark:border-zinc-800">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-600/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
         <div className="container-max space-y-8">
            <span className="badge-text italic tracking-[0.4em]">Institutional Mission</span>
            <h1 className="section-title italic tracking-tighter leading-tight">
               Empowering the <span className="text-transparent bg-clip-text gradient-primary">Next Generation</span> of Scholars
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto italic uppercase tracking-widest text-sm font-bold opacity-70">
               Providing a premium educational ecosystem designed for academic mastery and professional excellence.
            </p>
         </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-slate-50/50 dark:bg-zinc-900/30">
         <div className="container-max grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueShard 
               icon={<ShieldCheck size={40}/>} 
               title="Validated Excellence" 
               desc="Every curriculum module is vetted by our academic board to ensure absolute accuracy and educational impact."
            />
            <ValueShard 
               icon={<Sparkles size={40}/>} 
               title="Personalized Learning" 
               desc="Utilizing AI-driven insights to synchronize learning paths with individual student goals in real-time."
            />
            <ValueShard 
               icon={<Globe size={40}/>} 
               title="Global Community" 
               desc="Connecting local talent with a global network of experts through our interactive digital classrooms."
            />
         </div>
      </section>

      {/* Institutional Statistics */}
      <section className="section-padding border-y border-zinc-100 dark:border-zinc-800">
         <div className="container-max grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            <StatItem value="500+" label="COURSES" />
            <StatItem value="120k" label="SCHOLARS" />
            <StatItem value="850" label="FACULTY" />
            <StatItem value="98%" label="SUCCESS" />
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden bg-zinc-950 text-white text-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         <div className="max-w-3xl mx-auto relative z-10 space-y-12">
            <h2 className="section-title text-white italic tracking-tighter leading-tight">Ready to Begin Your <span className="text-teal-400">Success Journey</span>?</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <Link href="/register" className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] italic shadow-2xl hover:bg-teal-500 hover:text-white transition-all w-full md:w-auto">
                  Start Learning Now
               </Link>
               <Link href="/courses" className="px-10 py-5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-2xl font-black text-xs uppercase tracking-[0.3em] italic hover:text-white transition-all w-full md:w-auto">
                  Explore Catalog
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

const ValueShard = ({ icon, title, desc }: any) => (
   <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] hover:border-teal-500/20 shadow-xl shadow-zinc-200/5 transition-all group">
      <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-teal-600/20 group-hover:rotate-6 transition-all">
         {icon}
      </div>
      <h3 className="text-xl font-black text-zinc-900 dark:text-white italic tracking-tighter mb-4">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium italic leading-relaxed opacity-80 uppercase tracking-widest">{desc}</p>
   </motion.div>
);

const StatItem = ({ value, label }: any) => (
   <div className="space-y-2">
      <h4 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter italic leading-none">{value}</h4>
      <p className="badge-text mb-0">{label}</p>
   </div>
);

export default AboutPage;
