import * as Joi from 'joi';

export const CreateClassSchema = Joi.object({
  class_name: Joi.string().min(3).required(),
  teacher: Joi.number().required(),
  subject: Joi.number().required(),
  registrationAmount: Joi.number().min(3).required(),
  classFeeAmount: Joi.number().min(3).required(),
  commission: Joi.number().min(1).required(),
  registrations: [Joi.number()],
  classFees: [Joi.number()],
});