import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { errorResponse } from '../common/response.util';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.Schema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      const errorMessage = error.details.map(err => err.message).join(', ');
      throw new BadRequestException(errorResponse(errorMessage, 'Validation failed', 400));
    }
    return value;
  }
}