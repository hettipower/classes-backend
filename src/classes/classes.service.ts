import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from '../entities/class.entity';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(ClassEntity)
        private classRepository: Repository<ClassEntity>,
    ) {}

    async createClass(classData: Partial<ClassEntity>): Promise<ClassEntity> {
        const classEntity = this.classRepository.create(classData);
        return this.classRepository.save(classEntity);
    }

    async getAllClasses(): Promise<ClassEntity[]> {
        return this.classRepository.find({ relations: ['teacher', 'registrations', 'classFees'] });
    }

    async getClassById(id: number): Promise<ClassEntity> {
        const classEntity = await this.classRepository.findOne({
            where: { id },
            relations: ['teacher', 'registrations', 'classFees'],
        });
        if (!classEntity) {
            throw new Error(`Class with ID ${id} not found`);
        }
        return classEntity;
    }
}