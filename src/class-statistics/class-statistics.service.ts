import { Injectable } from '@nestjs/common';

import { SupabaseService } from '../common/supabase.service';
import { ClassStatisticsDto } from '../dto/class-statistics.dto';

@Injectable()
export class ClassStatisticsService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async createOrUpdateStatistics(data: ClassStatisticsDto): Promise<ClassStatisticsDto> {
        const { teacherId, classId, date, totalRegistrations, totalClassFee } = data;
        
        const response = await this.supabaseService.insert<ClassStatisticsDto>('class_statistics', {
            teacher_id: teacherId,
            class_id: classId,
            date,
            totalRegistrations,
            totalClassFee
        });

        if (response.error) {
            throw new Error('Error creating/updating statistics');
        }

        return response.data[0];
    }

    async getTeacherClassStatistics(teacherId: number, startDate?: Date, endDate?: Date): Promise<ClassStatisticsDto[]> {
        let query = this.supabaseService.query<ClassStatisticsDto>('class_statistics', '*', { teacher_id: teacherId });
        
        if (startDate && endDate) {
            query = this.supabaseService.query<ClassStatisticsDto>(
                'class_statistics',
                '*',
                { 
                    teacher_id: teacherId,
                    date: { gte: startDate, lte: endDate }
                }
            );
        }

        const response = await query;
        if (response.error) {
            throw new Error('Error fetching teacher statistics');
        }
        return response.data;
    }

    async getClassStatistics(classId: number, startDate?: Date, endDate?: Date): Promise<ClassStatisticsDto[]> {
        let query = this.supabaseService.query<ClassStatisticsDto>('class_statistics', '*', { class_id: classId });
        
        if (startDate && endDate) {
            query = this.supabaseService.query<ClassStatisticsDto>(
                'class_statistics',
                '*',
                { 
                    class_id: classId,
                    date: { gte: startDate, lte: endDate }
                }
            );
        }

        const response = await query;
        if (response.error) {
            throw new Error('Error fetching class statistics');
        }
        return response.data;
    }
} 