// 3rd party libraries
const redis = require('redis');
const Promise = require('bluebird');

// configure redis to work with promises
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

// get redis client
const client = redis.createClient(process.env.REDIS_URI);

module.exports = client;