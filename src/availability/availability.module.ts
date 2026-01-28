import { Module } from '@nestjs/common';
import { AvailabilityController } from './controller/availability.controller';
import { AvailabilityService } from './service/availability.service';
import { AvailabilityRepository } from './repository/availability.repository';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilityRepository],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}
