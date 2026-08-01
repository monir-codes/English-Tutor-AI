import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | English Tutor AI",
    default: "English Tutor AI - Learn English Naturally with Bangla Stories",
  },
  description: "Master spoken English naturally by immersing yourself in engaging stories, real history, and everyday situations. Start reading your first AI-generated story today.",
  keywords: ["English Tutor", "Learn English", "Bangla to English", "Spoken English", "AI Tutor", "Story Learning"],
  authors: [{ name: "Monir Uzzaman" }],
  creator: "Monir Uzzaman",
  openGraph: {
    title: "English Tutor AI",
    description: "Learn English effortlessly by reading fascinating stories in Bangla.",
    url: "https://english-tutor-ai.vercel.app",
    siteName: "English Tutor AI",
    images: [
      {
        url: "https://english-tutor-ai.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "English Tutor AI Premium Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "English Tutor AI",
    description: "Learn English effortlessly by reading fascinating stories in Bangla.",
    creator: "@monircodes",
    images: ["https://english-tutor-ai.vercel.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body suppressHydrationWarning className="flex min-h-[100dvh] flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="bottom-center" />
            <Navbar />
            <main className="flex-1 relative">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
