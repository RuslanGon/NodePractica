
import { createUser, emailUser, loginOrSingUpGoogleOAuth, loginUser, logoutUser, refreshSession, resetPassword } from '../services/auth.js';
import { generateOAuthURL } from '../utils/googleOAuth.js';

const setupSessionCookies = (res, session) => {

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    } );

    res.cookie('sessionToken', session.refreshToken, {
      httpOnly: true,
      expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      } );
};

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

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'User is logged in',
    data: { accessToken: session.accessToken  },
  });
};

export const logoutUserController = async (req, res, next) => {
  await logoutUser({
sessionId: req.cookies.sessionId,
sessionToken: req.cookies.sessionToken
  });

res.clearCookie('sessionId');

res.clearCookie('sessionToken');

  res.status(204).json({
    status: 204,
    message: 'User is logged out',
    data: { },
  });
};


export const refreshTokenController = async (req, res, next) => {
const { sessionId, sessionToken } = req.cookies;
const session = await refreshSession({ sessionId, sessionToken });

setupSessionCookies(res, session);

    res.json({
      status: 200,
      message: 'Token refreshed successfully',
      data: { accessToken: session.accessToken  },
    });
};


export const emailController = async(req, res) => {
await emailUser(req.body.email);

res.json({
  status: 200,
  message: 'Reset password email was successfully',
  data: {},
});
};

export const resetPassworController = async(req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password was successfully reset',
    data: {},
  });
  };

export const getOAuthUrlController = (req, res) => {
const url = generateOAuthURL();
res.json({
status: 200,
message: 'Successfully received OAuth URL',
data: {url}
});
};

export const verifyOAuthController = async (req, res) => {
  const {code} = req.body;
  const url = await loginOrSingUpGoogleOAuth(code);
  res.json({
  status: 200,
  message: 'Successfully received OAuth URL',
  data: {url}
  });
  };
