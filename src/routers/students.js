import { Router } from "express";

import { createStudentController, deleteStudentController, getStudentByIdController, getStudentsController } from "../controllers/students.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrlWrapper(createStudentController));

studentsRouter.delete('/students/:studentId', ctrlWrapper(deleteStudentController));




  export default studentsRouter;
