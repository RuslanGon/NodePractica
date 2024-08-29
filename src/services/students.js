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

export const getAllStudents = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = perPage * (page - 1);

  const studentsQuery = Student.find();

  if (filter.minAge) {
    studentsQuery.where("age").gte(filter.minAge);
  }
  if (filter.maxAge) {
    studentsQuery.where("age").lte(filter.maxAge);
  }
  if (filter.minAvgMark) {
    studentsQuery.where("avgMark").gte(filter.minAvgMark);
  }
  if (filter.maxAvgMark) {
    studentsQuery.where("avgMark").lte(filter.maxAvgMark);
  }
  if (filter.gender) {
    studentsQuery.where("gender").equals(filter.gender);
  }
  if (filter.onDuty !== undefined) {
    studentsQuery.where("onDuty").equals(filter.onDuty);
  }

  const [studentsCount, students] = await Promise.all([
    Student.find().merge(studentsQuery).countDocuments(),
    studentsQuery.skip(skip).limit(perPage).sort({
      [sortBy]: sortOrder
    }),
  ]);

  const paginationInformation = createInformationPagination(
    page,
    perPage,
    studentsCount,
  );

  return {
    students,
    ...paginationInformation,
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
