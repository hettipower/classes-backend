import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
    ) {}

    async createTeacher(teacherData: Partial<Teacher>): Promise<Teacher> {
        const teacher = this.teacherRepository.create(teacherData);
        return this.teacherRepository.save(teacher);
    }

    async getAllTeachers(): Promise<Teacher[]> {
        return this.teacherRepository.find();
    }

    async getTeacherById(id: number): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new Error(`Teacher with id ${id} not found`);
        }
        return teacher;
    }
}