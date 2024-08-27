import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundMiddleware } from './middlewares/notFoutdMiddleware.js';
import { errorhandlerMiddleware } from './middlewares/errorhandlerMiddleware.js';
import { getAllStudents, getStudentById } from './services/students.js';

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

  app.get('/students',async (req, res, next) => {
    const students =  await getAllStudents();
    res.json({
        status: 200,
        message: 'successfully get all students',
        data: students
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const id = req.params.studentId;
    const student = await getStudentById(id);
    if(!student){
        res.status(404).json({
            status: 404,
            message: `not student with id ${id}`,
        });
    }

    res.json({
        status: 200,
        message: `successfully get student with id ${id}`,
        data: student
    });
  });

  app.use(notFoundMiddleware);

  app.use(errorhandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
