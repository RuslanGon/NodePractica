import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { registorUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registorUserSchema } from '../validation/registerUserSchema.js';

const authRouter = Router();

authRouter.post(
  '/registor',
  validateBody(registorUserSchema),
  ctrlWrapper(registorUserController),
);

authRouter.post('/login');
authRouter.post('/refresh-token');
authRouter.post('/logout');

export default authRouter;

