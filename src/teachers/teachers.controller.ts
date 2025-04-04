import { Controller, Get, Post, Body, Param, UsePipes, BadRequestException } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from '../entities/teacher.entity';
import { JoiValidationPipe } from '../common/joi-validation.pipe';
import { CreateTeacherSchema } from '../validation/teacher.validation';
import { successResponse, errorResponse } from '../common/response.util';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}

    @Post('create')
    @UsePipes(new JoiValidationPipe(CreateTeacherSchema))
    async createTeacher(@Body() teacherData: Teacher) {
        try {
            const teacherDataReturnData = await this.teachersService.createTeacher(teacherData);
            return successResponse(teacherDataReturnData, 'The teacher has been created successfully.', 200);
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('all')
    async getAllTeachers() {
        try {
            const teachers = await this.teachersService.getAllTeachers();
            return successResponse(teachers, 'All teachers fetched successfully', 200);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Teacher> {
        return this.teachersService.getTeacherById(id);
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