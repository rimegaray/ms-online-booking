import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "../repository/auth.repository";
import { Auth } from "../model/auth.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor( 
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) {}

    async authorize(auth: Auth) {
        const user = await this.authRepository.findByUsername(auth.username);

        if(!user){
            throw new UnauthorizedException('Credenciales inválidas')
        }

        const passwordValid = await bcrypt.compare(auth.password, user.password); 

        if(!passwordValid){
            throw new UnauthorizedException('Credenciales inválidas')
        }
        
        const payload = {
            sub: user.user_id,
            username: user.username,
            role: user.profile
        };

        return {
            name: user.name,
            lastname: user.lastname,
            profile: user.profile,
            accsessToken: this.jwtService.sign(payload),
        };
    }
}