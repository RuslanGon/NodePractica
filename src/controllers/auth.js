

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

res.cookie('sessionId', session._id, {
httpOnly: true,
expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
} );

res.cookie('sessionToken', session.refreshToken, {
  httpOnly: true,
  expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  } );

  res.json({
    status: 200,
    message: 'User is logged in',
    data: { accessToken: session.accessToken  },
  });
};
