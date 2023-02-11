import express, { Request, Response } from 'express';
// @ts-ignore
import mmh3 from 'murmurhash3';

import client from '../db';
import validate from '../middlewares/validate';
import lookup from '../utils/lookup';
import CustomError from '../utils/error';

const router = express.Router();

const DOMAIN = process.env.DOMAIN || 'https://frodo.sigfried.xyz';

router.post(
  '/api/v1/shorten',
  validate,
  async (req: Request, res: Response, next) => {
    try {
      const { url } = req.body;

      const urlObject = new URL(url);
      const lookupRes = await lookup(urlObject.host);

      console.log(lookupRes);

      if (lookupRes) {
        const url_hash = mmh3.murmur32HexSync(url);

        const maybeKeyValue = await client.get(url_hash);
        if (!maybeKeyValue) {
          await client.set(url_hash, url);
        }

        res.json({ url: `${DOMAIN}/${url_hash}` });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

router.get('/api/v1/shorten/:id', async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const maybeUrl = await client.get(id);
    if (maybeUrl) {
      res.redirect(maybeUrl);
    } else {
      res.json({ text: 'URL not found' });
    }
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      next(error);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

export default router;
