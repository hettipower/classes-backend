import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject)
        private subjectsRepository: Repository<Subject>,
    ) {}

    async createSubject(subject_name: string): Promise<Subject> {
        const newHsubjectData = this.subjectsRepository.create({ subject_name });
        await this.subjectsRepository.save(newHsubjectData);
        return newHsubjectData;
    }

    findAll(): Promise<Subject[]> {
        return this.subjectsRepository.find();
    }

    async findOne(id: number): Promise<Subject> {
        const subject = await this.subjectsRepository.findOneBy({ subject_id: id });
        if (!subject) {
            throw new Error(`Subject with id ${id} not found`);
        }
        return subject;
    }

    async update(id: number, subject_name: string): Promise<Subject> {
        const subject = await this.subjectsRepository.findOneBy({ subject_id: id });
        if (!subject) {
            throw new Error(`Subject with id ${id} not found`);
        }
        subject.subject_name = subject_name;
        return this.subjectsRepository.save(subject);
    }

    async remove(id: number): Promise<void> {
        await this.subjectsRepository.delete(id);
    }
}