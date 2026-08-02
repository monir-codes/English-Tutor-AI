"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Brain, MessageCircle, Sparkles, TrendingUp, Users, Star, CheckCircle, HelpCircle, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Do I need to know English to use this?", a: "No! The stories are written primarily in Bangla, gradually introducing English words in a way that makes their meaning obvious from context." },
    { q: "Is it completely free?", a: "Yes, you can sign up and start generating AI stories and taking quizzes for free." },
    { q: "How is it different from Duolingo?", a: "Instead of translating random sentences out of context, you read immersive, continuous stories. You learn vocabulary naturally like a native speaker does." },
    { q: "Can I choose the topics?", a: "Absolutely! Whether you like History, Politics, Tech, or Sci-Fi, our AI generates custom stories based on your interests." },
  ];

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary-200 selection:text-primary-900 dark:selection:bg-primary-900/50 dark:selection:text-primary-100">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-32 pb-40">
        {/* Advanced Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle Grid with Fade */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          {/* Majestic Glows */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-primary-400/20 to-transparent dark:from-primary-600/10 rounded-full blur-[120px] opacity-80"></div>
          <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '7s' }}></div>
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }}></div>

          {/* Floating Parallax Elements */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-32 left-[10%] p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 rotate-[-12deg]"
          >
            <div className="text-3xl">🚀</div>
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute top-64 right-[12%] p-5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-slate-700/50 rotate-[15deg]"
          >
            <div className="text-4xl">🧠</div>
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute bottom-20 left-[18%] p-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-xl shadow-lg border border-white/50 dark:border-slate-700/50 rotate-[5deg]"
          >
            <div className="text-2xl">📚</div>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col items-center">
            {/* Animated Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              className="inline-flex items-center space-x-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 dark:border-primary-900/50 dark:bg-primary-900/20"
            >
              <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-800 dark:text-primary-300">
                100% Free • No Login Required
              </span>
            </motion.div>

            {/* Hero Heading with Staggered Word Reveal */}
            <h1 className="max-w-5xl font-sans text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl leading-[1.1] mb-8">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block"
              >
                Learn English
              </motion.span>{" "}
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block"
              >
                with
              </motion.span>{" "}
              <br className="hidden sm:block" />
              <motion.span 
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="inline-block mt-2 px-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-blue-500 to-primary-500 dark:from-primary-400 dark:via-blue-400 dark:to-primary-300 drop-shadow-sm"
              >
                Bangla Stories
              </motion.span>
            </h1>

            {/* Hero Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium"
            >
              Stop memorizing random dictionaries. Master spoken English naturally by immersing yourself in engaging stories, real history, and everyday situations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                href="/categories"
                className="group relative flex h-14 w-full sm:w-auto items-center justify-center space-x-3 rounded-full bg-slate-900 dark:bg-white px-10 text-base font-bold text-white dark:text-slate-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 overflow-hidden"
              >
                {/* Button Shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                <span className="relative z-10">Start Reading Free</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="#how-it-works"
                className="group flex h-14 w-full sm:w-auto items-center justify-center space-x-3 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-10 text-base font-bold text-slate-900 dark:text-white shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                <Brain className="h-5 w-5 text-primary-600 dark:text-primary-400 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <span>How It Works</span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-bold text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 transition-colors group-hover:bg-green-100 dark:group-hover:bg-green-900/40">
                  <Users className="h-5 w-5" />
                </div>
                <span>10k+ Learners</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span>50k+ Stories</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 transition-colors group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40">
                  <Brain className="h-5 w-5" />
                </div>
                <span>AI Powered</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-slate-50 dark:bg-slate-900/40 py-24 sm:py-32 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-3">
              The Science of Learning
            </h2>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              From Emotion to Long-term Memory
            </h3>
          </div>
          <div className="grid max-w-xl grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Contextual Learning",
                desc: "Learn new words organically as they appear mixed naturally within engaging Bangla stories.",
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-50 dark:bg-blue-900/20",
                ring: "hover:ring-blue-500/50"
              },
              {
                icon: Brain,
                title: "Spaced Repetition",
                desc: "Our AI tracks the words you struggle with and naturally re-introduces them in future stories.",
                color: "text-purple-600 dark:text-purple-400",
                bg: "bg-purple-50 dark:bg-purple-900/20",
                ring: "hover:ring-purple-500/50"
              },
              {
                icon: MessageCircle,
                title: "Real-world Situations",
                desc: "Practice with stories based on office meetings, airport check-ins, or daily conversations.",
                color: "text-green-600 dark:text-green-400",
                bg: "bg-green-50 dark:bg-green-900/20",
                ring: "hover:ring-green-500/50"
              }
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`group relative flex flex-col rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-10 shadow-lg shadow-slate-200/20 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-700/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${feat.ring}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${feat.bg} ${feat.color} shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <feat.icon className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-bold leading-7 text-slate-900 dark:text-white mb-4">
                  {feat.title}
                </h4>
                <p className="flex-auto text-base leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative bg-white dark:bg-slate-950 py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 dark:bg-slate-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-6">How It Works</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              A seamless journey from picking a topic to mastering new vocabulary.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-4 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
            
            {[
              { step: "1", title: "Pick a Topic", desc: "Choose from 20+ categories like Business, Tech, or Sci-Fi." },
              { step: "2", title: "Read the Story", desc: "Read a fascinating Bangla story with English words naturally blended in." },
              { step: "3", title: "Take the Quiz", desc: "Test your comprehension and memory with AI-generated questions." },
              { step: "4", title: "Earn XP", desc: "Level up, track your streak, and save words to your Notebook." },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, type: "spring" }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative text-center group"
              >
                <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 shadow-xl ring-4 ring-primary-100 dark:ring-primary-900/30 text-2xl font-extrabold text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-110 group-hover:ring-primary-200 dark:group-hover:ring-primary-800/50">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-32 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm overflow-hidden shadow-sm transition-all hover:shadow-md hover:bg-white dark:hover:bg-slate-800/80"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left font-bold text-slate-900 dark:text-white focus-visible:outline-none focus-visible:bg-slate-50 dark:focus-visible:bg-slate-800"
                >
                  <span className="text-lg">{faq.q}</span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${activeFaq === i ? 'bg-primary-50 dark:bg-primary-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    <HelpCircle className={`h-5 w-5 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 pt-2 text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="absolute inset-0 bg-primary-600/5 dark:bg-primary-900/10"></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl rounded-[3rem] bg-slate-900 dark:bg-slate-900 px-6 py-24 shadow-2xl overflow-hidden relative border border-slate-800"
          >
            {/* Animated Premium CTA Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-primary-500/20 to-transparent blur-[80px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_5s_infinite] pointer-events-none"></div>
            
            <h2 className="relative z-10 text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-8 leading-tight">
              Ready to speak fluently?
            </h2>
            <p className="relative z-10 mx-auto max-w-2xl text-xl text-slate-300 mb-12 font-medium leading-relaxed">
              Join thousands of learners who are mastering English without memorizing dictionaries. Start reading your first story today.
            </p>
            <Link
              href="/categories"
              className="relative z-10 inline-flex h-16 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/50"
            >
              <TrendingUp className="mr-3 h-5 w-5 text-primary-600" />
              Start Reading Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
