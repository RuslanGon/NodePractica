import { Router } from "express";

import { createStudentController, getStudentByIdController, getStudentsController } from "../controllers/students.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrlWrapper(createStudentController));



  export default studentsRouter;
