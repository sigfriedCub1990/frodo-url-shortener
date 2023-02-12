import { Request, Response } from 'express';

import client from '../db';
import logger from '../logger';
import CustomError from '../utils/error';

type Next = (err: Error | CustomError) => void;

const IndexController = {
  getShortenedUrl: async (req: Request, res: Response, next: Next) => {
    try {
      const id = req.params.id;
      const maybeUrl = await client.get(id);
      if (maybeUrl) {
        res.redirect(maybeUrl);
      } else {
        res.json({ status: 'error', reason: 'URL not found' });
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

export default IndexController;
