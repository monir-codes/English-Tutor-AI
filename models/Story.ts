import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
  title: string;
  difficulty: string;
  readingTime: string;
  xp: number;
  category: string;
  vocabulary: Array<{ english: string; banglaPronunciation: string; meaning: string }>;
  banglaStory: string;
  englishStory: string;
  quiz: Array<{ question: string; options: string[]; answer: string }>;
  createdAt: Date;
}

const StorySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    readingTime: { type: String, required: true },
    xp: { type: Number, required: true },
    category: { type: String, required: true },
    vocabulary: [
      {
        english: String,
        banglaPronunciation: String,
        meaning: String,
      },
    ],
    banglaStory: { type: String, required: true },
    englishStory: { type: String, required: true },
    quiz: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Story || mongoose.model<IStory>('Story', StorySchema);
