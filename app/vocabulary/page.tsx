"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search, Volume2, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "English Vocabulary with Bengali Meaning | Personal Dictionary",
  description: "Build your personal English vocabulary list with exact Bengali meanings. Save difficult words while reading stories and practice them daily for fluent speaking.",
  keywords: ["English vocabulary with Bengali meaning", "Daily use English words with Bangla", "English word book Bengali", "Spoken English vocabulary list", "Learn English words fast"],
  openGraph: {
    title: "My English Vocabulary | English Tutor AI",
    description: "Review and memorize the English words you've saved from your reading sessions.",
    url: "https://english-tutor-ai.vercel.app/vocabulary",
  }
};

export default function VocabularyPage() {
  const { user } = useAuth();
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVocab = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/vocabulary/${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setWords(data.vocabulary);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVocab();
  }, [user]);

  const filteredWords = words.filter((w) =>
    w.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>
      
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4 text-primary">
          <BookOpen className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">My Vocabulary</h1>
        <p className="text-muted-foreground">Review the words you've encountered in your stories.</p>
      </div>

      <div className="mb-8 relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          className="block w-full rounded-full border border-border bg-background p-4 pl-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
          placeholder="Search words or meanings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredWords.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-3xl bg-muted/20">
          <p className="text-muted-foreground text-lg">No words found. Start reading more stories to build your vocabulary!</p>
          <Link href="/categories" className="mt-4 inline-block text-primary hover:underline font-medium">
            Explore Stories &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredWords.map((word, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              key={i}
              className="rounded-2xl border bg-card p-5 shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-xl text-primary">{word.english}</h3>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground italic mb-3">{word.banglaPronunciation}</p>
              </div>
              <div className="pt-3 border-t">
                <p className="font-medium text-sm">{word.meaning}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
