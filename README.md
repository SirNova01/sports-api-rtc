# Sports API RTC

This is a **TypeScript Node.js** project designed for **low-latency real-time communication** to enhance the **Sports Betting App**. It leverages WebSockets and other real-time technologies to deliver fast updates and interactions.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (Check version with `node -v`)
- **Yarn** or **npm** (Check version with `yarn -v` or `npm -v`)
- **Redis** (for pub/sub messaging, if applicable)

## Getting Started
### 1. Clone the Repository
```sh
git clone https://github.com/SirNova01/Sports-API-RTC.git
cd Sports-API-RTC
```

### 2. Install Dependencies
Using Yarn:
```sh
yarn install
```
Or using npm:
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the necessary configurations:
```
PORT=4000
REDIS_URL=redis://localhost:6379
```
Modify values as needed.

### 4. Run the Server
Using Yarn:
```sh
yarn start
```
Or using npm:
```sh
npm run start
```
The API should now be running on `http://localhost:4000/`.

## Running Redis (If Required)
If Redis is used for real-time messaging, start the Redis server:
```sh
redis-server
```
Or using Docker:
```sh
docker run -d -p 6379:6379 redis
```

## Running in Development Mode
For hot-reloading during development, use:
```sh
yarn dev
```
Or with npm:
```sh
npm run dev
```
