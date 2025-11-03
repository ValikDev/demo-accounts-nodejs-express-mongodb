import { MongoClient } from 'mongodb';

import { env } from '../config/env';
import { Collections } from '../types';
import { logger } from '../utils/logger';

const MONGO_DB_CONNECTION_TIMEOUT_MS = 2500;

// Existing MongoDB client
let client: MongoClient | null = null;

// In-flight MongoDB connection promise
let connecting: Promise<MongoClient> | null = null;

async function isConnectionValid(): Promise<boolean> {
  if (!client) {
    return false;
  }

  try {
    await client.db(env.MONGODB_DB_NAME).command({ ping: 1 });

    return true;
  } catch (error) {
    logger.warn(
      'MongoDB connection check failed:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return false;
  }
}

export async function connectToDatabase(): Promise<MongoClient> {
  // Reuse existing valid connection
  if (await isConnectionValid()) {
    return client!;
  }

  // If there's an in-flight connect, await it (prevents multiple concurrent connects)
  if (connecting) {
    return connecting;
  }

  // Start a single connect attempt for all callers
  connecting = (async () => {
    try {
      client = new MongoClient(env.MONGODB_URI!, {
        serverSelectionTimeoutMS: MONGO_DB_CONNECTION_TIMEOUT_MS,
      });

      await client.connect();
      logger.info('Connected to MongoDB');

      return client!;
    } catch (error) {
      // Clear client so next attempt starts fresh
      client = null;

      logger.error(
        'Failed to connect to MongoDB:',
        error instanceof Error ? error.message : 'Unknown error'
      );

      throw new Error(
        'Database connection failed. Please check MongoDB connection and try again.'
      );
    } finally {
      // Clear the connecting promise so future attempts can start a new one
      connecting = null;
    }
  })();

  return connecting;
}

export async function getDb() {
  const client = await connectToDatabase();

  return client.db(env.MONGODB_DB_NAME);
}

export async function getCollection<K extends keyof Collections>(name: K): Promise<Collections[K]> {
  const db = await getDb();

  return db.collection(name);
}

export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    logger.info('Disconnected from MongoDB');
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});
