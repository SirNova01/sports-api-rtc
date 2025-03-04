import { WebSocket } from 'ws';
import { WebSocketServer } from 'ws';
import { Redis } from 'ioredis';
import { config } from '../config/env';
import { GameEvent } from '../types/gameEvent';
import { broadcastEventToClients, publishEventToRedis } from './broadcastService';
import { reconnectExternalFeed } from '../server/reconnect';

export function connectToExternalFeed(wss: WebSocketServer, redisPub: Redis, redisSub: Redis) {
  const externalWs = new WebSocket(config.EXTERNAL_FEED_URL);

  externalWs.on('open', () => {
    console.log('Connected to external feed:', config.EXTERNAL_FEED_URL);
  });

  externalWs.on('message', (data: Buffer) => {
    try {
      const gameEvent: GameEvent = JSON.parse(data.toString());
      // Broadcast to local WebSocket clients
      broadcastEventToClients(wss, gameEvent);

      // Publish to Redis channel for Rails consumption
      publishEventToRedis(redisPub, 'game_updates', gameEvent);

      console.log('Received event from external feed:', gameEvent);
    } catch (err) {
      console.error('Error parsing feed data:', err);
    }
  });

  externalWs.on('close', () => {
    console.warn('External feed connection closed. Reconnecting...');
    setTimeout(() => reconnectExternalFeed(wss, redisPub, redisSub), 5000);
  });

  externalWs.on('error', (error) => {
    console.error('External feed error:', error);
  });
}
