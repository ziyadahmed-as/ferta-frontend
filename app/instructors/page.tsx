"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Users, Search, Award, BookOpen, Star, Mail, Globe, ArrowRight, Loader2, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const InstructorsCatalog = () => {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get("/users/instructors/");
        setInstructors(res.data);
      } catch (err) {
        console.error("Instructors fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const filteredInstructors = instructors.filter(inst => 
    inst.username.toLowerCase().includes(search.toLowerCase()) || 
    inst.expertise?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header Module */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2 block font-mono italic">Faculty Node Registry</span>
              <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white tracking-tighter italic">
                 Vetted Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Architects</span>
              </h1>
           </motion.div>
           <p className="text-zinc-500 font-medium text-sm max-w-sm italic opacity-80 uppercase tracking-widest text-right">
              Global scholars and industry masters driving institutional excellence.
           </p>
        </div>

        {/* Global Search Signal */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 p-6 rounded-[3rem] mb-16 shadow-2xl shadow-zinc-200/10">
           <div className="relative group">
              <Search className="absolute left-8 top-5 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Synchronize with faculty nodes..." 
                title="Search Faculty"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-20 pr-8 py-5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-[2rem] focus:ring-4 focus:ring-indigo-600/10 outline-none font-medium transition-all text-lg italic tracking-tight"
              />
           </div>
        </div>

        {/* Faculty Grid */}
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1,2,3,4,5,6,7,8].map(i => (
                   <div key={i} className="h-96 bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] animate-pulse" />
                ))}
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
               {filteredInstructors.map((inst, i) => (
                 <motion.div
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ delay: i * 0.05 }}
                   key={inst.id}
                   className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3.5rem] p-8 hover:border-indigo-600/30 transition-all flex flex-col items-center text-center shadow-xl shadow-zinc-200/10 relative overflow-hidden"
                 >
                    {/* Brand Shard */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -z-10 group-hover:bg-indigo-500/10 transition-colors" />
                    
                    <div className="w-32 h-32 bg-zinc-100 dark:bg-zinc-800 rounded-[2.5rem] flex items-center justify-center text-zinc-900 dark:text-white font-black text-5xl mb-8 shadow-2xl group-hover:scale-105 transition-transform duration-500 italic border-4 border-white dark:border-zinc-900 overflow-hidden relative">
                        {inst.profile_image ? (
                             <Image fill src={inst.profile_image} alt={inst.username} className="object-cover" />
                        ) : (
                             inst.username[0].toUpperCase()
                        )}
                    </div>
                    
                    <div className="mb-6">
                       <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter italic mb-1 uppercase tracking-[0.05em]">{inst.username}</h3>
                       <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] font-mono mb-4 italic">{inst.expertise || "Institutional Faculty"}</p>
                       <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-6">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <span className="text-[10px] font-black text-zinc-400 ml-2">(4.9)</span>
                       </div>
                    </div>
                    
                    <div className="w-full pt-8 border-t border-zinc-50 dark:border-zinc-800/50 flex flex-col gap-4 mt-auto">
                        <div className="flex items-center justify-around text-zinc-400">
                             <div className="flex flex-col items-center">
                                  <span className="text-lg font-black text-zinc-900 dark:text-white italic tracking-tighter">12k</span>
                                  <span className="text-[8px] font-black uppercase tracking-widest">Scholars</span>
                             </div>
                             <div className="w-px h-8 bg-zinc-100 dark:bg-zinc-800" />
                             <div className="flex flex-col items-center">
                                  <span className="text-lg font-black text-zinc-900 dark:text-white italic tracking-tighter">48</span>
                                  <span className="text-[8px] font-black uppercase tracking-widest">Artifacts</span>
                             </div>
                        </div>
                        
                        <Link href={`/instructors/${inst.id}`} className="mt-4 w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center gap-2 group/btn font-black text-[9px] uppercase tracking-[0.3em] italic shadow-xl shadow-zinc-950/10 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all">
                             Profile Node <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
            
            {!loading && filteredInstructors.length === 0 && (
               <div className="col-span-full py-32 text-center">
                  <Cpu size={64} className="mx-auto text-zinc-200 mb-6 animate-pulse" />
                  <p className="text-zinc-500 font-black uppercase tracking-widest italic">No Faculty Shards Synchronized With Current Query.</p>
               </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default InstructorsCatalog;
