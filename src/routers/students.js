import { Router } from "express";

import { createStudentController, deleteStudentController, getStudentByIdController, getStudentsController, patchStudentController, putStudentController } from "../controllers/students.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrlWrapper(createStudentController));

studentsRouter.patch('/students/:studentId', ctrlWrapper(patchStudentController));

studentsRouter.put('/students/:studentId', ctrlWrapper(putStudentController));


studentsRouter.delete('/students/:studentId', ctrlWrapper(deleteStudentController));




  export default studentsRouter;
