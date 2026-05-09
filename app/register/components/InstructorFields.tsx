"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Globe, FileText } from "lucide-react";
import { SectionHeader, FormField } from "./FormFields";

interface InstructorFieldsProps {
  role: "STUDENT" | "INSTRUCTOR";
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  cvFile: File | null;
  setCvFile: (file: File | null) => void;
}

export const InstructorFields: React.FC<InstructorFieldsProps> = ({ role, formData, handleChange, cvFile, setCvFile }) => {
  return (
    <AnimatePresence>
      {role === "INSTRUCTOR" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="mb-8 pt-8 border-t border-slate-100">
            <SectionHeader number="03" title="Professional Details" color="bg-sky-600" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Expertise */}
              <FormField
                icon={<Briefcase size={18} />}
                label="Primary Expertise"
                id="expertise"
                required
                name="expertise"
                placeholder="e.g. Full Stack Development"
                value={formData.expertise}
                onChange={handleChange}
              />

              {/* Education Level */}
              <FormField
                label="Education Level"
                id="education_level"
                name="education_level"
                placeholder="BSc, MSc, PhD, etc."
                value={formData.education_level}
                onChange={handleChange}
              />

              {/* Years of Experience */}
              <FormField
                label="Years of Experience"
                id="years_of_experience"
                type="number"
                name="years_of_experience"
                placeholder="0"
                value={formData.years_of_experience}
                onChange={handleChange}
              />

              {/* Instructor Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="instructor_type" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Instructor Type
                </label>
                <div className="relative">
                  <select
                    id="instructor_type"
                    name="instructor_type"
                    value={formData.instructor_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all appearance-none cursor-pointer"
                  >
                    <option value="VIDEO_CREATOR">🎬 Video Creator</option>
                    <option value="LIVE_STREAMER">📡 Live Streamer</option>
                    <option value="BOTH">🎯 Both</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-3.5 text-slate-400">▾</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">How will you primarily deliver your courses?</p>
              </div>

              {/* Website */}
              <FormField
                icon={<Globe size={18} />}
                label="Professional Website"
                id="website"
                type="text"
                name="website"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={handleChange}
              />

              {/* Portfolio */}
              <FormField
                icon={<Globe size={18} />}
                label="Portfolio Link"
                id="portfolio"
                type="text"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={handleChange}
              />

              {/* Bio */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="bio" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  placeholder="Tell students about your background and teaching style..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 resize-none transition-all"
                />
              </div>

              {/* CV Upload */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cv_file" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  CV / Resume <span className="normal-case font-normal text-slate-400">(PDF, DOC)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    id="cv_file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer transition-all"
                  />
                </div>
                {cvFile && (
                  <p className="text-xs text-emerald-600 mt-0.5">✓ {cvFile.name}</p>
                )}
              </div>

              {/* Proposed Courses */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="proposed_courses" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Proposed Courses
                </label>
                <textarea
                  id="proposed_courses"
                  name="proposed_courses"
                  rows={3}
                  placeholder="What courses are you planning to teach? e.g. Python for Beginners, Advanced SQL..."
                  value={formData.proposed_courses}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 resize-none transition-all"
                />
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
