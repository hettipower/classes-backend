import { Module } from '@nestjs/common';

import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SupabaseService } from '../common/supabase.service';

@Module({
  providers: [SubjectsService, SupabaseService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}