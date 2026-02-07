import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthRepository } from "./repository/auth.repository";
import { PrismaService } from "src/common/service/prisma.service";
import { AuthController } from "./controller/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "./jwt/jwt.guard";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: '2H'},
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, PrismaService, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule {}