import createHttpError from "http-errors";
import { Student } from "../db/models/student.js";

export const checkRoles = (...roles) => async (req, res, next) => {
  const user = req.user;
  const { studentId } = req.params;

  if (roles.includes('teacher') && user.roles === 'teacher') {
    return next(); // Учитель, роль подходит, передаем управление дальше
  }

  if (roles.includes('parent') && user.roles === 'parent') {
    const student = await Student.findOne({ _id: studentId, parentId: user._id });

    if (!student) {
      return next(createHttpError(403, 'This child does not belong to you'));
    }

    return next();
  }

  return next(createHttpError(403, 'You do not have access'));
};
