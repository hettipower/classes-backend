import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from '../entities/class.entity';
import { ClassStatistics } from '../entities/class-statistics.entity';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassStatisticsService } from '../class-statistics/class-statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassEntity, ClassStatistics]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService, ClassStatisticsService]
})
export class ClassesModule {}
