import { WebSocketServer } from 'ws';

export function startLocalWebSocketServer(port: number): WebSocketServer {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    console.log('Client connected to local Node.js WS');

    ws.on('close', () => {
      console.log('Client disconnected from local Node.js WS');
    });
  });

  return wss;
}
