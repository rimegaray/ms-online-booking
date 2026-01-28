import { Psychologist } from 'src/psychologist/model/psychologist.model';
import { PsychologistRequestDto } from '../dto/psychologist-request.dto';
import { PsychologistResponseDto } from '../dto/psychologist-response.dto';

export class PsychologistMapper {
  static toModel(dto: PsychologistRequestDto): Psychologist {
    return {
      psychologistId: 0,
      name: dto.name.trim(),
      lastname: dto.lastname.trim(),
      age: dto.age,
      specialty: dto.specialty.trim(),
      phoneNumber: dto.phoneNumber,
      address: dto.address?.trim() ?? '',
      dni: dto.dni,
      email: dto.email.toLowerCase(),
      experience: dto.experience.trim(),
      photo: dto.photo,
      isActive: dto.isActive,
    };
  }

  static toResponse(model: Psychologist): PsychologistResponseDto {
    return {
      psychologistId: model.psychologistId,
      name: model.name,
      lastname: model.lastname,
      age: model.age,
      specialty: model.specialty,
      phoneNumber: model.phoneNumber,
      address: model.address,
      dni: model.dni,
      email: model.email,
      experience: model.experience,
      photo: model.photo,
      isActive: model.isActive,
    };
  }
}
