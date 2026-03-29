import { Injectable } from '@nestjs/common';
import { PatientRepository } from '../repository/patient.repository';
import { Patient } from '../model/patient.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  getPatients(): Promise<Patient[]> {
    return this.patientRepository.findAll();
  }

  getPatientByIdOrFail(patientId: number): Promise<Patient> {
    return this.patientRepository.findByIdOrFail(patientId);
  }

  createPatient(
    patient: Patient,
    tx?: Prisma.TransactionClient,
  ): Promise<Patient> {
    return this.patientRepository.create(patient, tx);
  }

  updatePatient(patient: Patient): Promise<Patient> {
    return this.patientRepository.update(patient);
  }

  deletePatient(patientId: number): Promise<void> {
    return this.patientRepository.delete(patientId);
  }

  patchPatient(patientId: number, patient: Partial<Patient>): Promise<Patient> {
    return this.patientRepository.patch(patientId, patient);
  }
}
