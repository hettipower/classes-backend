import * as Joi from 'joi';

export const CreateClassSchema = Joi.object({
  class_name: Joi.string().min(3).max(30).required(),
  teacher: Joi.number().min(3).max(30).required(),
  subject: Joi.number().min(3).max(30).required(),
  registrationAmount: Joi.number().min(3).max(30).required(),
  classFeeAmount: Joi.number().min(3).max(30).required(),
  commission: Joi.number().min(3).max(30).required(),
  registrations: [Joi.number()],
  classFees: [Joi.number()],
});