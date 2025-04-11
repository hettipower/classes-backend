import { Module } from '@nestjs/common';

import { ClassStatisticsController } from './class-statistics.controller';
import { ClassStatisticsService } from './class-statistics.service';
import { SupabaseService } from '../common/supabase.service';

@Module({
    controllers: [ClassStatisticsController],
    providers: [ClassStatisticsService, SupabaseService],
    exports: [ClassStatisticsService],
})
export class ClassStatisticsModule {}
