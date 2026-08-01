import { executeWithRetry } from "./retry";

export interface GenerateStoryParams {
  category: string;
  difficulty: string;
}

export interface GeneratedStoryContent {
  title: string;
  difficulty: string;
  readingTime: string;
  xp: number;
  category: string;
  vocabulary: Array<{ english: string; banglaPronunciation: string; meaning: string }>;
  banglaStory: string;
  englishStory: string;
  quiz: Array<{ question: string; options: string[]; answer: string }>;
}

export async function generateStory(params: GenerateStoryParams): Promise<GeneratedStoryContent> {
  const prompt = `
You are an expert English Tutor AI.
Generate a story based on Category: "${params.category}" and Difficulty: "${params.difficulty}".
Return ONLY a valid JSON object matching this schema exactly, with NO markdown formatting around it (no \`\`\`json):
{
  "title": "Story Title",
  "difficulty": "${params.difficulty}",
  "readingTime": "X min",
  "xp": 50,
  "category": "${params.category}",
  "vocabulary": [
    { "english": "Word", "banglaPronunciation": "Pronunciation in Bangla", "meaning": "Meaning in Bangla" }
  ],
  "banglaStory": "The story in Bangla, but replace 20-30% of the key words naturally with English words from the vocabulary list. Example: 'আজ আমি Office এ গেলাম।' Keep it engaging.",
  "englishStory": "The complete English version of the story.",
  "quiz": [
    { "question": "Question about the story?", "options": ["A", "B", "C", "D"], "answer": "The correct option exactly as written" }
  ]
}
`;

  return executeWithRetry(async (apiKey) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json",
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textOutput) {
      throw new Error("Invalid response structure from Gemini API");
    }

    try {
      return JSON.parse(textOutput) as GeneratedStoryContent;
    } catch (e) {
      throw new Error("Failed to parse Gemini API JSON response");
    }
  });
}
