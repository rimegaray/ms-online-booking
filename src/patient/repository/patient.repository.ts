import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { Patient } from '../model/patient.model';
import { RepositoryMapper } from './mapper/repository.mapper';

@Injectable()
export class PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(patient: Patient): Promise<Patient> {
    const created = await this.prisma.patient.create({
      data: {
        name: patient.name,
        lastname: patient.lastname,
        age: patient.age,
        dni: patient.dni,
        phone_number: patient.phoneNumber,
        tutor_name: patient.tutorName,
        //admission_date: patient.admissionDate,
        observations: patient.observations,
        last_session_date: patient.lastSessionDate,
        signed_consent: patient.signedConsent
          ? new Uint8Array(patient.signedConsent)
          : null,
      },
    });

    return RepositoryMapper.toDomain(created);
  }

  async findAll(): Promise<Patient[]> {
    const list = await this.prisma.patient.findMany();
    return list.map((patient) => RepositoryMapper.toDomain(patient));
  }

  async findById(id: number): Promise<Patient> {
    const found = await this.prisma.patient.findUnique({
      where: { patient_id: id },
    });
    return RepositoryMapper.toDomain(found);
  }

  async update(patient: Patient): Promise<Patient> {
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
          ? new Uint8Array(patient.signedConsent)
          : null,
      },
    });

    return RepositoryMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.patient.delete({
      where: { patient_id: id },
    });
  }

  async patch(patientId: number, patient: Partial<Patient>): Promise<Patient> {
    const updatedSessionDate = await this.prisma.patient.update({
      where: { patient_id: patientId },
      data: {
        last_session_date: patient.lastSessionDate,
      },
    });

    return RepositoryMapper.toDomain(updatedSessionDate);
  }
}
