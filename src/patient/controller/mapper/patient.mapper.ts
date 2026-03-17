import { Injectable } from '@nestjs/common';
import { Patient } from 'src/patient/model/patient.model';
import { CreatePatientRequestDto } from '../dto/patient-request.dto';
import { PatientResponseDto } from '../dto/patient-response.dto';
import { UpdatePatientRequestDto } from '../dto/update-patient-request.dto';

@Injectable()
export class PatientMapper {
  toModel(patientRequestDto: CreatePatientRequestDto): Patient {
    return {
      patientId: 0,
      name: patientRequestDto.name,
      lastname: patientRequestDto.lastname,
      age: patientRequestDto.age,
      dni: patientRequestDto.dni,
      phoneNumber: patientRequestDto.phoneNumber,
      tutorName: patientRequestDto.tutorName ?? null,
      observations: patientRequestDto.observations ?? null,
      lastSessionDate: patientRequestDto.lastSessionDate
        ? new Date(patientRequestDto.lastSessionDate)
        : null,
      signedConsent: null,
      admissionDate: null,
    };
  }

  toResponse(model: Patient): PatientResponseDto {
    return {
      patientId: model.patientId,
      name: model.name,
      lastname: model.lastname,
      age: model.age,
      dni: model.dni,
      phoneNumber: model.phoneNumber,
      tutorName: model.tutorName,
      admissionDate: model.admissionDate,
      observations: model.observations,
      lastSessionDate: model.lastSessionDate,
    };
  }

  toUpdateModel(dto: UpdatePatientRequestDto): Partial<Patient> {
    return {
      lastSessionDate: dto.lastSessionDate
        ? new Date(dto.lastSessionDate)
        : undefined,
    };
  }
}
