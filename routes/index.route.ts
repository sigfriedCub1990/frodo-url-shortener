import express from 'express';

const router = express.Router();
import { IndexController } from '../controllers';

router.get('/:id', IndexController.getShortenedUrl);

export default router;
