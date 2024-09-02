import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from '../db/models/session.js';

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
      throw new createHttpError(401, 'Session not found');
    }

    if (new Date() > session.refreshTokenValidUntil){
      throw new createHttpError(401, 'Refresh token is expired');

    }

    const user = await User.findById(session.userId);

    if (!user) {
      throw new createHttpError(401, 'Session not found');
    }

    await Session.deleteOne({ _id: sessionId});

    return await Session.create({
      userId: user._id,
      ...createSession()
    });

  };


  export const emailUser = async (email) => {

  };
