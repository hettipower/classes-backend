import * as Joi from 'joi';

export const CreateTeacherSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  contactNo: Joi.string().min(10).max(10).required(),
  teachingSubject: Joi.number().min(3).max(30).required(),
});