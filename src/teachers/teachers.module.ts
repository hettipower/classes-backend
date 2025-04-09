import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../entities/teacher.entity';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Subject } from '../entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Subject])],
  providers: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}