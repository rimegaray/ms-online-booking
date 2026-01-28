import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { Session } from '../model/session.model';
import { RepositoryMapper } from './mapper/repository.mapper';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(session: Session): Promise<Session> {
    const created = await this.prisma.session.create({
      data: {
        title: session.title,
        description: session.description,
        booking_id: session.bookingId,
        patient_id: session.patientId,
        session_date: session.sessionDate,
      },
    });

    return RepositoryMapper.toDomain(created);
  }

  async findById(id: number): Promise<Session> {
    const found = await this.prisma.session.findUnique({
      where: { session_id: id },
    });
    return RepositoryMapper.toDomain(found);
  }

  async findAll(): Promise<Session[]> {
    const list = await this.prisma.session.findMany();
    return list.map(session => RepositoryMapper.toDomain(session));
  }

  async findByPatientId(patientId: number): Promise<Session[]> {
    const list = await this.prisma.session.findMany({
      where: { patient_id: patientId },
    });
    return list.map(session => RepositoryMapper.toDomain(session));
  }

  async update(session: Session): Promise<Session> {
    const updated = await this.prisma.session.update({
      where: { session_id: session.sessionId },
      data: {
        title: session.title,
        description: session.description,
        booking_id: session.bookingId,
        patient_id: session.patientId,
        session_date: session.sessionDate,
      },
    });

    return RepositoryMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.session.delete({
      where: { session_id: id },
    });
  }
}
