import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';

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
    throw new createHttpError(404, 'User not found');
  }

  const areEqual = await bcrypt.compare(password, user.password);
  if (!areEqual) {
    throw new createHttpError(401, 'Unauthorized');
  }

  return user;
};
