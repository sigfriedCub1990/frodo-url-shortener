import { Request, Response } from 'express';

import { lookup, CustomError } from '../utils/';
import logger from '../logger';
import Shortener from '../lib/shortener';

type Next = (err: Error | CustomError) => void;

const ShortenerController = {
  shortenUrl: async (req: Request, res: Response, next: Next) => {
    try {
      const { url } = req.body;

      const urlObject = new URL(url);
      const lookupRes = await lookup(urlObject.host);

      if (lookupRes) {
        const shortenerResponse = await Shortener.hashUrl(url);
        res.json(shortenerResponse);
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
