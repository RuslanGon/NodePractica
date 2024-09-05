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

export const startServer = async () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use(cors());
  app.use(cookiesParser());

  app.use('/upload', express.static(UPLOAD_DIR));

  app.use(express.json());

  // Подключение основного роутера
  app.use(rootRouter);

  // Интеграция Swagger
  try {
    const swaggerMiddleware = await swagger(); // Ожидаем результат функции swagger
    app.use('/api-docs', ...swaggerMiddleware); // Используем middleware для Swagger
  } catch (error) {
    console.error('Error setting up Swagger middleware:', error);
  }

  // Middleware для обработки 404 ошибок
  app.use(notFoundMiddleware);

  // Общий обработчик ошибок
  app.use(errorhandlerMiddleware);

  // Запуск сервера
  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
