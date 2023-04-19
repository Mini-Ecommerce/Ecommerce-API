import {
  Body,
  Controller,
  Get,
  Request,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDTO: Record<string, any>) {
    return this.authService.signIn(signInDTO.username, signInDTO.password);
  }

  @UseGuards(AuthGuard)
  @Get('authenticate')
  getProfile(@Request() req) {
    return req.user;
  }
}
