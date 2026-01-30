import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private secretKey;
    constructor(){
        this.secretKey = process.env.SECRET_KEY
    }
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies['access_token']; // 🔑 leer cookie
    if (!token) return false;
    try {
      const payload = jwt.verify(token, this.secretKey);
      req.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}