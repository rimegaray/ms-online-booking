import { Patient } from 'src/patient/model/patient.model';
import { PatientRequestDto } from '../dto/patient-request.dto';
import { PatientResponseDto } from '../dto/patient-response.dto';

export class PatientMapper {
  static toModel(patientRequestDto: PatientRequestDto): Patient {
    return {
      patientId: 0,
      name: patientRequestDto.name.trim(),
      lastname: patientRequestDto.lastname.trim(),
      age: patientRequestDto.age,
      dni: patientRequestDto.dni,
      phoneNumber: patientRequestDto.phoneNumber,
      tutorName: patientRequestDto.tutorName.trim(),
      admissionDate: patientRequestDto.admissionDate ?? '',
      observations: patientRequestDto.observations?.trim() ?? '',
      lastSessionDate: patientRequestDto.lastSessionDate ?? '',
      signedConsent: patientRequestDto.signedConsent
        ? Uint8Array.from(
            Buffer.from(patientRequestDto.signedConsent, 'base64'),
          ) // ✅
        : null,
    };
  }

  static toResponse(model: Patient): PatientResponseDto {
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
      signedConsent: model.signedConsent
        ? Buffer.from(model.signedConsent).toString('base64')
        : null,
    };
  }
}
