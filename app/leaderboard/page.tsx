"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Medal, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok) {
          const data = await res.json();
          setLeaders(data.users);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>
      
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4 text-primary">
          <Trophy className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Global Leaderboard</h1>
        <p className="text-muted-foreground">See how you rank against other English learners.</p>
      </div>

      <div className="rounded-3xl border bg-card shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">User</div>
          <div className="col-span-4 text-right pr-4">Total XP</div>
        </div>
        
        <div className="divide-y">
          {leaders.map((user, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={user._id}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
            >
              <div className="col-span-2 flex justify-center">
                {i === 0 ? <Medal className="h-8 w-8 text-yellow-500" /> :
                 i === 1 ? <Medal className="h-8 w-8 text-gray-400" /> :
                 i === 2 ? <Medal className="h-8 w-8 text-amber-700" /> :
                 <span className="text-xl font-bold text-muted-foreground">{i + 1}</span>}
              </div>
              <div className="col-span-6">
                <div className="font-bold text-lg">{user.name || "Anonymous Learner"}</div>
                <div className="text-sm text-muted-foreground">{user.level}</div>
              </div>
              <div className="col-span-4 text-right pr-4">
                <span className="font-bold text-primary text-lg">{user.xp} XP</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
