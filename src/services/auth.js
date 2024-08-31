import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from '../db/models/session.js';

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

    const accessToken = crypto.randomBytes(32).toString('base64');
    const refreshToken = crypto.randomBytes(32).toString('base64');

    const session = await Session.create({
      accessToken,
      refreshToken,
      userId: user._id,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 минут
      refreshTokenValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
    });

    return {
      user: user.toJSON(), // Возвращаем пользователя без пароля
      accessToken,
      refreshToken,
      sessionId: session._id
    };
  };

  export const logoutUser = async ({ sessionId, sessionToken }) => {
    return await Session.deleteOne({
      _id: sessionId,
      refreshToken: sessionToken,
    });
  };

  export const refreshSessoin = async ({ sessionId, sessionToken }) => {
    const session = await Session.findOne({
      _id: sessionId,
      refreshToken: sessionToken,
    });

    if (!session) {
      throw new createHttpError(401, 'Session not found');
    }

    if (new Date() > session.refreshTokenValibUntil){
      throw new createHttpError(401, 'Refresh token is expired');

    }
  };
