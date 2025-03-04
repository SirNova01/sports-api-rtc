
import { connectToExternalFeed } from './services/externalFeed';
import { config } from './config/env';
import { redisPublisher, redisSubscriber } from './config/redis';
import { startLocalWebSocketServer } from './server/localWsServer';
import WebSocket from 'ws';


const localWSPort = Number(config.LOCAL_WS_PORT) || 8080;
const wss = startLocalWebSocketServer(localWSPort);
console.log(`Local WebSocket server started on ws://localhost:${localWSPort}`);

connectToExternalFeed(wss, redisPublisher, redisSubscriber);

// Subscribe to the leaderboard channel
redisSubscriber.subscribe('leaderboard_updates', (err, count) => {
  if (err) {
    console.error('Failed to subscribe:', err);
  } else {
    console.log(`Subscribed to ${count} channel(s).`);
  }
});

// Listen for published messages
redisSubscriber.on('message', (channel, message) => {
  if (channel === 'leaderboard_updates') {
    const data = JSON.parse(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'LEADERBOARD_UPDATE',
          payload: data
        }));
      }
    });
  }
});

