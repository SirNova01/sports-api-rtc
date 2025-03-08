import { WebSocket } from 'ws';
import { CONFIG } from '../config';
import { IGamePayload } from '../interfaces/IGamePayload';

export class WebSocketClientService {
  private ws: WebSocket | null = null;
  private messageHandlers: Array<(data: any) => void> = [];

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.ws = new WebSocket(CONFIG.SIMULATION_WS_URL);

    this.ws.on('open', () => {
      console.log('Connected to simulation WebSocket server.');
    });

    this.ws.on('message', (rawData: Buffer) => {
      let data: any;
      try {
        data = JSON.parse(rawData.toString());
        console.log(data);
      } catch (error) {
        console.error('Failed to parse WebSocket data:', error);
        return;
      }
      // Notify all handlers
      this.messageHandlers.forEach((handler) => handler(data));
    });

    this.ws.on('close', () => {
      console.log('WebSocket connection closed. Reconnecting in 5s...');
      setTimeout(() => this.connect(), 5000);
    });

    this.ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  }

  public onMessage(handler: (data: IGamePayload) => void): void {
    this.messageHandlers.push(handler);
  }
}
