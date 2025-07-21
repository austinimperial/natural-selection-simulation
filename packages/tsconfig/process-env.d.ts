declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly NEXT_PUBLIC_API_URL?: string;
      readonly NEXT_PUBLIC_VERCEL_URL?: string;
      readonly VERCEL_URL?: string;
    }
  }
}

export {};
