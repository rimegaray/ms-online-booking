import { ForbiddenException, Injectable } from '@nestjs/common';
import { Psychologist } from '../model/psychologist.model';
import { PsychologistRepository } from '../repository/psychologist.repository';
import { AuthUser } from 'src/auth/jwt/jwt.guard';
import { Role } from 'src/auth/roles/role.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class PsychologistService {
  DEFAULT_IMAGE: string =
    'https://res.cloudinary.com/dn4emn45q/image/upload/v1771878733/1771878455474_pkskcm.png';

  constructor(
    private readonly psychologistRepository: PsychologistRepository,
  ) {}

  getPsychologists(
    user: AuthUser,
    specialty?: number,
  ): Promise<Psychologist[]> {
    const where = this.buildFilterByRole(user);
    if (specialty) {
      where.specialty = {
        contains: specialty.toLocaleString(),
      };
    }
    return this.psychologistRepository.findAll(where);
  }

  private buildFilterByRole(user: AuthUser): Prisma.psychologistWhereInput {
    const where: Prisma.psychologistWhereInput = {};
    switch (user.role) {
      case Role.PATIENT:
        where.is_active = true;
        break;
      case Role.PSYCHOLOGIST:
        throw new ForbiddenException();
      case Role.SECRETARY:
        break;
      default:
        throw new ForbiddenException();
    }

    return where;
  }

  getPsychologistsById(psychologistId: number): Promise<Psychologist> {
    return this.psychologistRepository.findById(psychologistId);
  }

  createPsychologist(psychologist: Psychologist): Promise<Psychologist> {
    return this.psychologistRepository.create({
      ...psychologist,
      photo: psychologist.photo ?? this.DEFAULT_IMAGE,
    });
  }

  updatePsychologist(psychologist: Psychologist): Promise<Psychologist> {
    return this.psychologistRepository.update(psychologist);
  }

  detelePsychologist(psychologistId: number): Promise<void> {
    return this.psychologistRepository.delete(psychologistId);
  }
}
