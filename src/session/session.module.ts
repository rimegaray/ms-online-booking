import { Module } from '@nestjs/common';
import { SessionController } from './controller/session.controller';
import { SessionService } from './service/session.service';
import { SessionRepository } from './repository/session.repository';
import { PrismaService } from 'src/common/service/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  controllers: [SessionController],
  providers: [SessionService, SessionRepository, PrismaService, JwtAuthGuard],
  exports: [SessionService],
})
export class SessionModule {}
