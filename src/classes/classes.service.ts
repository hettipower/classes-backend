import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';
import { CreateClassDto } from '../dto/class.dto';

@Injectable()
export class ClassesService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async createClass(classData: CreateClassDto) {
        const response = await this.supabaseService.insert<CreateClassDto>('classes', classData);
        if (response.error) {
            throw new Error('Error creating class');
        }
        return response.data[0];
    }

    async getAllClasses() {
        const response = await this.supabaseService.query<CreateClassDto>('classes', '*');
        if (response.error) {
            throw new Error('Error fetching classes');
        }
        return response.data;
    }

    async getClassById(class_id: number) {
        const response = await this.supabaseService.query<CreateClassDto>('classes', '*', { class_id });
        if (response.error) {
            throw new Error('Error fetching class');
        }
        if (!response.data || response.data.length === 0) {
            throw new Error(`Class with ID ${class_id} not found`);
        }
        return response.data[0];
    }
}