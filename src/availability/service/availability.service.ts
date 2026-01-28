import { Injectable } from '@nestjs/common';
import type { Availability } from '../model/availability.model';
import { AvailabilityRepository } from '../repository/availability.repository';

@Injectable()
export class AvailabilityService {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  async upsertByDate(availability: Availability): Promise<Availability> {
    const existingAvailabilities =
      await this.availabilityRepository.findByPsychologistId(
        availability.psychologistId,
      );

    const existing = existingAvailabilities.find((existingAvailability) =>
      this.alreadyExists(existingAvailability, availability),
    );

    if (existing) {
      const updatedAvailability: Availability = {
        ...existing,
        isActive: availability.isActive,
      };
      return this.availabilityRepository.update(updatedAvailability);
    }

    return this.availabilityRepository.save(availability);
  }

  private alreadyExists(
    existingAvailability: Availability,
    availability: Availability,
  ): boolean {
    return (
      existingAvailability.psychologistId === availability.psychologistId &&
      this.isSameDate(existingAvailability.date, availability.date) &&
      existingAvailability.timeRange === availability.timeRange
    );
  }

  private isSameDate(
    date1: Date | null | undefined,
    date2: Date | null | undefined,
  ): boolean {
    if (!date1 || !date2) return false;
    return (
      new Date(date1).toISOString().split('T')[0] ===
      new Date(date2).toISOString().split('T')[0]
    );
  }

  async findInactiveByPsychologistId(
    psychologistId: number,
  ): Promise<Availability[]> {
    return this.availabilityRepository.findInactiveByPsychologistId(
      psychologistId,
    );
  }
}
