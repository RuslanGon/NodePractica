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
import { checkRoles } from '../middlewares/checkRoles.js';
import { upload } from '../middlewares/upload.js';
// import { authenticate } from '../middlewares/authenticate.js';

const studentsRouter = Router();

studentsRouter.use('/:studentId', validateMongoId('studentId'));
// studentsRouter.use('/', authenticate);

studentsRouter.get('/', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/:studentId',
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/',
  upload.single('avatar'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.patch(
  '/:studentId',
  checkRoles('teacher', 'parent'),
  validateBody(patchStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/:studentId',
  ctrlWrapper(putStudentController),
);

studentsRouter.delete(
  '/:studentId',
  ctrlWrapper(deleteStudentController),
);

export default studentsRouter;
