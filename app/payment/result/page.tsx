"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");
  const courseId = searchParams.get("course_id");
  const [countdown, setCountdown] = useState(5);

  const isSuccess = status === "success";

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(courseId ? `/courses/${courseId}/learn` : "/student/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSuccess, courseId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        {/* Top accent bar */}
        <div className={`h-2 w-full ${isSuccess ? "bg-gradient-to-r from-cyan-500 to-teal-500" : "bg-gradient-to-r from-red-400 to-rose-500"}`} />

        <div className="p-10 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center mb-6 ${
              isSuccess
                ? "bg-gradient-to-br from-cyan-500 to-teal-600 shadow-xl shadow-cyan-500/30"
                : "bg-gradient-to-br from-red-400 to-rose-600 shadow-xl shadow-red-500/30"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 size={48} className="text-white" />
            ) : (
              <XCircle size={48} className="text-white" />
            )}
          </motion.div>

          {/* Heading */}
          <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">
            {isSuccess ? "Enrollment Confirmed!" : "Payment Cancelled"}
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            {isSuccess
              ? "Your payment was successful. You now have full access to the course content. Enjoy your learning journey!"
              : "Your payment was not completed. You can retry enrollment from the course page whenever you're ready."}
          </p>

          {/* Countdown for success */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl border border-cyan-100 dark:border-cyan-800">
              <p className="text-sm text-cyan-700 dark:text-cyan-300 font-medium">
                Redirecting to your course in{" "}
                <span className="font-black text-cyan-600 dark:text-cyan-400 text-lg">{countdown}</span>s...
              </p>
              <div className="w-full h-1 bg-cyan-100 dark:bg-cyan-900 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500 rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {isSuccess ? (
              <Link
                href={courseId ? `/courses/${courseId}/learn` : "/student/dashboard"}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen size={18} />
                Start Learning Now
                <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link
                  href={courseId ? `/courses/${courseId}` : "/courses"}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Try Again
                </Link>
                <Link
                  href="/courses"
                  className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Browse Other Courses
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Footer branding */}
        <div className="px-10 pb-6 flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 flex items-center justify-center">
            <BookOpen size={12} className="text-white" />
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Fatra<span className="text-cyan-600"> Academy</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-cyan-600" size={40} />
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
