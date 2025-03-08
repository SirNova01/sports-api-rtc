import { createClient } from 'redis';
import { CONFIG } from '../config';

type MessageHandler = (channel: string, message: string) => void;

export class RedisSubscriberService {
  private subscriberClient;
  private handlers: MessageHandler[] = [];

  constructor() {
    this.subscriberClient = createClient({
      socket: {
        host: CONFIG.REDIS_HOST,
        port: CONFIG.REDIS_PORT,
      },
    });
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.subscriberClient.on('error', (err) => console.error('Redis Subscriber Error', err));
    await this.subscriberClient.connect();
    console.log('Redis Subscriber connected.');

    // Subscribe to the channel(s) you care about here.
    // You can subscribe to multiple channels if needed.
    await this.subscriberClient.subscribe('leaderboard_updates', (message) => {
      this.handleMessage('leaderboard_updates', message);
    });
  }

  public onMessage(handler: MessageHandler): void {
    this.handlers.push(handler);
  }

  private handleMessage(channel: string, message: string): void {
    this.handlers.forEach((handler) => handler(channel, message));
  }
}
