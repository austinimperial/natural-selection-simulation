declare namespace NodeJS {
  export interface ProcessEnv {
    APP_ENV: 'development' | 'test' | 'preview' | 'staging' | 'production';
    NEXT_PUBLIC_TEST: string;
  }
}

export {};
