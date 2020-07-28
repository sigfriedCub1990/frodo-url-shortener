const express = require('express');
const app = express();
const mmh3 = require('murmurhash3');

const { getAsync, setAsync } = require('../db');

const validate = require('../middlewares/validate');
const lookup = require('../utils/lookup');

const DOMAIN = process.env.DOMAIN || 'https://frodo.sigfried.xyz/';

app.post('/', validate, async (req, res, next) => {
  try {
    const { url } = req.body;

    const url_object = new URL(url);
    const lookup_res = await lookup(url_object.host);

    if (lookup_res) {
      let url_hash = mmh3.murmur32HexSync(url);

      const maybeKeyValue = await getAsync(url_hash);
      if (!maybeKeyValue) {
        await setAsync(url_hash, url);
      }

      res.json({ url: `${DOMAIN}/${url_hash}` });
    }
  } catch (err) {
    /*
     * INFO:
     * 1. We have three scenarios for errors:
     * 1.1 - DNS lookup
     * 1.2 - Invalid URL (will be handled by a middleware)
     * 1.3 - Redis error
     */
    next(err);
  }
});

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
