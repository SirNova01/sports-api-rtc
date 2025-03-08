// import { createClient } from 'redis';
// import { CONFIG } from '../config';

// export class RedisService {
//   private client;

//   constructor() {
//     this.client = createClient({
//       socket: {
//         host: CONFIG.REDIS_HOST,
//         port: CONFIG.REDIS_PORT,
//       },
//     });
//     this.initialize();
//   }

//   private async initialize(): Promise<void> {
//     this.client.on('error', (err) => console.error('Redis Client Error', err));
//     await this.client.connect();
//     console.log('Connected to Redis successfully.');
//   }

//   public async publish(channel: string, message: string): Promise<void> {
//     try {
//       await this.client.publish(channel, message);
//     } catch (error) {
//       console.error('Failed to publish to Redis:', error);
//     }
//   }
// }
