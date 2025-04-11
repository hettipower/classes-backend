import { Injectable, HttpException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';
import { errorResponse } from '../common/response';
import { UserDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findByUsername(username: string): Promise<UserDto> {
    const response = await this.supabaseService.query<UserDto>('users', '*', { username });
    if (response.error) {
      throw new HttpException(
        errorResponse('Error finding user', response.error.message, 500),
        500
      );
    }

    if (!response.data || response.data.length === 0) {
      throw new HttpException(
        errorResponse('Username does not exist', '', 400),
        400
      );
    }

    return response.data[0];
  }

  async createUser(userData: Partial<UserDto>): Promise<UserDto> {
    const response = await this.supabaseService.insert<UserDto>('users', userData);
    if (response.error) {
      throw new HttpException(
        errorResponse('Error creating user', response.error.message, 500),
        500
      );
    }
    return response.data[0];
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const response = await this.supabaseService.query<UserDto>('users', '*', { email });
    if (response.error) {
      throw new HttpException(
        errorResponse('Error finding user', response.error.message, 500),
        500
      );
    }

    if (!response.data || response.data.length === 0) {
      throw new HttpException(
        errorResponse('Email does not exist', '', 400),
        400
      );
    }

    return response.data[0];
  }

  async getUserByUserId(userId: number): Promise<UserDto> {
    const response = await this.supabaseService.query<UserDto>('users', '*', { user_id: userId });
    if (response.error) {
      throw new HttpException(
        errorResponse('Error finding user', response.error.message, 500),
        500
      );
    }

    if (!response.data || response.data.length === 0) {
      throw new HttpException(
        errorResponse('User Id does not exist', '', 400),
        400
      );
    }

    return response.data[0];
  }

  async updateUserPassword(userId: number, hashedPassword: string): Promise<UserDto> {
    const response = await this.supabaseService.update<UserDto>(
      'users',
      { password: hashedPassword },
      { user_id: userId }
    );

    if (response.error) {
      throw new HttpException(
        errorResponse('Error updating user', response.error.message, 500),
        500
      );
    }

    if (!response.data || response.data.length === 0) {
      throw new HttpException(
        errorResponse('User does not exist', '', 400),
        400
      );
    }

    return response.data[0];
  }
}