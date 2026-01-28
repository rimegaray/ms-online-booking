import { Module } from '@nestjs/common';
import { SessionController } from './controller/session.controller';
import { SessionService } from './service/session.service';
import { SessionRepository } from './repository/session.repository';
import { PrismaService } from 'src/common/service/prisma.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, SessionRepository, PrismaService],
  exports: [SessionService],
})
export class SessionModule {}
