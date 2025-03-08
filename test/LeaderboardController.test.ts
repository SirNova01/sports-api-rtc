import { LeaderboardController } from '../src/controllers/LeaderboardController';
import { RedisSubscriberService } from '../src/services/RedisSubscriberService';
import { BroadcastingService } from '../src/services/BroadcastingService';
import { ILeaderboardPayload } from '../src/interfaces/ILeaderboardPayload';

describe('LeaderboardController', () => {
  it('should broadcast leaderboard updates when receiving a message', () => {
    const mockSubscriberService = {
      onMessage: jest.fn(),
    } as unknown as RedisSubscriberService;

    const mockBroadcastService = {
      broadcastGameUpdate: jest.fn(),
    } as unknown as BroadcastingService;

    // Instantiate controller
    new LeaderboardController(mockSubscriberService, mockBroadcastService);

    // Confirm the controller calls `onMessage`
    expect(mockSubscriberService.onMessage).toHaveBeenCalled();

    // Simulate receiving a Redis message
    const samplePayload: ILeaderboardPayload = {
      user_id: 123,
      name: 'John Doe',
      total_payout: 5000,
    };

    const controller = (LeaderboardController as any).prototype;
    controller.handleLeaderboardUpdates.call(
      { broadcastingService: mockBroadcastService },
      'leaderboard_updates',
      JSON.stringify(samplePayload)
    );

    expect(mockBroadcastService.broadcastGameUpdate).toHaveBeenCalledWith({
      type: 'leaderboard_update',
      data: samplePayload,
    });
  });
});
