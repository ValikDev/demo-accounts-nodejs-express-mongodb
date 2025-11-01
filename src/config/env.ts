export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test'
}

export interface EnvConfig {
  NODE_ENV: NodeEnv;
  PORT: number;
  MONGODB_URI: string;
  MONGODB_DB_NAME: string;
}

const DEFAULT_ENV = NodeEnv.Development;
const DEFAULT_PORT = 3000;
// Define default MongoDB connection values for simplicity
// In a real-world scenario, these would typically be received from environment variables on deployment
const DEFAULT_MONGODB_URI = 'mongodb://root:example@localhost:27017';
const DEFAULT_MONGO_DB_NAME = 'collections_db';

function validateNodeEnv(env: string | undefined): NodeEnv {
  return Object.values(NodeEnv).includes(env as NodeEnv)
    ? (env as NodeEnv)
    : DEFAULT_ENV;
}

function validatePort(port: string | undefined): number {
  const parsedPort = port ? parseInt(port, 10) : DEFAULT_PORT;

  return isNaN(parsedPort) ? DEFAULT_PORT : parsedPort;
}

export const env: EnvConfig = {
  NODE_ENV: validateNodeEnv(process.env.NODE_ENV),
  PORT: validatePort(process.env.PORT),
  MONGODB_URI: process.env.MONGODB_URI || DEFAULT_MONGODB_URI,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || DEFAULT_MONGO_DB_NAME,
};
