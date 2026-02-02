import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthRepository } from "./repository/auth.repository";
import { PrismaService } from "src/common/service/prisma.service";
import { AuthController } from "./controller/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "./jwt/jwt.guard";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: '2H'},
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, PrismaService, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule {}