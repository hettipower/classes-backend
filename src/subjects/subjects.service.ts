import { Injectable } from '@nestjs/common';

import { SupabaseService } from '../common/supabase.service';
import { SubjectDto } from '../dto/subject.dto';

@Injectable()
export class SubjectsService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async createSubject(subject_name: string): Promise<SubjectDto> {
        const response = await this.supabaseService.insert<SubjectDto>('subjects', { subject_name });
        if (response.error) {
            throw new Error('Error creating subject');
        }
        return response.data[0];
    }

    async findAll(): Promise<SubjectDto[]> {
        const response = await this.supabaseService.query<SubjectDto>('subjects', '*');
        if (response.error) {
            throw new Error('Error fetching subjects');
        }
        return response.data;
    }

    async findOne(id: number): Promise<SubjectDto> {
        const response = await this.supabaseService.query<SubjectDto>('subjects', '*', { subject_id: id });
        if (response.error) {
            throw new Error('Error fetching subject');
        }
        if (!response.data || response.data.length === 0) {
            throw new Error(`Subject with id ${id} not found`);
        }
        return response.data[0];
    }

    async update(id: number, subject_name: string): Promise<SubjectDto> {
        const response = await this.supabaseService.update<SubjectDto>(
            'subjects',
            { subject_name },
            { subject_id: id }
        );
        if (response.error) {
            throw new Error('Error updating subject');
        }
        return response.data[0];
    }

    async remove(id: number): Promise<void> {
        const response = await this.supabaseService.delete('subjects', { subject_id: id });
        if (response.error) {
            throw new Error('Error deleting subject');
        }
    }
}