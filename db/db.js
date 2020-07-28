const redis = require('redis');

const client = redis.createClient();

client.on('ready', () => {
  console.log('Redis instance operational.');
});

client.on('error', (err) => {
  console.log(err.message);
});

module.exports = client;
