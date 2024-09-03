import Joi from 'joi';

export const verifyGoogleSchema = Joi.object({
  code: Joi.string().required(),
});
