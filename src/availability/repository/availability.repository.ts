import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/service/prisma.service';
import { AvailabilityStatus, type Availability } from '../model/availability.model';
import { AvailabilityRepositoryMapper } from './mapper/repository.mapper';

@Injectable()
export class AvailabilityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPsychologistId(psychologistId: number): Promise<Availability[]> {
    const availabilityEntities = await this.prisma.availability.findMany({
      where: { psychologist_id: psychologistId },
    });

    return availabilityEntities.map(AvailabilityRepositoryMapper.toDomain);
  }

  async findInactiveAndReservedByPsychologistId(
    psychologistId: number,
  ): Promise<Availability[]> {
    const availabilityEntities = await this.prisma.availability.findMany({
      where: {
        psychologist_id: psychologistId,
        is_active: {
          in:[AvailabilityStatus.INACTIVE, AvailabilityStatus.RESERVED,]
        },
      },
    });
    return availabilityEntities.map(AvailabilityRepositoryMapper.toDomain);
  }

  async save(availability: Availability): Promise<Availability> {
    const entity = AvailabilityRepositoryMapper.toEntity(availability);
    const savedEntity = await this.prisma.availability.create({
      data: entity,
    });
    return AvailabilityRepositoryMapper.toDomain(savedEntity);
  }

  async update(availability: Availability): Promise<Availability> {
    const entity = AvailabilityRepositoryMapper.toEntity(availability);
    const updatedEntity = await this.prisma.availability.update({
      where: { availability_id: availability.availabilityId },
      data: entity,
    });
    return AvailabilityRepositoryMapper.toDomain(updatedEntity);
  }

  async findByPsychologistDateAndTime(psychologistId: number, date:Date, timeRange: string): Promise<Availability | null> {

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0,0,0,0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23,59,59,999);

    const entity  = await this.prisma.availability.findFirst({
      where: {
        psychologist_id: psychologistId,
        time_range: timeRange,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      }
    });

    return entity  ? AvailabilityRepositoryMapper.toDomain(entity ) : null;
  }
}
