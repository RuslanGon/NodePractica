import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from '../db/models/session.js';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';
import { sendMail } from '../utils/sendMail.js';

const createSession = () => {

  return {
    accessToken: crypto.randomBytes(32).toString('base64'),
    refreshToken: crypto.randomBytes(32).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 минут
    refreshTokenValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
  };
};

export const createUser = async (payload) => {
    const saltRounds = 10; // Обычно используется 10 итераций
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    const userPayload = {
      ...payload,
      password: hashedPassword,
    };

    return await User.create(userPayload);
  };

  export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
      throw createHttpError(401, 'Unauthorized');
    }

    const session = await Session.create({
      userId: user._id,
      ...createSession()
    });

    return {
      user: user.toJSON(),
      sessionId: session._id
    };
  };

  export const logoutUser = async ({ sessionId, sessionToken }) => {
    return await Session.deleteOne({
      _id: sessionId,
      refreshToken: sessionToken,
    });
  };

  export const refreshSession = async ({ sessionId, sessionToken }) => {
    const session = await Session.findOne({
      _id: sessionId,
      refreshToken: sessionToken,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    if (new Date() > session.refreshTokenValidUntil){
      throw createHttpError(401, 'Refresh token is expired');

    }

    const user = await User.findById(session.userId);

    if (!user) {
      throw createHttpError(401, 'Session not found');
    }

    await Session.deleteOne({ _id: sessionId});

    return await Session.create({
      userId: user._id,
      ...createSession()
    });

  };

  export const emailUser = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User is not found');
    }
    const token = jwt.sign({ email }, env(ENV_VARS.JWT_SECRET), {
      expiresIn: '5m',
    });

    try {
      const resetLink = `https://yourdomain.com/reset-password?token=${token}`;
      await sendMail({
        html: `
        <h1>Hello ${user.name}</h1>
        <p>Here is your reset link: <a href="${resetLink}">Reset your password</a></p>
      `,
        to: email,
        from: env(ENV_VARS.SMTP_USER),
        subject: 'Reset your password',
      });
    } catch (error) {
      console.log(error);
      throw createHttpError(500, 'Problem sending email');

    }
  };
