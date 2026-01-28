import type { Availability } from '../../model/availability.model';
import type { AvailabilityRequestDto } from '../dto/availability-request.dto';
import type { AvailabilityResponseDto } from '../dto/availability-response.dto';

export class AvailabilityMapper {
  static toDomain(dto: AvailabilityRequestDto): Availability {
    return {
      psychologistId: dto.psychologistId,
      timeRange: dto.timeRange,
      date: dto.date ? new Date(dto.date) : null,
      isActive: dto.isActive,
    };
  }

  static toResponseDto(availability: Availability): AvailabilityResponseDto {
    return {
      availabilityId: availability.availabilityId!,
      psychologistId: availability.psychologistId,
      timeRange: availability.timeRange,
      date: availability.date ?? undefined,
      isActive: availability.isActive ?? true,
    };
  }
}
