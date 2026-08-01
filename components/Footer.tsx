import Link from "next/link";
import { BookOpen, Code, Mail, Globe, CheckCircle2, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8 dark:bg-slate-950 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
          
          {/* Brand & About */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <Link href="/" className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  English Tutor AI
                </span>
              </Link>
              <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                Learn English Naturally Through Bangla Stories.
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Help Bengali speakers learn practical spoken English naturally by reading interesting Bangla stories, real history, biographies, politics, science, and everyday situations instead of memorizing thousands of random vocabulary.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="mt-6 space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Categories", href: "/categories" },
                { name: "Vocabulary", href: "/vocabulary" },
                { name: "Quiz", href: "/quiz" },
                { name: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-sm dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Categories</h3>
            <ul className="mt-6 space-y-4">
              {[
                { name: "🏛 History", href: "/categories/history" },
                { name: "💻 Technology", href: "/categories/technology" },
                { name: "🌍 Daily Conversation", href: "/categories/daily" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-sm dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free & Open */}
          <div className="lg:col-span-1 flex flex-col gap-6">
             <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Free & Open</h3>
                <div className="mt-6 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <ul className="space-y-3">
                    {["100% Free to Use", "Open for Everyone", "No Hidden Charges"].map((item) => (
                      <li key={item} className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="mr-3 h-5 w-5 text-accent-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-relaxed text-slate-500 italic dark:text-slate-400">
                    "We believe quality education should be accessible to everyone."
                  </p>
                </div>
             </div>
          </div>

          {/* Connect & Feedback */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Connect With Me</h3>
              <div className="mt-6 flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/moniruzzaman-rumman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-[#0A66C2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-[#0A66C2] dark:hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/monir-codes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <Code className="h-5 w-5" />
                </a>
                <a
                  href="https://monir-uzzaman.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portfolio"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-primary-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-primary-600 dark:hover:text-white"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Feedback</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Found an error or have a suggestion? We'd love to hear from you. Your feedback helps improve this platform for everyone.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-slate-200 pt-8 sm:flex-row gap-4 text-center sm:text-left dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 Monir. All Rights Reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center sm:justify-start text-sm text-slate-500 dark:text-slate-400">
            Made with <Heart className="mx-1 h-4 w-4 text-red-500 fill-red-500 shrink-0" /> for everyone learning English.
          </p>
        </div>
      </div>
    </footer>
  );
}
