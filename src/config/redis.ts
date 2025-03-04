// src/config/redis.ts
import Redis from 'ioredis';
import { config } from './env';

// Publisher connection
export const redisPublisher = new Redis({
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT)
});

// Subscriber connection
export const redisSubscriber = new Redis({
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT)
});

// Optional: log connection status
redisPublisher.on('connect', () => {
  console.log('Publisher connected to Redis at', `${config.REDIS_HOST}:${config.REDIS_PORT}`);
});
redisPublisher.on('error', (err) => {
  console.error('Redis publisher error:', err);
});

redisSubscriber.on('connect', () => {
  console.log('Subscriber connected to Redis at', `${config.REDIS_HOST}:${config.REDIS_PORT}`);
});
redisSubscriber.on('error', (err) => {
  console.error('Redis subscriber error:', err);
});




