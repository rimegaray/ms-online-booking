import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { AuthRequestDto } from "./dto/auth-request.dto";
import { JwtService } from "@nestjs/jwt";
import type { Request, Response } from "express";
import { randomUUID } from "crypto";

@Controller('/auth')
export class AuthController {

    constructor( 
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) {}

    @Post()
    async authorization(
        @Body() authRequestDto: AuthRequestDto,
        @Res({ passthrough: true }) res: Response
    ) {
        
        const {user, payload }= await this.authService.authorize(authRequestDto);

        const token = this.jwtService.sign(payload);

        const refreshToken = randomUUID();

        await this.authService.saveRefreshToken(user.userId, refreshToken);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false, //(cambiar a true en en producción)
            sameSite: 'lax',
            maxAge: 10 * 60 * 1000,
            path:'/',
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false, //(cambiar a true en en producción)
            sameSite: 'lax',
            maxAge: 120 * 60 * 1000,
            path:'/',
        })

        return { message: 'Login exitoso', user }
    }

    @Post('refresh')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ){
        return await this.authService.refreshTokens(req, res);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        return await this.authService.deleteByRefreshToken(req, res);
    }
}