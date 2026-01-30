import { Module } from '@nestjs/common';
import { AvailabilityController } from './controller/availability.controller';
import { AvailabilityService } from './service/availability.service';
import { AvailabilityRepository } from './repository/availability.repository';
import { PrismaService } from 'src/common/service/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilityRepository, PrismaService, JwtAuthGuard],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}
