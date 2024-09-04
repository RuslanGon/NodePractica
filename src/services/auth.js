import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from '../db/models/session.js';
import { env } from '../utils/env.js';
import { ENV_VARS, TEMPLATE_DIR } from '../constants/index.js';
import { sendMail } from '../utils/sendMail.js';
import { validateGoogleCode } from '../utils/googleOAuth.js';

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
    const token = jwt.sign({ email, sub: user._id }, env(ENV_VARS.JWT_SECRET), {
      expiresIn: '5m',
    });

const temlateSource = await fs.readFile(path.join(TEMPLATE_DIR, 'resetPassword.html'));
const temlate = handlebars.compile(temlateSource.toString());
const html = temlate({
name: user.name,
link:  `https://yourdomain.com/reset-password?token=${token}`
});
    try {
      await sendMail({
        html: html,
        to: email,
        from: env(ENV_VARS.SMTP_FROM),
        subject: 'Reset your password',
      });
    } catch (error) {
      console.log(error);
      throw createHttpError(500, 'Problem sending email');

    }
  };

  export const resetPassword = async ({ token, password }) => {
    let tokenPayload;

    try {
      tokenPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
    } catch (error) {
      console.log(error);
      throw createHttpError(401, 'Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { _id: tokenPayload.sub, email: tokenPayload.email },
      { password: hashedPassword }
    );

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    return {
      status: 'success',
      message: 'Password has been reset successfully',
    };
  };

export const loginOrSingUpGoogleOAuth = async (code) => {
const payload =  await validateGoogleCode(code);

if (!payload) throw createHttpError(401, 'Google OAuth authentication failed');

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    const hashPassword = await bcrypt.hash(crypto.randomBytes(32).toString('base64'), 10);
    user = await User.create({
      name: payload.given_name + ' ' + payload.family_name,
      email: payload.email,  // Добавление email в поле пользователя
      password: hashPassword,
    });
  }

  // Логика создания сессии
  const session = await Session.create({
    userId: user._id,
    ...createSession(),  // Используйте вашу функцию для создания сессии
  });

  return session;  // Возвращаем созданную сессию
};
