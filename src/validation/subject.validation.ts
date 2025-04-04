import * as Joi from 'joi';

export const CreateSubjectSchema = Joi.object({
  subject_name: Joi.string().min(3).max(30).required(),
});

export const EditSubjectSchema = Joi.object({
  subject_id: Joi.number().required(),
  subject_name: Joi.string().min(3).max(30).required(),
});