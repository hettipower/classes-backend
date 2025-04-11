import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassStatisticsModule } from './class-statistics/class-statistics.module';

import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    TeachersModule,
    ClassesModule,
    AuthModule,
    SubjectsModule,
    ClassStatisticsModule,
  ],
})
export class AppModule {}