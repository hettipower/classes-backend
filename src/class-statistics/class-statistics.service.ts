import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ClassStatistics } from '../entities/class-statistics.entity';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class ClassStatisticsService {
    constructor(
        @InjectRepository(ClassStatistics)
        private classStatisticsRepository: Repository<ClassStatistics>,
    ) {}

    async createOrUpdateStatistics(data: {
        teacherId: number;
        classId: number;
        date: Date;
        totalRegistrations: number;
        totalClassFee: number;
    }): Promise<ClassStatistics> {
        const existingStats = await this.classStatisticsRepository.findOne({
            where: {
                teacher: { id: data.teacherId },
                class: { class_id: data.classId },
                date: data.date,
            },
        });

        if (existingStats) {
            existingStats.totalRegistrations = data.totalRegistrations;
            existingStats.totalClassFee = data.totalClassFee;
            return this.classStatisticsRepository.save(existingStats);
        }

        const newStats = this.classStatisticsRepository.create({
            teacher: { id: data.teacherId },
            class: { class_id: data.classId },
            date: data.date,
            totalRegistrations: data.totalRegistrations,
            totalClassFee: data.totalClassFee,
        });

        return this.classStatisticsRepository.save(newStats);
    }

    async getTeacherClassStatistics(teacherId: number, startDate?: Date, endDate?: Date): Promise<ClassStatistics[]> {
        const where: any = { teacher: { id: teacherId } };
        
        if (startDate && endDate) {
            where.date = Between(startDate, endDate);
        }

        return this.classStatisticsRepository.find({
            where,
            relations: ['class', 'teacher'],
            order: { date: 'DESC' },
        });
    }

    async getClassStatistics(classId: number, startDate?: Date, endDate?: Date): Promise<ClassStatistics[]> {
        const where: any = { class: { class_id: classId } };
        
        if (startDate && endDate) {
            where.date = Between(startDate, endDate);
        }

        return this.classStatisticsRepository.find({
            where,
            relations: ['teacher', 'class'],
            order: { date: 'DESC' },
        });
    }
} 