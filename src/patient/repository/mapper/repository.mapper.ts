import { Injectable } from '@nestjs/common';
import { Patient } from 'src/patient/model/patient.model';
import { patient } from '@prisma/client';

@Injectable()
export class RepositoryMapper {
  
  toDomain(prismaPatient: patient): Patient {
    return {
      patientId: prismaPatient.patient_id,
      name: prismaPatient.name,
      lastname: prismaPatient.lastname,
      age: prismaPatient.age,
      dni: prismaPatient.dni,
      phoneNumber: prismaPatient.phone_number,
      tutorName: prismaPatient.tutor_name,
      admissionDate: prismaPatient.admission_date,
      observations: prismaPatient.observations,
      lastSessionDate: prismaPatient.last_session_date,
      signedConsent: prismaPatient.signed_consent
        ? new Uint8Array(prismaPatient.signed_consent)
        : null,
    };
  }
}
