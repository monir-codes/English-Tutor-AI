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

export default function VocabularyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
