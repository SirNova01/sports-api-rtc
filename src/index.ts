// index.ts (or server.ts)
import http from 'http';
import express from 'express';
import { Server as SocketIOServer } from 'socket.io';

import { CONFIG } from './config';
import { WebSocketClientService } from './services/WebSocketClientService';
import { RedisPublisherService } from './services/RedisPublisherService';
import { RedisSubscriberService } from './services/RedisSubscriberService';
import { BroadcastingService } from './services/BroadcastingService';
import { GameController } from './controllers/GameController';
import { LeaderboardController } from './controllers/LeaderboardController';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' },
});

// Instantiate services
const wsClientService = new WebSocketClientService();
const redisPublisherService = new RedisPublisherService();
const redisSubscriberService = new RedisSubscriberService();
const broadcastingService = new BroadcastingService(io);

// Controllers
new GameController(wsClientService, broadcastingService, redisPublisherService);
new LeaderboardController(redisSubscriberService, broadcastingService);

app.get('/', (req, res) => {
  res.send('Node.js service is running.');
});

server.listen(CONFIG.SOCKET_IO_PORT, () => {
  console.log(`Server listening on port ${CONFIG.SOCKET_IO_PORT}`);
});
