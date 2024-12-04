import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthPassportGuard from './guards/jwt-auth-passport.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { VALIDATE_USER } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthPassportGuard)
  @MessagePattern(VALIDATE_USER)
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
