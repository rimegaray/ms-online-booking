import type { Availability } from '../../model/availability.model';

export class AvailabilityRepositoryMapper {
  static toDomain(availabilityEntity: any): Availability {
    return {
      availabilityId: availabilityEntity.availabilityId,
      psychologistId: availabilityEntity.psychologistId,
      timeRange: availabilityEntity.timeRange,
      date: availabilityEntity.date,
      isActive: availabilityEntity.isActive,
    };
  }

  static toEntity(availability: Availability): any {
    return {
      psychologistId: availability.psychologistId,
      timeRange: availability.timeRange,
      date: availability.date,
      isActive: availability.isActive ?? true,
    };
  }
}
