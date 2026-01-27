

import { Injectable } from '@nestjs/common';
import { Psychologist } from 'src/psychologist/model/psychologist.model';

@Injectable()
export class RepositoryMapper {
  static toDomain(prismaPsychologist: any): Psychologist {
  return {
    psychologistId: prismaPsychologist.psychologistId,
    name: prismaPsychologist.name,
    lastname: prismaPsychologist.lastname,
    age: prismaPsychologist.age,
    specialty: prismaPsychologist.specialty,
    phoneNumber: prismaPsychologist.phoneNumber,
    address: prismaPsychologist.address ?? undefined,
    dni: prismaPsychologist.dni,
    email: prismaPsychologist.email,
    experience: prismaPsychologist.experience,
    photo: prismaPsychologist.photo,
    isActive: prismaPsychologist.isActive,
  };
}
}
