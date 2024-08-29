import createHttpError from 'http-errors';
import { Types } from 'mongoose';

export const validateMongoId = (idName = 'id') => (req, res, next) => {
  const id = req.params[idName];

  if (!id) {
    throw new Error('id in validateMonqoId is not found');
  }

  if (!Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, 'Invalid id'));
  }
  next();
};
