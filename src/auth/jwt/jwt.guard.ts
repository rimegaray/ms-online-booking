import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { Role } from "../roles/role.model";

export interface AuthUser {
  entityId: number;
  username: string;
  role: Role;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private secretKey;
    constructor(){
        this.secretKey = process.env.SECRET_KEY
    }
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies['access_token'];
    if (!token) return false;
    try {
      const payload = jwt.verify(token, this.secretKey);
      req.user = payload as AuthUser;
      return true;
    } catch {
      return false;
    }
  }
}