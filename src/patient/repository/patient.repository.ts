import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { Patient } from '../model/patient.model';
import { RepositoryMapper } from './mapper/repository.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: RepositoryMapper,
  ) {}

  async create(
    patient: Patient,
    tx?: Prisma.TransactionClient,
  ): Promise<Patient> {
    const prismaClient = tx ?? this.prisma;

    const created = await prismaClient.patient.create({
      data: {
        name: patient.name,
        lastname: patient.lastname,
        age: patient.age,
        dni: patient.dni,
        phone_number: patient.phoneNumber,
        tutor_name: patient.tutorName,
        observations: patient.observations,
        last_session_date: patient.lastSessionDate,
        signed_consent: patient.signedConsent
          ? Buffer.from(patient.signedConsent)
          : null,
      },
    });

    return this.mapper.toDomain(created);
  }

  async findAll(): Promise<Patient[]> {
    const list = await this.prisma.patient.findMany({
      orderBy: { admission_date: 'desc' },
    });
    return list.map((patient) => this.mapper.toDomain(patient));
  }

  async findByIdOrFail(id: number): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: { patient_id: id },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return this.mapper.toDomain(patient);
  }

  async update(patient: Patient): Promise<Patient> {
    try {
      const updated = await this.prisma.patient.update({
        where: { patient_id: patient.patientId },
        data: {
          name: patient.name,
          lastname: patient.lastname,
          age: patient.age,
          dni: patient.dni,
          phone_number: patient.phoneNumber,
          tutor_name: patient.tutorName,
          observations: patient.observations,
          last_session_date: patient.lastSessionDate,
          signed_consent: patient.signedConsent
            ? Buffer.from(patient.signedConsent)
            : null,
        },
      });

      return this.mapper.toDomain(updated);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Patient with ID ${patient.patientId} not found`,
          );
        }
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.patient.delete({
        where: { patient_id: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Patient with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async patch(patientId: number, patient: Partial<Patient>): Promise<Patient> {
    try {
      const updateData: Prisma.patientUpdateInput = {};

      if (patient.lastSessionDate !== undefined) {
        updateData.last_session_date = patient.lastSessionDate;
      }

      const updatedSessionDate = await this.prisma.patient.update({
        where: { patient_id: patientId },
        data: updateData,
      });

      return this.mapper.toDomain(updatedSessionDate);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }
      }
      throw error;
    }
  }
}
