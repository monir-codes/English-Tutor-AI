import { Metadata } from "next";

export const metadata: Metadata = {
  title: "English Reading Practice with Bengali Translation | Story Categories",
  description: "Explore diverse English stories with Bengali translations. Practice daily conversations, office English, airport vocabulary, and more to improve fluency naturally.",
  keywords: ["English reading practice with Bengali translation", "Daily English conversation in Bangla", "Learn English through stories", "Spoken English topics for Bengali"],
  openGraph: {
    title: "English Story Categories | Learn Spoken English",
    description: "Choose a topic you love and start reading English stories tailored for Bengali learners.",
    url: "https://englishtutor-ai.vercel.app/categories",
  }
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
