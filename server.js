const express = require('express');
const app = express();
const http = require('http');

const indexRoute = require('./routes/index');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable('x-powered-by');

app.use(indexRoute);

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

