import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundMiddleware } from './middlewares/notFoutdMiddleware.js';
import { errorhandlerMiddleware } from './middlewares/errorhandlerMiddleware.js';
import rootRouter from './routers/index.js';
import cookieParser from "cookie-parser";

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(cookieParser);

  app.use(express.json());

  app.use(rootRouter);

  app.use(notFoundMiddleware);

  app.use(errorhandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
