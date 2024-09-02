import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { emailController, loginUserController, logoutUserController, refreshTokenController, registorUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registorUserSchema } from '../validation/registerUserSchema.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { emailSchema } from '../validation/emailSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registorUserSchema),
  ctrlWrapper(registorUserController),
);

authRouter.post('/login',
validateBody(loginUserSchema),
ctrlWrapper(loginUserController));

authRouter.post('/refresh-token',
ctrlWrapper(refreshTokenController));

authRouter.post('/logout',
 ctrlWrapper(logoutUserController));

authRouter.post(
   '/email',
   validateBody(emailSchema),
   ctrlWrapper(emailController),
 );

export default authRouter;

