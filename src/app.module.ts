import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Teacher } from './entities/teacher.entity';
import { ClassEntity } from './entities/class.entity';
import { Registration } from './entities/registration.entity';
import { ClassFee } from './entities/class-fee.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Subject } from './entities/subject.entity';

import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';

import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the config module available globally
      envFilePath: [`.env`], // Load the correct .env file based on NODE_ENV
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        Teacher, 
        ClassEntity, 
        Registration, 
        ClassFee, 
        User, 
        Role,
        Subject
      ],
      synchronize: true, // Use migrations in production
    }),
    TeachersModule,
    ClassesModule,
    AuthModule,
    SubjectsModule,
  ],
})
export class AppModule {}