import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/index.js';
import { notFoundMiddleware } from './middlewares/notFoutdMiddleware.js';
import { errorhandlerMiddleware } from './middlewares/errorhandlerMiddleware.js';
import rootRouter from './routers/index.js';
import cookiesParser from "cookie-parser";
import { swagger } from './middlewares/swagger.js';

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );


// app.use('/api-docs', swagger());
app.use('/api-docs', async (req, res, next) => {
  try {
    const swaggerMiddleware = await swagger();
    swaggerMiddleware(req, res, next);
  } catch (error) {
    next(error);
  }
});

  app.use(cors());

  app.use(cookiesParser());

  app.use('/upload', express.static(UPLOAD_DIR));

  app.use(express.json());

  app.use(rootRouter);

  app.use(notFoundMiddleware);

  app.use(errorhandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
