import { Module } from '@nestjs/common';
import { ServiceRepository } from './repository/service.repository';
import { ServiceService } from './service/service.service';
import { PrismaService } from 'src/common/service/prisma.service';
import { ServiceController } from './controller/service.controller';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository, PrismaService, JwtAuthGuard],
  exports: [ServiceService],
})
export class ServiceModule {}
