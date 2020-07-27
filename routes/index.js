const express = require('express');
const app = express();

app.post('/', (req, res) => {
    const { url } = req.body;
    res.json({ url })
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        id
    });
})

module.exports = app;
