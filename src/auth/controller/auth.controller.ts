import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post()
  async authorization(
    @Body() authRequestDto: AuthRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.getToken(authRequestDto, res);
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshTokens(req, res);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.deleteByRefreshToken(req, res);
  }
}
