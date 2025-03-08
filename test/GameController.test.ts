
import { GameController } from '../src/controllers/GameController';
import { WebSocketClientService } from '../src/services/WebSocketClientService';
import { BroadcastingService } from '../src/services/BroadcastingService';
import { RedisPublisherService } from '../src/services/RedisPublisherService';
import { IGamePayload } from '../src/interfaces/IGamePayload';

describe('GameController', () => {
  it('should handle incoming game payload correctly', async () => {
    // Mocks
    const mockWsClientService = {
      onMessage: jest.fn()
    } as unknown as WebSocketClientService;

    const mockBroadcastingService = {
      broadcastGameUpdate: jest.fn()
    } as unknown as BroadcastingService;

    // This replaces the old `RedisService` mock
    const mockRedisPublisherService = {
      publish: jest.fn().mockResolvedValue(true)
    } as unknown as RedisPublisherService;

    // Instantiate the controller with our mocked services
    new GameController(
      mockWsClientService, 
      mockBroadcastingService, 
      mockRedisPublisherService
    );

    // Simulate receiving a payload
    const samplePayload: IGamePayload = {
      game_id: 'G123',
      home_team: 'TeamA',
      away_team: 'TeamB',
      score: '1-0',
      status: 'in_progress',
      minute: 10,
      event: 'goal',
      event_team: 'TeamA',
      message: 'TeamA scored!',
      timestamp: new Date().toISOString(),
      odds: {
        home_win: 1.5,
        draw: 2.5,
        away_win: 3.5,
      },
    };

    // Manually call the handleGamePayload method
    // Bypassing actual WebSocket triggers for a direct test
    const controllerPrototype = (GameController as any).prototype; 
    await controllerPrototype.handleGamePayload.call(
      {
        broadcastingService: mockBroadcastingService,
        redisPublisher: mockRedisPublisherService
      },
      samplePayload
    );

    // Assertions
    expect(mockBroadcastingService.broadcastGameUpdate).toHaveBeenCalledWith(samplePayload);
    expect(mockRedisPublisherService.publish).toHaveBeenCalledWith(
      'game_updates', 
      JSON.stringify(samplePayload)
    );
  });
});
