import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { Psychologist } from '../model/psychologist.model';
import { RepositoryMapper } from './mapper/repository.mapper';
import { UserProfile } from 'src/user/model/user.model';

@Injectable()
export class PsychologistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(psychologist: Psychologist): Promise<Psychologist> {
    const created = await this.prisma.psychologist.create({
      data: {
        name: psychologist.name,
        lastname: psychologist.lastname,
        age: psychologist.age,
        specialty: psychologist.specialty,
        phone_number: psychologist.phoneNumber,
        address: psychologist.address,
        dni: psychologist.dni,
        email: psychologist.email,
        experience: psychologist.experience,
        photo: psychologist.photo,
        is_active: psychologist.isActive,
      },
    });

    return RepositoryMapper.toDomain(created);
  }

  async findById(id: number): Promise<Psychologist> {
    const found = await this.prisma.psychologist.findUnique({
      where: { psychologist_id: id },
    });
    return RepositoryMapper.toDomain(found);
  }

  async findAll(): Promise<Psychologist[]> {
    const users = await this.prisma.user.findMany({
      where: { profile: UserProfile.PSYCHOLOGIST },
      select: { entity_id: true }
    });

    const psychologistIds = users.map(u => u.entity_id);

    const list = await this.prisma.psychologist.findMany({
      where: {
        psychologist_id: {in: psychologistIds}
      }
    });
    return list.map((psychologist) => RepositoryMapper.toDomain(psychologist));
  }

  async findBySpecialty(specialty?: number): Promise<Psychologist[]> {

    const users = await this.prisma.user.findMany({
      where: { profile: UserProfile.PSYCHOLOGIST },
      select: { entity_id: true }
    });

    const psychologistIds = users.map(u => u.entity_id);

    if(psychologistIds.length === 0) return [];

    const list = await this.prisma.psychologist.findMany({
      where: {
        psychologist_id: { in: psychologistIds },
        specialty: {
          contains: specialty!.toString()
        }
      }
    });

    return list.map((psychologist) => RepositoryMapper.toDomain(psychologist));
  }

  async update(psychologist: Psychologist): Promise<Psychologist> {
    const updated = await this.prisma.psychologist.update({
      where: { psychologist_id: psychologist.psychologistId },
      data: {
        name: psychologist.name,
        lastname: psychologist.lastname,
        age: psychologist.age,
        specialty: psychologist.specialty,
        phone_number: psychologist.phoneNumber,
        address: psychologist.address,
        dni: psychologist.dni,
        email: psychologist.email,
        experience: psychologist.experience,
        photo: psychologist.photo,
        is_active: psychologist.isActive,
      },
    });

    return RepositoryMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.psychologist.delete({
      where: { psychologist_id: id },
    });
  }
}
