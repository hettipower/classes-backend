import * as Joi from 'joi';

export const CreateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  full_name: Joi.string().required(),
  mobile: Joi.string().required(),
  role_id: Joi.number().required(),
});

export const EditUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  full_name: Joi.string().required(),
  mobile: Joi.string().required(),
  password: Joi.string().optional().allow(null, ''),
  role_id: Joi.number().required(),
});

export const LoginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});