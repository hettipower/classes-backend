import { Injectable } from '@nestjs/common';

import { SupabaseService } from '../common/supabase.service';
import { CreateTeacherDto } from '../dto/teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createTeacher(teacherData: CreateTeacherDto): Promise<CreateTeacherDto> {
    const { subjects: subjectIds, ...teacherDetails } = teacherData;
    
    const response = await this.supabaseService.insert<CreateTeacherDto>('teachers', {
      ...teacherDetails,
      subjects: subjectIds
    });

    if (response.error) {
      throw new Error('Error creating teacher');
    }

    return response.data[0];
  }

  async getAllTeachers(): Promise<CreateTeacherDto[]> {
    const response = await this.supabaseService.query<CreateTeacherDto>('teachers', '*');
    if (response.error) {
      throw new Error('Error fetching teachers');
    }
    return response.data;
  }

  async getTeacherById(id: number): Promise<CreateTeacherDto> {
    const response = await this.supabaseService.query<CreateTeacherDto>('teachers', '*', { id });
    if (response.error) {
      throw new Error('Error fetching teacher');
    }
    if (!response.data || response.data.length === 0) {
      throw new Error(`Teacher with id ${id} not found`);
    }
    return response.data[0];
  }
}