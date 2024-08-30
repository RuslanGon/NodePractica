import Joi from 'joi';

export const registorUserSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  password: Joi.string().required().min(2).max(20),
  email: Joi.string().required().email(),
});

