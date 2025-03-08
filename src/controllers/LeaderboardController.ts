import { RedisSubscriberService } from '../services/RedisSubscriberService';
import { BroadcastingService } from '../services/BroadcastingService';
import { ILeaderboardPayload } from '../interfaces/ILeaderboardPayload';

export class LeaderboardController {
  private subscriberService: RedisSubscriberService;
  private broadcastingService: BroadcastingService;

  constructor(subscriberService: RedisSubscriberService, broadcastingService: BroadcastingService) {
    this.subscriberService = subscriberService;
    this.broadcastingService = broadcastingService;

    // Register the subscription handler
    this.subscriberService.onMessage(this.handleLeaderboardUpdates.bind(this));
  }

  private handleLeaderboardUpdates(channel: string, message: string) {
    if (channel !== 'leaderboard_updates') return;

    let payload: ILeaderboardPayload | null = null;
    try {
      payload = JSON.parse(message);
    } catch (error) {
      console.error('Failed to parse leaderboard update', error);
      return;
    }

    // Broadcast to front-end via Socket.io
    // For example, we can emit an event named "leaderboard_update"
    this.broadcastingService.broadcastGameUpdate({
      type: 'leaderboard_update',
      data: payload,
    });
  }
}
