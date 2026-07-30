import "server-only";

export type AppEnvConfig = {
  useRealAI: boolean;
  geminiApiKey: string | undefined;
  geminiModel: string;
};

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === "") {
    return fallback;
  }
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

/**
 * Reads runtime configuration from environment variables.
 * Server-side only — never expose GEMINI_API_KEY to the client.
 */
export function getEnvConfig(): AppEnvConfig {
  return {
    useRealAI: parseBoolean(process.env.USE_REAL_AI, false),
    geminiApiKey: process.env.GEMINI_API_KEY || undefined,
    geminiModel: process.env.GEMINI_MODEL || "gemini-3.6-flash",
  };
}
