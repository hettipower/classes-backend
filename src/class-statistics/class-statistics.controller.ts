import { Controller, Get, Post, Body, Param, Query, UsePipes, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ClassStatisticsService } from './class-statistics.service';
import { ClassStatistics } from '../entities/class-statistics.entity';
import { successResponse, errorResponse } from '../common/response.util';

@ApiTags('class-statistics')
@Controller('class-statistics')
export class ClassStatisticsController {
    constructor(private readonly classStatisticsService: ClassStatisticsService) {}

    @Post('update')
    @ApiOperation({ summary: 'Create or update class statistics' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Statistics updated successfully' })
    async updateStatistics(@Body() data: {
        teacherId: number;
        classId: number;
        date: Date;
        totalRegistrations: number;
        totalClassFee: number;
    }) {
        try {
            const result = await this.classStatisticsService.createOrUpdateStatistics(data);
            return successResponse(result, 'Class statistics updated successfully', 200);
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('teacher/:teacherId')
    @ApiOperation({ summary: 'Get class statistics for a teacher' })
    @ApiBearerAuth()
    @ApiQuery({ name: 'startDate', required: false, type: Date })
    @ApiQuery({ name: 'endDate', required: false, type: Date })
    @ApiResponse({ status: 200, description: 'List of class statistics' })
    async getTeacherStatistics(
        @Param('teacherId') teacherId: number,
        @Query('startDate') startDate?: Date,
        @Query('endDate') endDate?: Date,
    ) {
        try {
            const statistics = await this.classStatisticsService.getTeacherClassStatistics(
                teacherId,
                startDate,
                endDate,
            );
            return successResponse(statistics, 'Teacher class statistics fetched successfully', 200);
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('class/:classId')
    @ApiOperation({ summary: 'Get statistics for a specific class' })
    @ApiBearerAuth()
    @ApiQuery({ name: 'startDate', required: false, type: Date })
    @ApiQuery({ name: 'endDate', required: false, type: Date })
    @ApiResponse({ status: 200, description: 'List of class statistics' })
    async getClassStatistics(
        @Param('classId') classId: number,
        @Query('startDate') startDate?: Date,
        @Query('endDate') endDate?: Date,
    ) {
        try {
            const statistics = await this.classStatisticsService.getClassStatistics(
                classId,
                startDate,
                endDate,
            );
            return successResponse(statistics, 'Class statistics fetched successfully', 200);
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('all')
    @ApiOperation({ summary: 'Get all class statistics' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'List of all class statistics' })
    async getAllStatistics() {
        try {
            const statistics = await this.classStatisticsService.getAllClassStatistics();
            return successResponse(statistics, 'All class statistics fetched successfully', 200);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: any) {
        if (error instanceof BadRequestException) {
            return errorResponse('Validation failed', 'Bad Request', 400);
        }
        return errorResponse(error.message || 'An error occurred', 'Internal Server Error', 500);
    }
} 