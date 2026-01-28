import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { AvailabilityRequestDto } from './dto/availability-request.dto';
import type { AvailabilityResponseDto } from './dto/availability-response.dto';
import { AvailabilityService } from '../service/availability.service';
import { AvailabilityMapper } from './mapper/availability.mapper';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  async upsertAvailability(
    @Body() dto: AvailabilityRequestDto,
  ): Promise<AvailabilityResponseDto> {
    const availability = AvailabilityMapper.toDomain(dto);
    const result = await this.availabilityService.upsertByDate(availability);
    return AvailabilityMapper.toResponseDto(result);
  }

  @Get('unavailability')
  async getUnavailabilityByPsychologist(
    @Query('psychologistId') psychologistId: number,
  ): Promise<AvailabilityResponseDto[]> {
    const availabilities =
      await this.availabilityService.findInactiveByPsychologistId(
        psychologistId,
      );
    return availabilities.map(AvailabilityMapper.toResponseDto);
  }
}
