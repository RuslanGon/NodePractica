import { Router } from 'express';

import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  putStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/students/:studentId',
  validateMongoId('studentId'),
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post('/students', ctrlWrapper(createStudentController));

studentsRouter.patch(
  '/students/:studentId',
  validateMongoId('studentId'),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/students/:studentId',
  validateMongoId('studentId'),
  ctrlWrapper(putStudentController),
);

studentsRouter.delete(
  '/students/:studentId',
  validateMongoId('studentId'),
  ctrlWrapper(deleteStudentController),
);

export default studentsRouter;
