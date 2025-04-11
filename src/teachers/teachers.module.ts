import { Module } from '@nestjs/common';

import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { SupabaseService } from '../common/supabase.service';

@Module({
  providers: [TeachersService, SupabaseService],
  controllers: [TeachersController],
})
export class TeachersModule {}