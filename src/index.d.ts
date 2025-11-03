import type { EnvConfig, NodeEnv } from './config/env';

// Project-level typings go here. Keep short and minimal for clarity
declare global {
  namespace NodeJS {
    interface ProcessEnv extends Partial<Record<keyof EnvConfig, string>> {
      NODE_ENV?: NodeEnv;
    }
  }
}

// keep this file a module so imports are allowed and augmentation is applied
export {};
