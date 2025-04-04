import { Controller, Get, Post, Body, Param, UsePipes, BadRequestException } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassEntity } from '../entities/class.entity';
import { JoiValidationPipe } from '../common/joi-validation.pipe';
import { CreateClassSchema } from '../validation/class.validation';
import { successResponse, errorResponse } from '../common/response.util';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    @Post('create')
    @UsePipes(new JoiValidationPipe(CreateClassSchema))
    async createClass(@Body() classData: ClassEntity) {
        try {
            const classDataReturnData = await this.classesService.createClass(classData);
            return successResponse(classDataReturnData, 'The class has been created successfully.', 200);
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('all')
    async getAllSubjects() {
        try {
            const subjects = await this.classesService.getAllClasses();
            return successResponse(subjects, 'All classes fetched successfully', 200);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ClassEntity> {
        return this.classesService.getClassById(id);
    }
    
    private handleError(error: any) {

        if (error instanceof BadRequestException) {
            const validationErrors = error.getResponse();
            return errorResponse(
                'Validation failed',
                'Bad Request',
                400,
            );
        }
        return errorResponse(error.message || 'An error occurred', 'Internal Server Error', 500);
    }
}