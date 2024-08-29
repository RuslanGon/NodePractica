import { createStudent, deleteStudent, getAllStudents, getStudentById, patchStudent } from "../services/students.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getStudentsController = async (req, res, next) => {
const { page, perPage } = parsePaginationParams(req.query);
    const students =  await getAllStudents({ page, perPage });
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

  export const deleteStudentController = async (req, res, next) => {
    const id = req.params.studentId;
    await deleteStudent(id);
    res.status(204).send();
  };

  export const patchStudentController = async (req, res, next) => {
    const { body } = req;
    const { studentId } = req.params;
    const { student } = await patchStudent(studentId, body);
    res.status(200).json({
        status: 200,
        message: `successfully patched student`,
        data: student
    });
  };


  export const putStudentController = async (req, res, next) => {
    const { body } = req;
    const { studentId } = req.params;
    const { isNew, student } = await patchStudent(studentId, body, {
      upsert: true,
    });
    const status = isNew ? 201 : 200;
    res.status(status).json({
      status: status,
      message: `successfully put student`,
      data: student,
    });
  };

