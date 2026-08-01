"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, ArrowRight, Trophy, Sparkles, Brain, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { GlobalLoader } from "@/components/ui/GlobalLoader";

import confetti from "canvas-confetti"; // We'll add this effect if possible, but fallback to CSS otherwise

// Define types for better safety
type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type Story = {
  id: string;
  quiz: QuizQuestion[];
  xp: number;
};

// Mock data fallback since MongoDB might not be running
const MOCK_STORY: Story = {
  id: "mock-1",
  xp: 50,
  quiz: [
    { question: "What does 'fascinating' mean?", options: ["Boring", "Extremely interesting", "Loud", "Fast"], answer: "Extremely interesting" },
    { question: "Choose the correct translation for 'আমি আজ খুব ব্যস্ত':", options: ["I am very free today", "I am very busy today", "Today is a good day", "I am tired today"], answer: "I am very busy today" },
    { question: "Which word is a synonym for 'Huge'?", options: ["Tiny", "Massive", "Bright", "Quick"], answer: "Massive" }
  ]
};

export default function QuizPage({ params }: { params: Promise<{ storyId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  // LocalStorage Actions
  const { addXp, completeStory, incrementStreak } = useUserStore();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  
  const [finished, setFinished] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  useEffect(() => {
    // In a real app, you'd fetch from /api/story/${resolvedParams.storyId}
    // For now, we simulate fetching with our Mock Data so it never breaks
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/story/${resolvedParams.storyId}`);
        if (res.ok) {
          const data = await res.json();
          setStory(data);
        } else {
          setStory(MOCK_STORY); // Fallback to mock
        }
      } catch (error) {
        console.error("API failed, using mock", error);
        setStory(MOCK_STORY); // Fallback to mock
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [resolvedParams.storyId]);

  const handleSelect = (opt: string) => {
    if (isCorrect !== null || !story) return;
    
    setSelected(opt);
    const correct = opt === story.quiz[currentQ].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore((s) => s + 1);
      // Play a small pop sound or effect here in production
    }
  };

  const triggerConfetti = () => {
    try {
      import("canvas-confetti").then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
        });
      });
    } catch(e) {}
  };

  const handleNext = () => {
    if (!story) return;

    if (currentQ < story.quiz.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      // Calculate XP
      const calculatedXp = Math.round((score / story.quiz.length) * story.xp) || 10;
      setEarnedXp(calculatedXp);
      
      // Save locally
      addXp(calculatedXp);
      completeStory();
      incrementStreak(); // Simplified streak logic
      
      setFinished(true);
      triggerConfetti();
    }
  };

  if (loading) return <GlobalLoader isLoading={true} message="Preparing your quiz..." />;
  if (!story) return <div className="flex h-screen items-center justify-center text-xl font-bold">Story not found.</div>;

  if (finished) {
    return (
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
        {/* Background Rays */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
           <div className="w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_10s_linear_infinite] rounded-full blur-2xl mix-blend-overlay"></div>
        </div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="relative z-10 w-full max-w-lg rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-10 shadow-2xl text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><Trophy className="w-48 h-48" /></div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-inner"
          >
            <Award className="h-12 w-12 text-white drop-shadow-md" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Quiz Complete!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 text-lg font-medium text-slate-500 dark:text-slate-400"
          >
            You scored {score} out of {story.quiz.length}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="mb-10 p-4 rounded-2xl bg-gradient-to-r from-primary-500/10 to-blue-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 font-bold text-2xl flex items-center justify-center gap-3 shadow-inner"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            +{earnedXp} XP Earned!
          </motion.div>

          <div className="flex flex-col gap-4 relative z-10">
            <Link href="/dashboard" className="w-full inline-flex h-14 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-base font-bold text-white dark:text-slate-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
              Return to Dashboard
            </Link>
            <Link href="/categories" className="w-full inline-flex h-14 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-800 bg-transparent text-base font-bold text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
              Read Another Story
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = story.quiz[currentQ];
  const progressPercentage = ((currentQ + 1) / story.quiz.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-500">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        
        {/* Header & Progress */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link href="/dashboard" className="hover:text-primary-600 transition-colors">
              Exit
            </Link>
            <span className="text-primary-600 dark:text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full flex items-center gap-2">
               <Brain className="w-4 h-4" /> Score: {score}
            </span>
          </div>
          
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-8 sm:p-10 rounded-[2.5rem] shadow-sm"
          >
            <h2 className="mb-10 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 dark:text-white">
              {question.question}
            </h2>
            
            <div className="grid gap-4">
              {question.options.map((opt: string, i: number) => {
                const isSelected = selected === opt;
                const isAns = opt === question.answer;
                
                let btnState = "idle";
                if (selected) {
                  if (isAns) btnState = "correct";
                  else if (isSelected) btnState = "incorrect";
                  else btnState = "disabled";
                }

                // Dynamic Styling based on state
                let baseStyle = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-400 hover:shadow-md text-slate-700 dark:text-slate-300";
                let icon = null;
                let animationProps = {};

                if (btnState === "correct") {
                  baseStyle = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 ring-2 ring-green-500/50 scale-[1.02] shadow-lg";
                  icon = <CheckCircle2 className="h-6 w-6 text-green-500" />;
                } else if (btnState === "incorrect") {
                  baseStyle = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400 ring-2 ring-red-500/50";
                  icon = <XCircle className="h-6 w-6 text-red-500" />;
                  animationProps = {
                    animate: { x: [0, -10, 10, -10, 10, 0] },
                    transition: { duration: 0.4 }
                  };
                } else if (btnState === "disabled") {
                  baseStyle = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 opacity-40 grayscale";
                }

                return (
                  <motion.button
                    key={i}
                    {...animationProps}
                    onClick={() => handleSelect(opt)}
                    disabled={selected !== null}
                    className={`flex w-full min-h-[4rem] items-center justify-between rounded-2xl border-2 p-4 px-6 text-left text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/50 ${baseStyle}`}
                  >
                    <span>{opt}</span>
                    {icon}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button Footer */}
        <AnimatePresence>
          {selected && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-slate-200/50 dark:border-slate-800/50 p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="container mx-auto max-w-3xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <div className="flex items-center gap-3 text-green-600 dark:text-green-400 font-extrabold text-xl">
                      <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full"><CheckCircle2 className="w-8 h-8" /></div>
                      Excellent!
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-red-600 dark:text-red-400 font-extrabold text-xl">
                      <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full"><XCircle className="w-8 h-8" /></div>
                      Not quite right.
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  className={`inline-flex h-14 items-center justify-center rounded-full px-10 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-4 ${isCorrect ? 'bg-green-500 hover:bg-green-600 focus-visible:ring-green-500/50' : 'bg-primary-600 hover:bg-primary-700 focus-visible:ring-primary-500/50'}`}
                >
                  {currentQ < story.quiz.length - 1 ? "Continue" : "Finish Quiz"}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
