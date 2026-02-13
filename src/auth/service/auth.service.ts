import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { Auth } from '../model/auth.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authorize(auth: Auth, res: Response) {
    const user: User = await this.validateUser(auth);

    this.processAccessToken(user, res);
    await this.processRefreshToken(user, res);

    return user;
  }

  async refreshTokens(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    const auth = await this.validateRefreshToken(refreshToken);

    const user = await this.userService.getUserById(auth.user_id);
    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

    this.processAccessToken(user, res);
    await this.processRefreshToken(user, res);

    return { message: 'Tokens renovados' };
  }

  async deleteByRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (refreshToken) {
      await this.authRepository.deleteByRefreshToken(refreshToken);
    }

    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });

    return { message: 'Logout exitoso' };
  }

  private async validateUser(auth: Auth) {
    const user: User = await this.userService.getUserByUsername(auth.username);

    if (!user?.isActive) {
      throw new UnauthorizedException('Usuario inválido');
    }

    const validPassword = await bcrypt.compare(auth.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }

  private processAccessToken(user: User, res: Response) {
    const accessToken = this.jwtService.sign({
      sub: user.userId,
      entityId: user.entityId,
      username: user.username,
      role: user.profile,
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, //(cambiar a true en en producción)
      sameSite: 'lax', //TODO: 'strict' en producción
      maxAge: 120 * 60 * 1000,
      path: '/',
    });
  }

  private async processRefreshToken(user: User, res: Response) {
    const refreshToken = randomUUID();

    await this.authRepository.upsertRefreshToken(user.userId, refreshToken, user.entityId);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, //(cambiar a true en en producción)
      sameSite: 'lax',
      maxAge: 121 * 60 * 1000,
      path: '/',
    });
  }

  private async validateRefreshToken(refreshToken: any) {
    const auth = await this.authRepository.findByRefreshToken(refreshToken);

    if (!auth) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    if (auth.expires_at < new Date()) {
      throw new UnauthorizedException('Refresh token expirado');
    }
    return auth;
  }
}
