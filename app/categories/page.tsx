"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";


const CATEGORIES = [
  { name: "History", icon: "🏛", diff: "Intermediate", desc: "Discover the past through engaging stories." },
  { name: "Biography", icon: "👑", diff: "Beginner", desc: "Learn about the lives of great personalities." },
  { name: "Technology", icon: "💻", diff: "Advanced", desc: "Explore the future and cutting-edge tech." },
  { name: "Daily Conversation", icon: "🏡", diff: "Beginner", desc: "Master everyday casual English chats." },
  { name: "Restaurant", icon: "☕", diff: "Beginner", desc: "Order food and dine like a native speaker." },
  { name: "Airport", icon: "✈", diff: "Elementary", desc: "Navigate travel and check-ins smoothly." },
  { name: "Office", icon: "🏢", diff: "Intermediate", desc: "Professional English for the workplace." },
  { name: "Business", icon: "📈", diff: "Advanced", desc: "Corporate English, meetings, and strategies." },
  { name: "Psychology", icon: "🧠", diff: "Advanced", desc: "Deep dive into human mind and behavior." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function CategoriesPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-500 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-12 transition-all hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-full px-4 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </motion.div>
        
        <div className="mb-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center space-x-2 rounded-full border border-primary-200/50 bg-primary-50/50 dark:border-primary-800/50 dark:bg-primary-900/30 backdrop-blur-md px-5 py-2 shadow-sm mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Personalized Learning Path
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-primary-800 to-slate-900 dark:from-white dark:via-primary-300 dark:to-slate-300"
          >
            Choose Your Topic
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Select a category that interests you to generate a unique story tailored to your current English level.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div key={i} variants={itemVariants} className="h-full">
              <Link href={`/story/read/new?category=${cat.name}&difficulty=${cat.diff}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-3xl">
                <div className="group relative flex h-full flex-col p-8 overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] hover:bg-white dark:hover:bg-slate-800">
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/5 dark:to-primary-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  {/* Inner Border Gradient on Hover */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent group-hover:ring-primary-500/20 dark:group-hover:ring-primary-400/20 transition-all duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 text-5xl shadow-inner border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:from-primary-50 group-hover:to-white dark:group-hover:from-primary-900/40 dark:group-hover:to-slate-800 mb-8">
                      <span className="transition-transform duration-500 group-hover:scale-110">{cat.icon}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-3">
                      {cat.name}
                    </h2>
                    
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto flex items-center justify-between w-full">
                    <span className="inline-flex items-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm">
                      {cat.diff}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ArrowRight component inline for ease
function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
