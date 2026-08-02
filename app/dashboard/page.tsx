"use client";


import { useEffect, useState } from "react";
import { BookOpen, Flame, Star, Trophy, Activity, ArrowRight, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import { GlobalLoader } from "@/components/ui/GlobalLoader";

const CATEGORIES = [
  { name: "Daily Conversation", diff: "Beginner", time: "5 min", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { name: "Airport", diff: "Elementary", time: "7 min", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  { name: "Office", diff: "Intermediate", time: "10 min", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [recommended, setRecommended] = useState<typeof CATEGORIES>([]);
  
  // Connect to our new LocalStorage Zustand store
  const { name, setName, xp, streak, level, completedStories, weeklyActivity, storiesReadToday, lastActiveDate } = useUserStore();

  useEffect(() => {
    setMounted(true);
    // Pick 2 pseudo-random categories based on today's day for "Recommended for you" to avoid hydration mismatch
    const day = new Date().getDay();
    setRecommended([CATEGORIES[day % CATEGORIES.length], CATEGORIES[(day + 1) % CATEGORIES.length]]);
  }, []);

  if (!mounted) {
    return <GlobalLoader isLoading={true} message="Loading your dashboard..." />;
  }

  // Determine display name without demo fallback
  const finalName = name || "Learner";

  const handleSaveName = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 py-12 overflow-hidden transition-colors duration-500">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">Your Progress</span>
            </div>
            
            <div className="flex items-center gap-3 group">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    autoFocus
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-transparent border-b-2 border-primary-500 focus:outline-none w-48 sm:w-auto"
                    placeholder="Your Name"
                  />
                  <button onClick={handleSaveName} className="p-2 bg-primary-100 dark:bg-primary-900/50 text-primary-600 rounded-full hover:bg-primary-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <h1 
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
                  onClick={() => {
                    setTempName(finalName === "Learner" ? "" : finalName);
                    setIsEditingName(true);
                  }}
                  title="Click to edit your name"
                >
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 border-b-2 border-transparent hover:border-primary-400 transition-colors">{finalName}</span>!
                </h1>
              )}
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-2 font-medium">Ready to master some new vocabulary today?</p>
          </div>
          <Link href="/categories" className="group flex items-center justify-center space-x-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/50">
            <span>Read a Story</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {[
            { title: "Total XP", value: xp, icon: Star, color: "text-amber-500", bg: "bg-amber-500/10 dark:bg-amber-500/20", ring: "ring-amber-500/20" },
            { title: "Day Streak", value: streak, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10 dark:bg-orange-500/20", ring: "ring-orange-500/20" },
            { title: "Stories Read", value: completedStories, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10 dark:bg-blue-500/20", ring: "ring-blue-500/20" },
            { title: "Current Level", value: level, icon: Trophy, color: "text-purple-500", bg: "bg-purple-500/10 dark:bg-purple-500/20", ring: "ring-purple-500/20" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm ring-1 ring-inset ring-transparent transition-all hover:-translate-y-1 hover:shadow-md ${stat.ring}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.title}</p>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{stat.value}</h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Activity Chart */}
            <div className="rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 shadow-sm">
               <div className="flex items-center mb-8">
                  <div className="p-2.5 bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-xl mr-4">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Weekly Activity</h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Your XP gained over the last 7 days</p>
                  </div>
               </div>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', color: 'white', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }} 
                        itemStyle={{ color: 'white', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="xp" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" activeDot={{ r: 8, strokeWidth: 2, fill: "hsl(var(--primary))", stroke: "white" }} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Recommended for you</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {recommended.map((story, i) => (
                  <Link href={`/story/read/new?category=${story.name}&difficulty=${story.diff}`} key={i} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-2xl">
                    <div className="relative rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary-500/50 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="mb-4 flex items-center justify-between">
                          <span className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-bold ${story.bg} ${story.color}`}>
                            {story.name}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center"><Target className="w-3 h-3 mr-1" />{story.time}</span>
                        </div>
                        <h4 className="font-extrabold text-xl text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Start {story.name} Story</h4>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Level: {story.diff}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Daily Goal Card */}
            <div className="rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 shadow-sm h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Target className="w-32 h-32 text-primary-500" />
              </div>
              <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white mb-2 relative z-10">Daily Goal</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 relative z-10">Consistency is key to fluency.</p>
              
              <div className="space-y-6 relative z-10 flex-grow">
                <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex justify-between text-sm mb-3 font-bold text-slate-700 dark:text-slate-300">
                    <span>Read 1 Story</span>
                    <span>{storiesReadToday >= 1 ? 1 : 0} / 1</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full relative transition-all duration-1000 ease-out" 
                      style={{ width: storiesReadToday >= 1 ? '100%' : '10%' }}
                    >
                       <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <Link href="/categories" className="group flex w-full h-14 items-center justify-center space-x-2 rounded-full bg-slate-900 dark:bg-white text-base font-bold text-white dark:text-slate-900 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/50">
                  <span>Explore Categories</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
