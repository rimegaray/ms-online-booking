import { AvailabilityStatus, type Availability } from '../../model/availability.model';

export class AvailabilityRepositoryMapper {
  static toDomain(availabilityEntity: any): Availability {
    return {
      availabilityId: availabilityEntity.availability_id,
      psychologistId: availabilityEntity.psychologist_id,
      timeRange: availabilityEntity.time_range,
      date: availabilityEntity.date,
      isActive: availabilityEntity.is_active,
    };
  }

  static toEntity(availability: Availability): any {
    return {
      psychologist_id: availability.psychologistId,
      time_range: availability.timeRange,
      date: availability.date,
      is_active: availability.isActive ?? AvailabilityStatus.ACTIVE,
    };
  }
}
