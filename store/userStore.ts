import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WeeklyActivity {
  name: string;
  xp: number;
}

interface UserState {
  name: string;
  xp: number;
  streak: number;
  level: string;
  completedStories: number;
  weeklyActivity: WeeklyActivity[];
  lastActiveDate: string;
  storiesReadToday: number;
  
  // Actions
  setName: (name: string) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  completeStory: () => void;
  resetProgress: () => void;
}

const DEFAULT_WEEKLY_ACTIVITY: WeeklyActivity[] = [
  { name: 'Mon', xp: 0 },
  { name: 'Tue', xp: 0 },
  { name: 'Wed', xp: 0 },
  { name: 'Thu', xp: 0 },
  { name: 'Fri', xp: 0 },
  { name: 'Sat', xp: 0 },
  { name: 'Sun', xp: 0 },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      xp: 0,
      streak: 0,
      level: 'Beginner',
      completedStories: 0,
      weeklyActivity: DEFAULT_WEEKLY_ACTIVITY,
      lastActiveDate: new Date().toDateString(),
      storiesReadToday: 0,

      setName: (name) => set({ name }),

      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        let newLevel = state.level;
        
        // Simple leveling system
        if (newXp > 1000) newLevel = 'Advanced';
        else if (newXp > 500) newLevel = 'Intermediate';
        else if (newXp > 200) newLevel = 'Elementary';
        
        // Update today's XP in weekly activity
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        const updatedActivity = state.weeklyActivity.map((day) => 
          day.name === today ? { ...day, xp: day.xp + amount } : day
        );

        return { 
          xp: newXp,
          level: newLevel,
          weeklyActivity: updatedActivity
        };
      }),

      incrementStreak: () => set((state) => {
        const today = new Date().toDateString();
        if (state.lastActiveDate !== today) {
           return { streak: state.streak + 1, lastActiveDate: today };
        }
        return state;
      }),
      
      completeStory: () => set((state) => {
        const today = new Date().toDateString();
        const isNewDay = state.lastActiveDate !== today;
        return { 
          completedStories: state.completedStories + 1,
          storiesReadToday: isNewDay ? 1 : state.storiesReadToday + 1,
          lastActiveDate: today
        };
      }),
      
      resetProgress: () => set({ 
        name: '',
        xp: 0, 
        streak: 0, 
        level: 'Beginner', 
        completedStories: 0,
        weeklyActivity: DEFAULT_WEEKLY_ACTIVITY,
        storiesReadToday: 0,
        lastActiveDate: new Date().toDateString()
      }),
    }),
    {
      name: 'english-tutor-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
