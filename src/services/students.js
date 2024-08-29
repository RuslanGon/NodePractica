import createHttpError from "http-errors";
import { Student } from "../db/models/student.js";

export const createInformationPagination = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviosPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviosPage,
    hasNextPage,
  };
};

export const getAllStudents = async ({ page = 1, perPage = 5 }) => {
  const skip = perPage * ( page - 1 );
  const studentsCount = await Student.find().countDocuments();
  const students = await Student.find().skip(skip).limit(perPage);
  const paginationInformation = createInformationPagination(page, perPage, studentsCount);
  return {
    students,
    ...paginationInformation
  };
};

export const getStudentById = async(id) => {
const student =  await Student.findById(id);
if(!student) {
throw createHttpError(404, 'Student not found');
}
return student;
};

export const createStudent = async (payload) => {
  const student = await Student.create(payload);
  return student;
};

export const deleteStudent = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};

export const patchStudent = async (id, payload, options = {}) => {
  const rawResult = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || rawResult.value) {
    throw createHttpError(404, 'Student not found');
  }
  return {
    student: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting
};

};
