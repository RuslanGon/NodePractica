import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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

    return {
      user: user.toJSON(), // Возвращаем пользователя без пароля
      accessToken,
      refreshToken
    };
  };
