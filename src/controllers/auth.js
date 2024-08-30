import { createUser } from '../services/auth.js';

export const registorUserController = async (req, res, next) => {
  const user = await createUser(req.body);

  res.json({
    status: 200,
    message: 'User is created',
    data: { user },
  });
};
