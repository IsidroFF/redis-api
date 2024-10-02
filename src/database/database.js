const redis = require("redis");
const dotenv = require('dotenv');

dotenv.config();

const redisConnection = redis.createClient({
  url: process.env.REDIS_URL,
});

module.exports = redisConnection