"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const DashboardRouter = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const userRole = (user as any).role;
    const isSuper = (user as any).is_superuser;

    if (userRole === 'ADMIN' || isSuper) {
      router.replace("/admin/dashboard");
    } else if (userRole === 'INSTRUCTOR') {
      router.replace("/instructor/dashboard");
    } else {
      router.replace("/student/dashboard");
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950 text-white font-black tracking-[0.5em] italic animate-pulse">
      DECRYPTING_USER_ROLE_PROFILE...
    </div>
  );
};

export default DashboardRouter;
