import {
    Controller,
    Post,
    Body,
    UsePipes,
    BadRequestException,
    HttpException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  
  import { AuthService } from './auth.service';
  import { JoiValidationPipe } from '../common/joi-validation.pipe';
  import { LoginSchema } from '../validation/user.validation';
  import { successResponse, errorResponse } from '../common/response.util';
  import { Public } from '../common/public.decorator';
  
  @Controller('auth')
  export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}
  
    @Public()
    @Post('login')
    @UsePipes(new JoiValidationPipe(LoginSchema))
    async login(@Body() loginDto) {
      
        const user = await this.authService.findByUsername(loginDto.username);
  
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
      
        if (isMatch) {
            const payload = {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                mobile: user.mobile,
                role_id: user.role && user.role.role_id ? user.role.role_id : null,
            };
    
            const token = this.jwtService.sign(payload);
    
            return successResponse(token, 'Login successfully.', 200);
        } else {
            throw new HttpException(
                errorResponse('Invalid credentials', '', 400),
                400,
            );
        }
  
      // }
    }
}
  