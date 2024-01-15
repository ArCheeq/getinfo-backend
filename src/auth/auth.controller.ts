import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Query('userType') userType: 'teacher' | 'student',
    @Body() dto: CreateUserDto,
  ) {
    switch (userType) {
      case 'teacher':
        return await this.userService.createUser(dto, userType);
      case 'student':
        return await this.userService.createUser(dto, userType);
      default:
        throw new BadRequestException({
          statusCode: 400,
          error: 'Incorrect userType query value',
          message: 'Некоректний тип користувача',
        });
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
