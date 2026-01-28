import { Injectable } from "@nestjs/common";
import { PatientRepository } from "../repository/patient.repository";
import { Patient } from "../model/patient.model";

@Injectable()
export class PatientService {

    constructor( private readonly patientRepository: PatientRepository,) {}

    getPatients(): Promise<Patient[]> {
        return this.patientRepository.findAll();
    }

    getPatientById(patientId: number): Promise<Patient> {
        return this.patientRepository.findById(patientId);
    }

    createPatient(patient: Patient): Promise<Patient> {
        return this.patientRepository.create(patient);
    }

    updatePatient(patient: Patient): Promise<Patient> {
        return this.patientRepository.update(patient);
    }

    deletePatient(patientId: number): Promise<void> {
        return this.patientRepository.delete(patientId);
    }
}