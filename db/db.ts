import { createClient } from 'redis';

// TODO: Abstract configuration
const redistHost = process.env.DB_HOST
  ? `redis://${process.env.DB_HOST}:6379`
  : 'redis://localhost:6379';

console.log(`Connecting to: ${redistHost}`);
const client = createClient({
  url: redistHost,
});

client.on('ready', () => {
  console.log('Redis instance operational.');
});

client.on('error', (err) => {
  console.log(err.message);
});

client
  .connect()
  .then()
  .catch((err) => console.error(err));

export default client;
