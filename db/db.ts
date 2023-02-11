import { createClient } from 'redis';

const redistHost = process.env.db ?? 'redis://localhost:6379';
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
