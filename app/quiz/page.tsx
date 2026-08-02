import Link from "next/link";
import { BookOpen, Brain, CheckCircle, ArrowRight, Zap, Target } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "English Practice Quizzes | Test Your Spoken English",
  description: "Take free interactive English quizzes. Test your vocabulary, grammar, and spoken English comprehension directly in Bengali.",
  keywords: ["English quiz in Bangla", "Test spoken English", "Learn English grammar quiz", "Free English tests for Bengali"],
  openGraph: {
    title: "English Quizzes | English Tutor AI",
    description: "Challenge yourself with interactive quizzes after reading stories.",
    url: "https://english-tutor-ai.vercel.app/quiz",
  }
};

export default function QuizLandingPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-5 text-primary">
          <Brain className="h-12 w-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Test Your English Skills
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Quizzes are tied directly to the stories you read. Read a story first, then take the quiz to test your comprehension and earn XP!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BookOpen className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">Step 1: Read a Story</h3>
            <p className="mb-6 text-muted-foreground">
              Choose from our wide variety of categories like History, Travel, Office, or Daily Life.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              Explore Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">Step 2: Take the Quiz</h3>
            <p className="mb-6 text-muted-foreground">
              At the end of every story, you'll unlock a custom quiz to test your memory and grammar.
            </p>
            <div className="flex items-center text-sm font-medium text-orange-500 bg-orange-500/10 w-fit px-4 py-2 rounded-full">
              <CheckCircle className="mr-2 h-4 w-4" /> Earn XP on Completion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
