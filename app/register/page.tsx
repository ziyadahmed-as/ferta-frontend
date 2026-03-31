"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Briefcase, GraduationCap, Link as LinkIcon, FileText, Loader2, ArrowRight, Globe, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const RegisterPage = () => {
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [role, setRole] = useState<"STUDENT" | "INSTRUCTOR">("STUDENT");
  const [isRoleLocked, setIsRoleLocked] = useState(false);

  useEffect(() => {
    const paramRole = searchParams.get("role")?.toUpperCase();
    if (paramRole === "INSTRUCTOR" || paramRole === "STUDENT") {
      setRole(paramRole as "STUDENT" | "INSTRUCTOR");
      setIsRoleLocked(true);
    }
  }, [searchParams]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    expertise: "",
    education_level: "",
    years_of_experience: 0,
    bio: "",
    linkedin: "",
    portfolio: "",
    proposed_courses: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "years_of_experience" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submissionData = new FormData();
    submissionData.append("role", role);
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value.toString());
    });
    
    if (cvFile && role === "INSTRUCTOR") {
      submissionData.append("cv_file", cvFile);
    }

    try {
      await register(submissionData);
      setSuccess(true);
      // Wait 3 seconds then redirect to login
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data || { detail: "Registration failed. Please check your information." });
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg text-center p-12 bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-4">You're All Set!</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">
            {role === "INSTRUCTOR" 
              ? "Your application has been received. Redirecting you to login..." 
              : "Welcome to the community! Redirecting you to login..."}
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline underline-offset-4">
            Go to Login Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-indigo-50/50 dark:from-indigo-900/10 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6">
            {role === "INSTRUCTOR" ? "Instructor Registration" : "Create Account"}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg max-w-2xl mx-auto">
            {role === "INSTRUCTOR" 
              ? "Join our community of expert educators and share your knowledge with the world." 
              : "Join thousands of learners and educators building the future of skills."}
          </p>
        </motion.div>

        {/* Role Selector */}
        {!isRoleLocked && (
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-2 rounded-3xl mb-12 border border-zinc-200 dark:border-zinc-800 gap-2">
            <button
              onClick={() => setRole("STUDENT")}
              className={`px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3 ${
                role === "STUDENT" 
                  ? "bg-white dark:bg-black text-indigo-600 shadow-xl" 
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <User size={20} /> I'm a Student
            </button>
            <button
              onClick={() => setRole("INSTRUCTOR")}
              className={`px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3 ${
                role === "INSTRUCTOR" 
                  ? "bg-white dark:bg-black text-indigo-600 shadow-xl" 
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <Award size={20} /> I'm an Instructor
            </button>
          </div>
        )}

        <motion.form 
          layout
          onSubmit={handleSubmit}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[3.5rem] p-8 md:p-16 shadow-2xl"
        >
          {error && typeof error === "object" && (
            <div className="md:col-span-2 p-6 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-3xl text-rose-600 dark:text-rose-400 text-sm font-bold">
              {Object.entries(error).map(([key, val]: [string, any]) => (
                <div key={key} className="capitalize">• {key}: {Array.isArray(val) ? val.join(", ") : val}</div>
              ))}
            </div>
          )}

          {/* Common Fields */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
              Basic Information
            </h3>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Username</label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  title="Username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                />
                <User className="absolute left-6 top-4 text-zinc-400" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  title="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                />
                <Mail className="absolute left-6 top-4 text-zinc-400" size={20} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="first_name" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="John"
                  title="First Name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="last_name" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  placeholder="Doe"
                  title="Last Name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
              Security
            </h3>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  title="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                />
                <Lock className="absolute left-6 top-4 text-zinc-400" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password_confirm" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  id="password_confirm"
                  type="password"
                  name="password_confirm"
                  placeholder="••••••••"
                  title="Confirm Password"
                  required
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                />
                <Lock className="absolute left-6 top-4 text-zinc-400" size={20} />
              </div>
            </div>
          </div>

          {/* Instructor Specific Fields */}
          <AnimatePresence mode="popLayout">
            {role === "INSTRUCTOR" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-4 pt-12 border-t border-zinc-100 dark:border-zinc-800"
              >
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
                    <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
                    Professional Details
                  </h3>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="expertise" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Primary Expertise</label>
                    <div className="relative">
                      <input
                        id="expertise"
                        type="text"
                        name="expertise"
                        placeholder="e.g. Full Stack Development"
                        title="Primary Expertise"
                        required={role === "INSTRUCTOR"}
                        value={formData.expertise}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                      />
                      <Briefcase className="absolute left-6 top-4 text-zinc-400" size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="education_level" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Education</label>
                      <input
                        id="education_level"
                        type="text"
                        name="education_level"
                        placeholder="BSc, PhD, etc."
                        title="Education Level"
                        value={formData.education_level}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="years_of_experience" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Experience (Years)</label>
                      <input
                        id="years_of_experience"
                        type="number"
                        name="years_of_experience"
                        min="0"
                        title="Years of Experience"
                        value={formData.years_of_experience}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Short Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      title="Bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
                    <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">4</span>
                    Links & Portfolio
                  </h3>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="linkedin" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">LinkedIn Profile</label>
                    <div className="relative">
                      <input
                        id="linkedin"
                        type="url"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/..."
                        title="LinkedIn Profile"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                      />
                      <LinkIcon className="absolute left-6 top-4 text-zinc-400" size={20} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="portfolio" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Portfolio/Website</label>
                    <div className="relative">
                      <input
                        id="portfolio"
                        type="url"
                        name="portfolio"
                        placeholder="https://yourwebsite.com"
                        title="Portfolio Website"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all"
                      />
                      <Globe className="absolute left-6 top-4 text-zinc-400" size={20} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="cv_file" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Upload CV (PDF preferred)</label>
                    <div className="relative">
                      <input
                        id="cv_file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        title="Curriculum Vitae"
                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                      />
                      <FileText className="absolute left-6 top-4 text-zinc-400" size={20} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="proposed_courses" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1">Proposed Courses</label>
                    <textarea
                      id="proposed_courses"
                      name="proposed_courses"
                      rows={3}
                      placeholder="What courses are you planning to teach?"
                      title="Proposed Courses"
                      value={formData.proposed_courses}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none font-medium transition-all resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="md:col-span-2 pt-8 flex flex-col items-center gap-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : (
                <>Complete Registration <ArrowRight size={24}/></>
              )}
            </button>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">Sign In</Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default RegisterPage;
