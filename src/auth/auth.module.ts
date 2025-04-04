import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: '4863d452b00a241824cd59c78ae2802d', // Replace with your actual secret key
      signOptions: { expiresIn: '60s' }, // Optional: Set token expiration
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController], 
  exports: [TypeOrmModule],
})
export class AuthModule {}