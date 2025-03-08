import { IGamePayload } from '../interfaces/IGamePayload';
import { WebSocketClientService } from '../services/WebSocketClientService';
import { BroadcastingService } from '../services/BroadcastingService';
import { RedisPublisherService } from '../services/RedisPublisherService';

export class GameController {
  private wsClientService: WebSocketClientService;
  private broadcastingService: BroadcastingService;
  private redisPublisher: RedisPublisherService;

  constructor(
    wsClientService: WebSocketClientService,
    broadcastingService: BroadcastingService,
    redisPublisher: RedisPublisherService
  ) {
    this.wsClientService = wsClientService;
    this.broadcastingService = broadcastingService;
    this.redisPublisher = redisPublisher;

    // Register handler for incoming WebSocket messages (game updates)
    this.wsClientService.onMessage(this.handleGamePayload.bind(this));
  }

  private async handleGamePayload(payload: IGamePayload | any) {
    // 1. Broadcast to connected Socket.io clients
    this.broadcastingService.broadcastGameUpdate(payload);

    // 2. Publish to Redis channel for Rails (or other consumers)
    await this.redisPublisher.publish('game_updates', JSON.stringify(payload));
  }
}
