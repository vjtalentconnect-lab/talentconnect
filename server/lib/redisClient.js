import Redis from 'ioredis';

let redisClient = null;
let redisUnavailable = false; // prevents repeated connection attempts when Redis is down

export const getRedisClient = () => {
  if (!process.env.REDIS_URL || redisUnavailable) return null;
  if (redisClient) return redisClient;
  try {
    let loggedError = false;
    let loggedSuccess = false;
    redisClient = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
      connectTimeout: 5000,
      retryStrategy: () => null, // do not endlessly retry; fall back to memory store
    });
    redisClient.on('error', (err) => {
      if (!loggedError) {
        console.warn('[Redis] Connection error -- rate limiting will fall back to memory:', err.message);
        loggedError = true;
      }
      redisUnavailable = true;
      try { redisClient.disconnect(); } catch (_) {}
      redisClient = null;
    });
    redisClient.on('connect', () => {
      if (!loggedSuccess) {
        console.info('[Redis] Connected for rate limiting');
        loggedSuccess = true;
      }
    });
    return redisClient;
  } catch {
    console.warn('[Redis] Could not connect -- rate limiting will use in-memory store');
    redisUnavailable = true;
    return null;
  }
};
