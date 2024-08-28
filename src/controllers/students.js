import { createStudent, getAllStudents, getStudentById } from "../services/students.js";

export const getStudentsController = async (req, res, next) => {
    const students =  await getAllStudents();
    res.json({
        status: 200,
        message: 'successfully get all students',
        data: students
    });
  };


  export const getStudentByIdController = async (req, res, next) => {
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
  };


  export const createStudentController = async (req, res, next) => {
    const { body } = req;
    const student = await createStudent(body);
    res.status(201).json({
        status: 201,
        message: `successfully created student`,
        data: student
    });
  };
