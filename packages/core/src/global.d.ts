declare global {
  const __DEV__: boolean;
  const __VERSION__: string;

  var inspect: (obj: any) => void;

  interface Window {
    $$$$0: any;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
