import { Router } from "express";
import { getAllStudents, getStudentById } from "../services/students.js";

const studentsRouter = Router();

studentsRouter.get('/students',async (req, res, next) => {
    const students =  await getAllStudents();
    res.json({
        status: 200,
        message: 'successfully get all students',
        data: students
    });
  });

  studentsRouter.get('/students/:studentId', async (req, res, next) => {
    const id = req.params.studentId;
    const student = await getStudentById(id);
    if(!student){
        res.status(404).json({
            status: 404,
            message: `not student with id ${id}`,
        });
    }

    res.json({
        status: 200,
        message: `successfully get student with id ${id}`,
        data: student
    });
  });


  export default studentsRouter;
