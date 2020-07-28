const express = require('express');
const app = express();
const http = require('http');

const indexRoute = require('./routes/index');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable('x-powered-by');

app.use(indexRoute);

app.use((req, res) => {
  res.status(404).end('Route not found');
});

app.use((err, req, res, next) => {
  console.log('Stack trace...');
  console.log(err.stack);
  res.status(err.code || 500).end(err.message);
});

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
