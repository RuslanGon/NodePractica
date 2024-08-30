import { Router } from 'express';
import studentsRouter from './students.js';
import authRouter from './auth.js';

const rootRouter = Router();

rootRouter.use( studentsRouter);
rootRouter.use( authRouter);

export default rootRouter;

