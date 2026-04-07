"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

    useEffect(() => {
      const handleAuthCallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get("type");
        
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.search);
        
        if (error) {
          console.error("Error exchanging code for session:", error.message);
          router.push("/auth");
          return;
        }

        if (type === "recovery") {
          router.push("/auth?mode=reset-password");
        } else {
          router.push("/");
        }
      };

      handleAuthCallback();
    }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <p className="text-zinc-600 dark:text-zinc-400">Authenticating...</p>
      </div>
    </div>
  );
}
