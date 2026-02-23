import { BadRequestException, Injectable } from '@nestjs/common';
import { Availability, AvailabilityStatus } from '../model/availability.model';
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

  async findInactiveAndReservedByPsychologistId(
    psychologistId: number,
  ): Promise<Availability[]> {
    return this.availabilityRepository.findInactiveAndReservedByPsychologistId(
      psychologistId,
    );
  }
  
  async getAvailabilityStatus(psychologistId: number,date: Date,timeRange: string): Promise<AvailabilityStatus | undefined> {

    console.log("Parametros de disponibilidad: ", psychologistId, date, timeRange)
    const availability = await this.availabilityRepository.findByPsychologistDateAndTime(psychologistId,date,timeRange);

    return availability ? availability.isActive : AvailabilityStatus.ACTIVE;
  }
}
