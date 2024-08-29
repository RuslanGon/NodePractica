import Joi from 'joi';

export const createStudentSchema = Joi.object({
name: Joi.string().required().min(2).max(20),
age: Joi.number().integer().required().min(7).max(17),
gender: Joi.string.required().valid('male', "female", "other"),
avgMark: Joi.number().required().min(1).max(12),
onDuty: Joi.boolean(),
});

