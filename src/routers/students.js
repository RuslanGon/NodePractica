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
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/createStudentSchema.js';
import { patchStudentSchema } from '../validation/patchStudentSchema.js';

const studentsRouter = Router();

studentsRouter.use('/students/:studentId', validateMongoId('studentId'), );

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/students/:studentId',
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post('/students', validateBody(createStudentSchema), ctrlWrapper(createStudentController));

studentsRouter.patch(
  '/students/:studentId',
  validateBody(patchStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/students/:studentId',
  ctrlWrapper(putStudentController),
);

studentsRouter.delete(
  '/students/:studentId',
  ctrlWrapper(deleteStudentController),
);

export default studentsRouter;
