import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/common/service/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { EmailModule } from 'src/mail/email.module';

@Module({
  imports:[EmailModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}
