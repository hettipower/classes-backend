import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';
import { Subject } from '../entities/subject.entity';
import { CreateTeacherDto } from '../dto/teacher.dto';
import { In } from 'typeorm';


@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
    ) {}

    async createTeacher(teacherData: CreateTeacherDto): Promise<Teacher> {
        const { subjects: subjectIds, ...teacherDetails } = teacherData;
        
        // Find all subjects by their IDs
        const subjects = await this.subjectRepository.findBy({ subject_id: In(subjectIds) });
        if (subjects.length !== subjectIds.length) {
            throw new Error('One or more subject IDs are invalid');
        }

        // Create teacher with subjects
        const newTeacher = this.teacherRepository.create({
            ...teacherDetails,
            subjects
        });

        await this.teacherRepository.save(newTeacher);
        return newTeacher;
    }

    async getAllTeachers(): Promise<Teacher[]> {
        return this.teacherRepository.find({ relations: ['subjects'] });
    }

    async getTeacherById(id: number): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({ 
            where: { id },
            relations: ['subjects']
        });
        if (!teacher) {
            throw new Error(`Teacher with id ${id} not found`);
        }
        return teacher;
    }

    async getTeacherSubjects(teacherId: number): Promise<Subject[]> {
        const teacher = await this.teacherRepository.findOne({
            where: { id: teacherId },
            relations: ['subjects'],
        });

        if (!teacher) {
            throw new Error(`Teacher with ID ${teacherId} not found`);
        }

        return teacher.subjects;
    }
}