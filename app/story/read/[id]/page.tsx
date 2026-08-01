"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, ArrowRight, Book, Volume2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StoryReadPage() {
  const { id } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/story/${id}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setStory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStory();
  }, [id]);

  if (loading) {
    return <div className="flex h-[calc(100vh-100px)] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!story) {
    return <div className="flex h-screen items-center justify-center">Story not found.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>
      
      <div className="mb-8 rounded-3xl border bg-card p-6 md:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Book className="w-48 h-48" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{story.category}</span>
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium">{story.difficulty}</span>
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium">{story.readingTime}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative z-10">{story.title}</h1>
        
        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Vocabulary Preview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {story.vocabulary.map((v: any, i: number) => (
              <div key={i} className="rounded-xl border bg-background p-4 flex flex-col justify-between hover:border-primary/50 transition-colors">
                <div className="font-bold text-lg text-primary flex items-center justify-between">
                  {v.english}
                  <button className="text-muted-foreground hover:text-foreground"><Volume2 className="h-4 w-4" /></button>
                </div>
                <div className="text-sm text-muted-foreground italic mb-2">{v.banglaPronunciation}</div>
                <div className="text-sm font-medium">{v.meaning}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border bg-card shadow-sm overflow-hidden mb-8">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${!showEnglish ? 'bg-background border-b-2 border-primary text-primary' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
            onClick={() => setShowEnglish(false)}
          >
            Banglish Story
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${showEnglish ? 'bg-background border-b-2 border-primary text-primary' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
            onClick={() => setShowEnglish(true)}
          >
            Full English
          </button>
        </div>
        
        <div className="p-6 md:p-10 text-lg leading-relaxed whitespace-pre-wrap">
          <motion.div
            key={showEnglish ? "en" : "bn"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {showEnglish ? story.englishStory : story.banglaStory}
          </motion.div>
        </div>
      </div>
      
      <div className="flex justify-end mb-20">
        <Link 
          href={`/quiz/${id}`}
          className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow transition-transform hover:scale-105"
        >
          Take the Quiz
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
