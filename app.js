const express = require('express');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const indexRoute = require('./routes/index');

app.use(helmet());
app.use(limiter);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(indexRoute);

app.use((req, res) => {
  res.status(404).end('Route not found');
});

app.use((err, req, res) => {
  console.log('Stack trace...');
  console.log(err.stack);
  res.status(err.code || 500).end(err.message);
});

module.exports = app;
