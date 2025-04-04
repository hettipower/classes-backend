import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, BadRequestException } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from '../entities/subject.entity';
import { JoiValidationPipe } from '../common/joi-validation.pipe';
import { CreateSubjectSchema } from '../validation/subject.validation';
import { successResponse, errorResponse } from '../common/response.util';


@Controller('subjects')
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @Post('create')
    @UsePipes(new JoiValidationPipe(CreateSubjectSchema))
    async createSubject(@Body() subjectData: Subject) {
        try {
            const subjectDataReturnData = await this.subjectsService.createSubject(subjectData.subject_name);
            return successResponse(subjectDataReturnData, 'The subject has been created successfully.', 200);
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('all')
    async getAllSubjects() {
        try {
            const subjects = await this.subjectsService.findAll();
            return successResponse(subjects, 'All subjects fetched successfully', 200);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Subject> {
        return this.subjectsService.findOne(Number(id));
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body('subject_name') subject_name: string,
    ): Promise<Subject> {
        return this.subjectsService.update(Number(id), subject_name);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.subjectsService.remove(Number(id));
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