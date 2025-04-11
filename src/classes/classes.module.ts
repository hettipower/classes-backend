import { Module } from '@nestjs/common';

import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { SupabaseService } from '../common/supabase.service';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, SupabaseService]
})
export class ClassesModule {}
