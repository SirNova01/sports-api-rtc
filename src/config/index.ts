export const CONFIG = {
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
    
    SIMULATION_WS_URL: process.env.SIMULATION_WS_URL || 'ws://localhost:9000',
    SOCKET_IO_PORT: parseInt(process.env.SOCKET_IO_PORT || '8080', 10),
};
  