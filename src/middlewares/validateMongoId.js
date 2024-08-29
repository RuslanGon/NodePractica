import createHttpError from 'http-errors';
import { Types } from 'mongoose';

export const validateMongoId = (req, res, next) => {
  const id = req.params.studentId;
  if (!Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, 'Invalid id'));
  }
  next();
};
