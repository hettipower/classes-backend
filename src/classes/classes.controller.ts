import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassEntity } from '../entities/class.entity';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    @Post()
    async create(@Body() classData: Partial<ClassEntity>): Promise<ClassEntity> {
        return this.classesService.createClass(classData);
    }

    @Get()
    async findAll(): Promise<ClassEntity[]> {
        return this.classesService.getAllClasses();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ClassEntity> {
        return this.classesService.getClassById(id);
    }
}