import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from '../entities/teacher.entity';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}

    @Post()
    async create(@Body() teacherData: Partial<Teacher>): Promise<Teacher> {
        return this.teachersService.createTeacher(teacherData);
    }

    @Get()
    async findAll(): Promise<Teacher[]> {
        return this.teachersService.getAllTeachers();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Teacher> {
        return this.teachersService.getTeacherById(id);
    }
}