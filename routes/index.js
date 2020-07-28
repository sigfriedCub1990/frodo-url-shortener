const express = require('express');
const app = express();
const mmh3 = require('murmurhash3');

const { getAsync, setAsync } = require('../db');

const validate = require('../middlewares/validate');
const lookup = require('../utils/lookup');

const DOMAIN = process.env.DOMAIN || 'https://frodo.sigfried.xyz/';
    const { url } = req.body;

app.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const maybeUrl = await getAsync(id);
    if (maybeUrl) {
      res.redirect(maybeUrl);
    } else {
      res.json({ text: 'URL not found' });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = app;
