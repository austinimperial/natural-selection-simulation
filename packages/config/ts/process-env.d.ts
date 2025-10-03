declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'dev' | 'test' | 'preview' | 'staging' | 'production';
      NEXT_PUBLIC_TEST: string;
    }
  }
}

export {};
