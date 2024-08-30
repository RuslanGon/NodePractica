
import { createUser, loginUser } from '../services/auth.js';

export const registorUserController = async (req, res, next) => {
  const user = await createUser(req.body);

  res.json({
    status: 200,
    message: 'User is created',
    data: { user },
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  res.json({
    status: 200,
    message: 'User is logged in',
    data: { accessToken: session.accessToken  },
  });
};
