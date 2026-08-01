# 📘 English Tutor AI

**Learn English Naturally Through Bangla Stories.**

English Tutor AI is an advanced, industry-grade web application designed to help Bengali speakers learn practical, spoken English effortlessly. Instead of memorizing thousands of random vocabulary words, users learn through immersive, AI-generated stories tailored to their interests and skill levels.

---

## 🌟 Key Features

### 📖 Contextual Learning
Master English naturally. The AI generates fascinating Bangla stories and seamlessly injects English words based on real-world context, teaching you vocabulary just like a native speaker learns.

### 🎮 Gamified Quiz Engine
After reading, test your comprehension with an interactive, Duolingo-style quiz. 
- Real-time haptic-like animations (e.g., screen shake for wrong answers).
- Majestic confetti celebrations upon passing.
- Earn XP instantly based on your performance.

### 📊 Offline-First Dashboard (Zustand)
Your data belongs to you. The dashboard tracks your **XP, Daily Streaks, Completed Stories, and Weekly Activity Charts** instantly. Thanks to a robust `LocalStorage` implementation powered by Zustand, everything loads instantly and works offline.

### 💎 Premium Glassmorphic UI
Built for extreme visual excellence:
- **Mesh Gradients & 3D Elements:** Floating parallax objects, majestic animated backgrounds, and dynamic gradient text.
- **Micro-animations:** Built with Framer Motion, every interaction feels alive—from springy card hover states to fluid route transitions.
- **Dark Mode Support:** A gorgeous, state-of-the-art dark mode natively integrated across the entire platform.

### 🚀 Fully Responsive & SEO Optimized
- **Pixel-Perfect:** Carefully crafted to look stunning on Mobile, Tablet, and Desktop.
- **SEO Ready:** Complete Next.js dynamic metadata and OpenGraph configuration to ensure perfect indexing and rich social media previews.

---

## 🛠️ Technology Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (Advanced Animations)
- [Zustand](https://zustand-demo.pmnd.rs/) (State Management & Persistence)
- [Recharts](https://recharts.org/) (Data Visualization)
- [Lucide React](https://lucide.dev/) (Icons)

**AI & Backend Ecosystem:**
- **Google Gemini APIs** (Automatic Failover Engine for zero downtime)
- Next.js API Routes (Serverless backend)

---

## ⚙️ Local Development Setup

Follow these steps to get the project running locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/english-tutor-ai.git
cd english-tutor-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your API keys:
```env
GEMINI_API_KEY_1=your_api_key_here
GEMINI_API_KEY_2=your_api_key_here
GEMINI_API_KEY_3=your_api_key_here
GEMINI_API_KEY_4=your_api_key_here
```

### 4. Start the Development Server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```text
📦 english-tutor-ai
 ┣ 📂 app
 ┃ ┣ 📂 dashboard      # User stats, AreaCharts, and daily goals
 ┃ ┣ 📂 categories     # Story topic selection
 ┃ ┣ 📂 quiz           # Interactive gamified assessment engine
 ┃ ┣ 📜 layout.tsx     # Global layout, SEO metadata, and Providers
 ┃ ┗ 📜 page.tsx       # Majestic landing page
 ┣ 📂 components       # Reusable UI (Navbar, Footer, GlobalLoader)
 ┣ 📂 store            # Zustand state management (userStore, themeStore)
 ┗ 📂 public           # Static assets
```

---

## 🎨 Design Philosophy
*"People don't need to memorize 600,000+ English words. In real life, only a small percentage of words are used repeatedly. Our AI teaches those exact words naturally."* 

Every pixel is designed to encourage user engagement, reduce cognitive load, and make learning an addictive joy rather than a chore.

---

### License
MIT License - Developed with ❤️ by Monir Uzzaman.
