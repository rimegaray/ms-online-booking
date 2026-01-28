import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthRepository } from "./repository/auth.repository";
import { PrismaService } from "src/common/service/prisma.service";
import { AuthController } from "./controller/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: '1M'},
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, PrismaService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}