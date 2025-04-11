import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from '../entities/class.entity';
import { ClassStatisticsService } from '../class-statistics/class-statistics.service';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(ClassEntity)
        private classRepository: Repository<ClassEntity>,
        private classStatisticsService: ClassStatisticsService,
    ) {}

    async createClass(classData: Partial<ClassEntity>): Promise<ClassEntity> {
        const classEntity = this.classRepository.create(classData);
        const savedClass = await this.classRepository.save(classEntity);

        // Create a new entry in class-statistics
        await this.classStatisticsService.createOrUpdateStatistics({
            teacherId: savedClass.teacher.id,
            classId: savedClass.class_id,
            date: new Date(), // Assuming the current date for the statistics entry
            totalRegistrations: 0, // Initial value
            totalClassFee: 0, // Initial value
        });

        return savedClass;
    }

    async getAllClasses(): Promise<ClassEntity[]> {
        return this.classRepository.find({ relations: ['teacher', 'subject'] });
    }

    async getClassById(class_id: number): Promise<ClassEntity> {
        const classEntity = await this.classRepository.findOne({
            where: { class_id },
            relations: ['teacher','subject'],
        });
        if (!classEntity) {
            throw new Error(`Class with ID ${class_id} not found`);
        }
        return classEntity;
    }
}