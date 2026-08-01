"use client";

import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function GenerateStoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const category = searchParams.get("category") || "Random";
  const difficulty = searchParams.get("difficulty") || "Beginner";
  
  const [status, setStatus] = useState("Initializing AI...");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const generate = async () => {
      setStatus("Generating your personalized story...");
      try {
        const res = await fetch("/api/story/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, difficulty, firebaseUid: user.uid }),
        });
        
        if (!res.ok) throw new Error("Failed to generate");
        
        const data = await res.json();
        setStatus("Story ready! Redirecting...");
        router.push(`/story/read/${data.storyId}`);
      } catch (error) {
        console.error(error);
        setStatus("Error generating story. Please try again.");
      }
    };
    
    generate();
  }, [user, loading, category, difficulty, router]);

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center p-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-8 rounded-full bg-primary/20 p-6 text-primary"
      >
        <Sparkles className="h-12 w-12" />
      </motion.div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Creating Magic</h2>
      <p className="text-muted-foreground flex items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {status}
      </p>
    </div>
  );
}
