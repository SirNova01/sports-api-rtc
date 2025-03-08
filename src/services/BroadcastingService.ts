import { Server } from 'socket.io';

export class BroadcastingService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public broadcastGameUpdate(data: any): void {
    // You can adjust the event name as needed
    this.io.emit('game_update', data);
  }
}
