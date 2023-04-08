import { Request, Response } from 'express';

import logger from '../logger';
import CustomError from '../utils/error';
import Shortener from '../lib/shortener';

type Next = (err: Error | CustomError) => void;

const IndexController = {
  getShortenedUrl: async (req: Request, res: Response, next: Next) => {
    try {
      const id = req.params.id;
      const result = await Shortener.urlByHash(id);
      if (typeof result === 'string') {
        res.redirect(301, result);
      } else {
        res.status(404).json(result);
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
