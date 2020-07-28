const client = require('./db');
const { promisify } = require('util');

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  getAsync,
  setAsync,
};
