import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

// Routes
import * as routes from './routes';

import CustomError from './utils/error';

const app = express();

// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: 'http:/localhost:3001',
  }),
);
app.use(morgan('tiny'));

app.use(routes.shortenerRouter);
app.use(routes.indexRouter);

// eslint-disable-next-line
app.use((_req: Request, res: Response, _next: () => void) => {
  res.status(404).json({ status: 'error', reason: 'Route not found' });
});

// eslint-disable-next-line
app.use((err: CustomError, _req: Request, res: Response, _next: () => void) => {
  res.status(err.code || 500).json({ status: 'error', message: err.message });
});

export default app;
