import { WebSocket } from 'ws';
import { WebSocketServer } from 'ws';
import { Redis } from 'ioredis';
import { config } from '../config/env';
import { GameEvent } from '../types/gameEvent';
import { broadcastEventToClients, publishEventToRedis } from '../services/broadcastService';

export function reconnectExternalFeed(wss: WebSocketServer, redisPub: Redis, redisSub: Redis) {
  console.log('Attempting to reconnect to external feed...');
  const externalWs = new WebSocket(config.EXTERNAL_FEED_URL);

  externalWs.on('open', () => {
    console.log('Reconnected to external feed:', config.EXTERNAL_FEED_URL);
  });

  externalWs.on('message', (data: Buffer) => {
    try {
      const gameEvent: GameEvent = JSON.parse(data.toString());
      broadcastEventToClients(wss, gameEvent);
      publishEventToRedis(redisPub, 'game_updates', gameEvent);
      console.log('Received event after reconnection:', gameEvent);
    } catch (err) {
      console.error('Error parsing feed data (reconnection):', err);
    }
  });

  externalWs.on('close', () => {
    console.warn('Connection closed again. Retrying...');
    setTimeout(() => reconnectExternalFeed(wss, redisPub, redisSub), 5000);
  });

  externalWs.on('error', (error) => {
    console.error('External feed error (reconnection):', error);
  });
}
