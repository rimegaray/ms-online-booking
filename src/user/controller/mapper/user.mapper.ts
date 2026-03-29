import { User, UserProfile } from 'src/user/model/user.model';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { PatchUserDto } from '../dto/user-patch.dto';
import {
  RegisterPatientRequestDto,
  RegisterPatientResponseDto,
} from '../dto/register-patient.dto';
import { Patient } from 'src/patient/model/patient.model';

export class UserMapper {
  static toModel(dto: UserRequestDto): User {
    return {
      userId: 0,
      username: dto.username.trim(),
      password: dto.password.trim(),
      profile: dto.profile,
      email: dto.email,
      entityId: dto.entityId,
      isActive: dto.isActive,
    };
  }

  static toResponse(model: User): UserResponseDto {
    return {
      userId: model.userId,
      username: model.username,
      password: model.password,
      profile: model.profile,
      email: model.email,
      entityId: model.entityId,
      isActive: model.isActive,
    };
  }

  static toUpdateModel(dto: PatchUserDto): Partial<User> {
    return {
      email: dto.email,
    };
  }

  static toPatientModel(patientRequestDto: RegisterPatientRequestDto): Patient {
    return {
      patientId: 0,
      name: patientRequestDto.name.trim(),
      lastname: patientRequestDto.lastname.trim(),
      age: patientRequestDto.age,
      dni: patientRequestDto.dni ?? null,
      phoneNumber: patientRequestDto.phoneNumber ?? null,
      tutorName: patientRequestDto.tutorName ?? null,
      observations: null,
      lastSessionDate: null,
      signedConsent: null,
      admissionDate: null,
    };
  }

  static toUserModel(dto: RegisterPatientRequestDto): User {
    return {
      userId: 0,
      username: dto.username.trim(),
      password: dto.password.trim(),
      profile: UserProfile.PATIENT,
      email: dto.email,
      entityId: 0,
      isActive: true,
    };
  }

  static toResponsePatient(result: {
    patient: Patient;
    user: User;
  }): RegisterPatientResponseDto {
    return {
      patientId: result.patient.patientId,
      name: result.patient.name,
      lastname: result.patient.lastname,
      age: result.patient.age ?? 0,
      dni: result.patient.dni ?? '',
      phoneNumber: result.patient.phoneNumber ?? '',
      tutorName: result.patient.tutorName ?? undefined,
      userId: result.user.userId,
      username: result.user.username,
      password: result.user.password,
      profile: result.user.profile,
      email: result.user.email ?? '',
      entityId: result.user.entityId,
      isActive: result.user.isActive,
    };
  }
}
