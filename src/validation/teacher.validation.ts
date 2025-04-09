import * as Joi from 'joi';

export const CreateTeacherSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().min(10).max(15).required(),
  subjects: Joi.array().items(Joi.number().required()).min(1).required(),
});