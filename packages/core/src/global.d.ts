declare global {
  const __DEV__: boolean;
  const __VERSION__: string;
  const inspect: (obj: any) => void;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
