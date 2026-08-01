export class KeyManager {
  private keys: string[];
  private currentKeyIndex: number = 0;

  constructor() {
    // Load keys from environment variables
    this.keys = [
      process.env.GEMINI_API_KEY_1,
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY_3,
      process.env.GEMINI_API_KEY_4,
    ].filter((key) => key !== undefined && key !== "") as string[];

    if (this.keys.length === 0) {
      console.warn("No Gemini API keys found in environment variables.");
    }
  }

  getCurrentKey(): string {
    if (this.keys.length === 0) throw new Error("No API keys available");
    return this.keys[this.currentKeyIndex];
  }

  rotateKey(): void {
    if (this.keys.length === 0) return;
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
    console.log(`Rotated to Gemini API Key #${this.currentKeyIndex + 1}`);
  }

  hasMultipleKeys(): boolean {
    return this.keys.length > 1;
  }
}

export const keyManager = new KeyManager();
