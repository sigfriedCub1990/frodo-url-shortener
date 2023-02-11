import express, { Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Routes
import indexRoute from './routes';
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

app.use(indexRoute);

app.use((_: Request, res: Response, __: () => void) => {
  res.status(404).end('Route not found');
});

app.use((err: CustomError, _: Request, res: Response, __: () => void) => {
  res.status(err.code || 500).end(err.message);
});

export default app;
