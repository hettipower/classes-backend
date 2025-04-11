export interface CreateClassDto {
  class_id?: number;
  class_name: string;
  teacher_id: number;
  subject_id: number;
  registrationAmount: number;
  classFeeAmount: number;
  commission: number;
  created_at?: Date;
} 