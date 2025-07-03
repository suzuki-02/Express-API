import express from 'express';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      origin === 'http://localhost:5173' ||
      origin === 'http://localhost:5174' ||
      origin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use(errorMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.json('Hello My World!');
});

export default app;
