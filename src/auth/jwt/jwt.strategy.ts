import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//@Injectable()
export class JwtStrategy {//extends PassportStrategy(Strategy) {
  /*constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    // Lo que retornes aquí estará en request.user
    return {
      userId: payload.sub,
      username: payload.username,
      profile: payload.role,
    };
  }*/
}