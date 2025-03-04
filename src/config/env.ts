import dotenv from 'dotenv';
dotenv.config();

export const config = {
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  EXTERNAL_FEED_URL: process.env.EXTERNAL_FEED_URL || 'wss://example-feed.com',
  LOCAL_WS_PORT: process.env.LOCAL_WS_PORT || '8080',
  NODE_ENV: process.env.NODE_ENV || 'development',
  RAILS_URL: process.env.RAILS_URL || 'http://localhost:3000'
};
