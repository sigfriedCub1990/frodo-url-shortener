import express from 'express';

import validate from '../middlewares/validate';
import { ShortenerController } from '../controllers';

const router = express.Router();

router.post('/api/v1/shorten', validate, ShortenerController.shortenUrl);

export default router;
