import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassStatistics } from '../entities/class-statistics.entity';
import { ClassStatisticsController } from './class-statistics.controller';
import { ClassStatisticsService } from './class-statistics.service';

@Module({
    imports: [TypeOrmModule.forFeature([ClassStatistics])],
    controllers: [ClassStatisticsController],
    providers: [ClassStatisticsService],
    exports: [ClassStatisticsService],
})
export class ClassStatisticsModule {}
