import Joi from 'joi';

export const patchStudentSchema = Joi.object({
  name: Joi.string().min(2).max(20).messages({
      'string.min': 'Min string length is not achieved',
      'string.max': 'Max string length is not achieved',
    }),
  age: Joi.number().integer().min(7).max(17).messages({
      'number.base': 'Age must be a number',
      'number.min': 'Minimum age is 7',
      'number.max': 'Maximum age is 17',
    }),
  gender: Joi.string() .valid('male', 'female', 'other').messages({
      'any.only': 'Gender must be one of [male, female, other]',
    }),
  avgMark: Joi.number().min(1).max(12).messages({
      'number.base': 'Average mark must be a number',
      'number.min': 'Min number length is not achieved',
      'number.max': 'Max number length is not achieved',
    }),
  onDuty: Joi.boolean().messages({
    'boolean.base': 'OnDuty must be a boolean value',
  }),
});
