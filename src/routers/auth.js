import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { loginUserController, registorUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registorUserSchema } from '../validation/registerUserSchema.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registorUserSchema),
  ctrlWrapper(registorUserController),
);

authRouter.post('/login',
validateBody(loginUserSchema),
ctrlWrapper(loginUserController));

authRouter.post('/refresh-token');
authRouter.post('/logout');

export default authRouter;

