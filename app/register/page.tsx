"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Mail, Lock, User, Briefcase, GraduationCap, Link as LinkIcon,
  FileText, Loader2, ArrowRight, Globe, CheckCircle2, BookOpen,
  ChevronRight, Users
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "STUDENT" | "INSTRUCTOR";
type InstructorType = "VIDEO_CREATOR" | "LIVE_STREAMER" | "BOTH";

interface FormData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  // Instructor-only fields
  expertise: string;
  education_level: string;
  years_of_experience: number;
  bio: string;
  website: string;
  portfolio: string;
  proposed_courses: string;
  instructor_type: InstructorType;
}

// ─── Main Component ───────────────────────────────────────────────────────────
const RegisterContent = () => {
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [role, setRole] = useState<Role>("STUDENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
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
    // Plain text — backend uses CharField (not URLField) so blank is fine
    website: "",
    portfolio: "",
    proposed_courses: "",
    instructor_type: "VIDEO_CREATOR",
  });

  useEffect(() => {
    const paramRole = searchParams.get("role")?.toUpperCase();
    if (paramRole === "INSTRUCTOR") {
      setRole("INSTRUCTOR");
      setStep("form");
    } else if (paramRole === "STUDENT") {
      setRole("STUDENT");
      setStep("form");
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "years_of_experience" ? parseInt(value) || 0 : value,
    }));
    // Clear password mismatch error live
    if (name === "password_confirm" || name === "password") {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side password match check before hitting the server
    if (formData.password !== formData.password_confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const submissionData = new FormData();
    submissionData.append("role", role);

    // Always-included fields (shared between student and instructor)
    const sharedFields: (keyof FormData)[] = [
      "username", "email", "password", "password_confirm",
      "first_name", "last_name",
    ];
    sharedFields.forEach((key) => {
      const val = formData[key];
      submissionData.append(
        key,
        typeof val === "string" ? val.trim() : String(val)
      );
    });

    // Instructor-only fields — only appended when registering as INSTRUCTOR
    // This matches the backend's `if role == 'INSTRUCTOR':` guard.
    if (role === "INSTRUCTOR") {
      const instructorFields: (keyof FormData)[] = [
        "expertise", "education_level", "years_of_experience",
        "bio", "website", "portfolio", "proposed_courses", "instructor_type",
      ];
      instructorFields.forEach((key) => {
        const val = formData[key];
        submissionData.append(key, String(val));
      });
      if (cvFile) {
        submissionData.append("cv_file", cvFile);
      }
    }

    try {
      await register(submissionData);
      setSuccess(true);
      setTimeout(() => router.push("/login?registered=true"), 3000);
    } catch (err: any) {
      setError(
        err.response?.data || { detail: "Registration failed. Please check your information." }
      );
      setLoading(false);
    }
  };

  // ─── Success Screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center p-10 bg-white rounded-3xl border border-slate-200 shadow-2xl"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">You&apos;re All Set!</h1>
          <p className="text-slate-500 text-sm mb-6">
            {role === "INSTRUCTOR"
              ? "Your application has been submitted. Our team will review it shortly."
              : "Welcome to Fatra Academy! Redirecting you to sign in..."}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl font-semibold text-sm"
          >
            Go to Login <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Role Choice Screen ──────────────────────────────────────────────────────
  if (step === "choose") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <BookOpen size={28} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Fatra<span className="text-cyan-600"> Academy</span></span>
            </Link>
            <h1 className="text-3xl font-bold text-slate-800 mt-5 mb-2">Join Fatra Academy</h1>
            <p className="text-slate-500 text-base">Choose how you want to get started</p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Card */}
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setRole("STUDENT"); setStep("form"); }}
              className="bg-white border-2 border-slate-200 hover:border-cyan-400 hover:shadow-lg rounded-2xl p-8 text-left transition-all group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-md shadow-cyan-500/20">
                <GraduationCap size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">I&apos;m a Student</h2>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Access thousands of courses, learn at your own pace, and achieve your educational goals.
              </p>
              <ul className="space-y-2 mb-6">
                {["Access to 250+ courses", "Learn from expert instructors", "Track your progress", "Get certificates"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-cyan-100 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl font-semibold text-sm">
                Register as Student <ChevronRight size={16} />
              </div>
            </motion.button>

            {/* Instructor Card */}
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setRole("INSTRUCTOR"); setStep("form"); }}
              className="bg-white border-2 border-slate-200 hover:border-teal-400 hover:shadow-lg rounded-2xl p-8 text-left transition-all group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-md shadow-teal-500/20">
                <Users size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">I&apos;m an Instructor</h2>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Share your expertise with thousands of eager students worldwide and earn income.
              </p>
              <ul className="space-y-2 mb-6">
                {["Create unlimited courses", "Earn from your expertise", "Build your brand", "Join 500+ instructors"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold text-sm">
                Register as Instructor <ChevronRight size={16} />
              </div>
            </motion.button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  // ─── Registration Form ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">Fatra<span className="text-cyan-600"> Academy</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {role === "INSTRUCTOR" ? "Instructor Registration" : "Student Registration"}
          </h1>
          <p className="text-slate-500 text-sm">
            {role === "INSTRUCTOR"
              ? "Join our community of expert educators"
              : "Join thousands of learners worldwide"}
          </p>
          <button
            onClick={() => setStep("choose")}
            className="mt-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            ← Change role
          </button>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12"
        >
          {/* Server-side errors */}
          {error && typeof error === "object" && (
            <div className="mb-6 p-5 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm space-y-1">
              {Object.entries(error).map(([key, val]: [string, any]) => (
                <div key={key} className="capitalize">
                  • <span className="font-semibold">{key.replace(/_/g, " ")}:</span>{" "}
                  {Array.isArray(val) ? val.join(", ") : String(val)}
                </div>
              ))}
            </div>
          )}

          {/* Section 1: Personal Info */}
          <div className="mb-8">
            <SectionHeader number="01" title="Personal Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField icon={<User size={18} />} label="Username" id="username" required name="username" placeholder="johndoe" value={formData.username} onChange={handleChange} />
              <FormField icon={<Mail size={18} />} label="Email Address" id="email" type="email" required name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              <FormField label="First Name" id="first_name" required name="first_name" placeholder="John" value={formData.first_name} onChange={handleChange} />
              <FormField label="Last Name" id="last_name" required name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleChange} />
            </div>
          </div>

          {/* Section 2: Password */}
          <div className="mb-8">
            <SectionHeader number="02" title="Account Security" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField icon={<Lock size={18} />} label="Password" id="password" type="password" required name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
              <FormField icon={<Lock size={18} />} label="Confirm Password" id="password_confirm" type="password" required name="password_confirm" placeholder="••••••••" value={formData.password_confirm} onChange={handleChange} />
            </div>
            {/* Client-side password match error */}
            {passwordError && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span>⚠</span> {passwordError}
              </p>
            )}
          </div>

          {/* Section 3: Instructor-only fields */}
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

                    {/* Instructor Type — matches InstructorProfile.InstructorType choices */}
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
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all appearance-none cursor-pointer"
                        >
                          <option value="VIDEO_CREATOR">🎬 Video Creator</option>
                          <option value="LIVE_STREAMER">📡 Live Streamer</option>
                          <option value="BOTH">🎯 Both</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-3.5 text-slate-400">▾</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">How will you primarily deliver your courses?</p>
                    </div>

                    {/* Website — type="text" because backend uses CharField, not URLField */}
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

                    {/* Portfolio — type="text" for same reason */}
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
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 resize-none transition-all"
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
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 resize-none transition-all"
                      />
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <div className="flex flex-col items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-sm py-4 gradient-primary text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>Complete Registration <ArrowRight size={18} /></>
              )}
            </button>
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

// ─── Reusable Sub-components ──────────────────────────────────────────────────

const SectionHeader = ({
  number,
  title,
  color = "gradient-primary",
}: {
  number: string;
  title: string;
  color?: string;
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
      {number}
    </div>
    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
  </div>
);

const FormField = ({
  icon,
  label,
  id,
  type = "text",
  required,
  name,
  placeholder,
  value,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      {icon && <span className="absolute left-4 top-3.5 text-slate-400">{icon}</span>}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-11" : "px-4"} pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all`}
      />
    </div>
  </div>
);

// ─── Page Wrapper ─────────────────────────────────────────────────────────────
const RegisterPage = () => {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="text-cyan-600 animate-spin" size={40} />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
};

export default RegisterPage;
