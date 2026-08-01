import { keyManager } from "./fallback";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function executeWithRetry<T>(
  operation: (apiKey: string) => Promise<T>
): Promise<T> {
  let attempt = 0;
  let lastError: any = null;

  while (attempt < MAX_RETRIES) {
    try {
      const currentKey = keyManager.getCurrentKey();
      return await operation(currentKey);
    } catch (error: any) {
      lastError = error;
      console.error(`Gemini API Error (Attempt ${attempt + 1}/${MAX_RETRIES}):`, error.message);

      // Check if error is related to quota or authentication
      const status = error?.status || error?.response?.status;
      if (status === 429 || status === 401 || status === 403) {
        if (keyManager.hasMultipleKeys()) {
          console.warn("Rotating API key due to rate limit/auth error...");
          keyManager.rotateKey();
          // Do not increment attempt count if we are just switching keys for rate limits,
          // or you can increment to avoid infinite loop. Let's increment but give it a try with new key.
        }
      }

      attempt++;
      if (attempt < MAX_RETRIES) {
        const backoffDelay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`Waiting ${backoffDelay}ms before retry...`);
        await delay(backoffDelay);
      }
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} attempts. Last error: ${lastError?.message}`);
}
