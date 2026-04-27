"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  User as UserIcon, LogOut, LayoutDashboard, 
  ShieldCheck, Settings, UserCircle, ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Account Settings"
        className="flex items-center gap-2 group p-1 pr-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-teal-600/30 transition-all active:scale-95"
      >
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg shadow-teal-600/20 group-hover:scale-105 transition-transform duration-300">
           {user.username?.[0].toUpperCase() || "U"}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 max-w-[80px] truncate">
          {user.username}
        </span>
        <ChevronDown size={12} className={`text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-64 bg-white dark:bg-black/90 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl shadow-zinc-950/20 py-4 z-50 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 mb-2">
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-600 mb-1">Clearance Protocol</p>
               <h4 className="text-sm font-black text-zinc-900 dark:text-white truncate italic">{user.username}</h4>
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 italic">{user.role}</p>
            </div>

            <div className="px-2">
              <DropdownLink 
                href="/dashboard" 
                icon={<LayoutDashboard size={14} />} 
                label="Operation Dashboard" 
                onClick={() => setIsOpen(false)}
              />
              <DropdownLink 
                href="/profile" 
                icon={<UserCircle size={14} />} 
                label="Identity Profile" 
                onClick={() => setIsOpen(false)}
              />
              <DropdownLink 
                href="/settings" 
                icon={<Settings size={14} />} 
                label="System Settings" 
                onClick={() => setIsOpen(false)}
              />
              
              {user.role === 'ADMIN' && (
                <DropdownLink 
                  href="/admin/dashboard" 
                  icon={<ShieldCheck size={14} />} 
                  label="Governance Center" 
                  className="text-rose-500"
                  onClick={() => setIsOpen(false)}
                />
              )}
            </div>

            <div className="mt-4 px-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
               <button 
                 onClick={() => {
                   setIsOpen(false);
                   logout();
                 }}
                 className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-500/10 transition-all italic"
               >
                 <LogOut size={14} /> Critical Exit
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DropdownLink = ({ href, icon, label, className = "", onClick }: any) => (
  <Link 
    href={href} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all italic ${className}`}
  >
    {icon} {label}
  </Link>
);
