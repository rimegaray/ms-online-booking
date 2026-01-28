import { Module } from '@nestjs/common';
import { AvailabilityController } from './controller/availability.controller';
import { AvailabilityService } from './service/availability.service';
import { AvailabilityRepository } from './repository/availability.repository';
import { PrismaService } from 'src/common/service/prisma.service';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilityRepository, PrismaService],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}
