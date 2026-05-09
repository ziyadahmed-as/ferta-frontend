"use client";

import React from "react";
import { Plus, Tag, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface CategoriesModuleProps {
  categories: any[];
  setShowAddCategoryModal: (show: boolean) => void;
  setEditCategory: (category: any) => void;
  setShowEditCategoryModal: (show: boolean) => void;
  handleDeleteCategory: (categoryId: number) => void;
}

export const CategoriesModule: React.FC<CategoriesModuleProps> = ({
  categories,
  setShowAddCategoryModal,
  setEditCategory,
  setShowEditCategoryModal,
  handleDeleteCategory,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="welcome-banner p-6 rounded-2xl flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Categories</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Manage course topics and taxonomy</p>
          </div>
          <div className="bg-white/50 dark:bg-slate-700/50 px-4 py-2 rounded-xl border border-white/20">
            <p className="text-[10px] uppercase font-bold text-slate-500">Categories</p>
            <p className="text-xl font-black text-teal-600">{categories.length}</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddCategoryModal(true)}
          className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat: any, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all border-b-4 border-b-teal-500"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                <Tag size={24} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setEditCategory(cat); setShowEditCategoryModal(true); }} 
                  title="Edit Category"
                  className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteCategory(cat.id)} 
                  title="Delete Category"
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight line-clamp-1">{cat.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-6 line-clamp-2 h-8 italic">
              {cat.description || "Administrative taxonomy node for intellectual indexing."}
            </p>
            
            <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Node Count</span>
                <span className="text-lg font-black text-teal-600">{cat.node_count || 0}</span>
              </div>
              <div className="px-3 py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Active</span>
              </div>
            </div>
          </motion.div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[48px] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <Tag size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium tracking-tight">Taxonomy Registry Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};
