import { createClient, RedisClientType } from 'redis';
let redisClient: RedisClientType | null = null;

export async function getRedisClient() {
    if (!redisClient) {

        const client = createClient({
            url: process.env.REDIS_URL
        });

        client.on('error', (err: string) => console.error('Redis Client Error', err));

        await client.connect();
        redisClient = client as RedisClientType;
    }
    return redisClient;
}