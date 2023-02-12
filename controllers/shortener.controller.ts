import { Request, Response } from 'express';
import mmh3 from 'murmurhash3';

import lookup from '../utils/lookup';
import client from '../db';
import CustomError from '../utils/error';
import logger from '../logger';

const DOMAIN = process.env.DOMAIN || 'https://frodo.sigfried.xyz';

type Next = (err: Error | CustomError) => void;

const ShortenerController = {
  shortenUrl: async (req: Request, res: Response, next: Next) => {
    try {
      const { url } = req.body;

      const urlObject = new URL(url);
      const lookupRes = await lookup(urlObject.host);

      if (lookupRes) {
        const urlHash = mmh3.murmur32HexSync(url);

        const maybeKeyValue = await client.get(urlHash);
        if (!maybeKeyValue) {
          await client.set(urlHash, url);
        }

        res.json({ status: 'success', url: `${DOMAIN}/${urlHash}` });
      }
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};

export default ShortenerController;
