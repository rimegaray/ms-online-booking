import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { Auth } from '../model/auth.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { randomBytes, randomUUID } from 'crypto';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(auth: Auth, res: Response) {
    const { user, payload } = await this.authorize(auth);
    
        const token = this.jwtService.sign(payload);
    
        const refreshToken = randomUUID();
    
        await this.saveRefreshToken(user.userId, refreshToken, user.entityId);
    
        res.cookie('access_token', token, {
          httpOnly: true,
          secure: false, //(cambiar a true en en producción)
          sameSite: 'lax', //TODO: 'strict' en producción
          maxAge: 10 * 60 * 1000,
          path: '/',
        });
    
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: false, //(cambiar a true en en producción)
          sameSite: 'lax',
          maxAge: 120 * 60 * 1000,
          path: '/',
        });
    
        return { message: 'Login exitoso', user };
  }

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
        entityId: user.entity_id,
        profile: user.profile,
      },
      payload: {
        sub: user.user_id,
        entityId: user.entity_id,
        username: user.username,
        role: user.profile,
      },
    };
  }

  saveRefreshToken(userId: number, refreshToken: string, entityId: number) {
    return this.authRepository.saved(userId, refreshToken, entityId);
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

    const user = this.userService.getUserById(auth.user_id);
    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

    const payload = {
      sub: (await user).userId,
      entityId: (await user).entityId,
      username: (await user).username,
      role: (await user).profile,
    };
    
    const newAccessToken = this.jwtService.sign(payload);
    console.log({entityId: auth?.entity_id})
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
