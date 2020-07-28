const redis = require('redis');

const client = redis.createClient({
  host: process.env.db,
});

client.on('ready', () => {
  console.log('Redis instance operational.');
});

client.on('error', (err) => {
  console.log(err.message);
});

module.exports = client;
