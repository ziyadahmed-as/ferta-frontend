"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Loader2, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RoleChoiceScreen } from "./components/RoleChoiceScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { InstructorFields } from "./components/InstructorFields";
import { SectionHeader, FormField } from "./components/FormFields";

type Role = "STUDENT" | "INSTRUCTOR";
type InstructorType = "VIDEO_CREATOR" | "LIVE_STREAMER" | "BOTH";

interface FormData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  expertise: string;
  education_level: string;
  years_of_experience: number;
  bio: string;
  website: string;
  portfolio: string;
  proposed_courses: string;
  instructor_type: InstructorType;
}

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
    username: "", email: "", password: "", password_confirm: "", first_name: "", last_name: "",
    expertise: "", education_level: "", years_of_experience: 0, bio: "", website: "", portfolio: "",
    proposed_courses: "", instructor_type: "VIDEO_CREATOR",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "years_of_experience" ? parseInt(value) || 0 : value,
    }));
    if (name === "password_confirm" || name === "password") {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.password_confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const submissionData = new FormData();
    submissionData.append("role", role);

    const sharedFields: (keyof FormData)[] = [
      "username", "email", "password", "password_confirm", "first_name", "last_name",
    ];
    sharedFields.forEach((key) => {
      const val = formData[key];
      submissionData.append(key, typeof val === "string" ? val.trim() : String(val));
    });

    if (role === "INSTRUCTOR") {
      const instructorFields: (keyof FormData)[] = [
        "expertise", "education_level", "years_of_experience",
        "bio", "website", "portfolio", "proposed_courses", "instructor_type",
      ];
      instructorFields.forEach((key) => {
        const val = formData[key];
        submissionData.append(key, String(val));
      });
      if (cvFile) submissionData.append("cv_file", cvFile);
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

  if (success) return <SuccessScreen role={role} />;

  if (step === "choose") return <RoleChoiceScreen setRole={setRole} setStep={setStep} />;

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
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
            {role === "INSTRUCTOR" ? "Join our community of expert educators" : "Join thousands of learners worldwide"}
          </p>
          <button onClick={() => setStep("choose")} className="mt-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium">
            ← Change role
          </button>
        </div>

        <motion.form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
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

          <div className="mb-8">
            <SectionHeader number="01" title="Personal Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField icon={<User size={18} />} label="Username" id="username" required name="username" placeholder="johndoe" value={formData.username} onChange={handleChange} />
              <FormField icon={<Mail size={18} />} label="Email Address" id="email" type="email" required name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              <FormField label="First Name" id="first_name" required name="first_name" placeholder="John" value={formData.first_name} onChange={handleChange} />
              <FormField label="Last Name" id="last_name" required name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-8">
            <SectionHeader number="02" title="Account Security" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField icon={<Lock size={18} />} label="Password" id="password" type="password" required name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
              <FormField icon={<Lock size={18} />} label="Confirm Password" id="password_confirm" type="password" required name="password_confirm" placeholder="••••••••" value={formData.password_confirm} onChange={handleChange} />
            </div>
            {passwordError && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><span>⚠</span> {passwordError}</p>}
          </div>

          <InstructorFields role={role} formData={formData} handleChange={handleChange} cvFile={cvFile} setCvFile={setCvFile} />

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

const RegisterPage = () => {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-white"><Loader2 className="text-cyan-600 animate-spin" size={40} /></div>}>
      <RegisterContent />
    </Suspense>
  );
};

export default RegisterPage;
