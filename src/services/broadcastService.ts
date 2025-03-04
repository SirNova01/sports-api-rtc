import { WebSocketServer, WebSocket } from 'ws';
import { Redis } from 'ioredis';
import { GameEvent } from '../types/gameEvent';


export function broadcastEventToClients(
  wss: WebSocketServer,
  event: GameEvent
) {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(event));
    }
  });
}

export function publishEventToRedis(
  redis: Redis,
  channel: string,
  event: GameEvent
) {
  redis.publish(channel, JSON.stringify(event));
}

