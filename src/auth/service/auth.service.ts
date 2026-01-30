import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { Auth } from '../model/auth.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authorize(auth: Auth) {
    const user = await this.authRepository.findByUsername(auth.username);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await bcrypt.compare(auth.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    this.validateActive(user.is_active);

    return {
      user: {
        userId: user.user_id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        profile: user.profile,
      },
      payload: {
        userId: user.user_id,
        username: user.username,
        role: user.profile,
      },
    };
  }

  saveRefreshToken(userId: number, refreshToken: string) {
    return this.authRepository.saved(userId, refreshToken);
  }

  async refreshTokens(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    const auth = await this.authRepository.findByRefreshToken(refreshToken);

    if (!auth) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    if (auth.expires_at < new Date()) {
      throw new UnauthorizedException('Refresh token expirado');
    }
    const newAccessToken = this.jwtService.sign({ sub: auth?.user_id });
    const newRefreshToken = randomBytes(64).toString('hex');

    const newExpiresAt = new Date(Date.now() + 120 * 60 * 1000);
    await this.authRepository.updateRefreshToken(
      auth.auth_id,
      newRefreshToken,
      newExpiresAt,
    );

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: false, //(cambiar a true en en producción)
      sameSite: 'strict',
      maxAge: 10 * 60 * 1000,
      path: '/',
    });

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: false, //(cambiar a true en en producción)
      sameSite: 'strict',
      maxAge: 120 * 60 * 1000,
      path: '/',
    });

    return { message: 'Tokens renovados' };
  }

  async deleteByRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if(refreshToken){
        await this.authRepository.deleteByRefreshToken(refreshToken);
    }

    res.clearCookie('access_token', {path: '/'});
    res.clearCookie('refresh_token', {path: '/'});

    return { message: 'Logout exitoso' };
  }

  validateActive(isActive: boolean) {
    if (!isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }
  }
}
