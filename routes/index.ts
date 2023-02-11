import express from 'express';

import validate from '../middlewares/validate';
import ShortenerController from '../controllers';

const router = express.Router();

router.post('/api/v1/shorten', validate, ShortenerController.shortenUrl);

router.get('/api/v1/shorten/:id', ShortenerController.getShortenedUrl);

export default router;
