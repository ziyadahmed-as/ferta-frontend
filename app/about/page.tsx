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
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
         <div className="max-w-4xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-950 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl italic">
               Institutional Mission Brief
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter italic leading-tight">
               Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Future of Knowledge</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium italic max-w-2xl mx-auto opacity-80 leading-relaxed uppercase tracking-widest">
               Deploying a high-fidelity educational ecosystem designed for technical mastery and institutional excellence.
            </motion.p>
         </div>
      </section>

      {/* Core Values / Shards */}
      <section className="py-32 px-6 bg-white dark:bg-zinc-900/30">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueShard 
               icon={<ShieldCheck size={40}/>} 
               title="Validated Excellence" 
               desc="Every curriculum node is vetted by our governance board to ensure absolute technical accuracy and educational impact."
            />
            <ValueShard 
               icon={<Zap size={40}/>} 
               title="Adaptive Pedagogy" 
               desc="Utilizing AI cognitive models to synchronize learning paths with individual scholar trajectories in real-time."
            />
            <ValueShard 
               icon={<Globe size={40}/>} 
               title="Global Reach" 
               desc="Connecting localized expertise with a global network of scholars through our decentralized knowledge nodes."
            />
         </div>
      </section>

      {/* Institutional Statistics */}
      <section className="py-32 px-6 border-y border-zinc-100 dark:border-zinc-800">
         <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            <StatItem value="500+" label="Knowledge Nodes" />
            <StatItem value="120k" label="Active Scholars" />
            <StatItem value="850" label="Vetted Faculty" />
            <StatItem value="98%" label="Success Signal" />
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden bg-zinc-950 text-white text-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
         <div className="max-w-3xl mx-auto relative z-10 space-y-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight">Ready to Initialize Your <span className="text-indigo-400">Mastery Sequence</span>?</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <Link href="/register" className="px-10 py-5 bg-white text-black rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] italic shadow-2xl hover:bg-indigo-500 hover:text-white transition-all w-full md:w-auto">
                  Initialize Enrollment
               </Link>
               <Link href="/courses" className="px-10 py-5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] italic hover:text-white transition-all w-full md:w-auto">
                  Explore Registry
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

const ValueShard = ({ icon, title, desc }: any) => (
   <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[4rem] hover:border-indigo-500/20 shadow-xl shadow-zinc-200/5 transition-all group">
      <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-600/20 group-hover:rotate-6 transition-all">
         {icon}
      </div>
      <h3 className="text-xl font-black text-zinc-900 dark:text-white italic tracking-tighter mb-4">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium italic leading-relaxed opacity-80 uppercase tracking-widest">{desc}</p>
   </motion.div>
);

const StatItem = ({ value, label }: any) => (
   <div className="space-y-2">
      <h4 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter italic leading-none">{value}</h4>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 italic">{label}</p>
   </div>
);

export default AboutPage;
