import { Injectable } from '@nestjs/common';
import { Psychologist } from '../model/psychologist.model';
import { PsychologistRepository } from '../repository/psychologist.repository';

@Injectable()
export class PsychologistService {
  
  DEFAULT_IMAGE: string = "https://res.cloudinary.com/dn4emn45q/image/upload/v1770401779/predeterminado_ktff67.png";

  constructor(
    private readonly psychologistRepository: PsychologistRepository,
  ) {}

  getPsychologists(serviceId?: string): Promise<Psychologist[]> {
    return this.psychologistRepository.findAll();
  }

  getPsychologistsById(psychologistId: number): Promise<Psychologist> {
    return this.psychologistRepository.findById(psychologistId);
  }

  createPsychologist(psychologist: Psychologist): Promise<Psychologist> {
    return this.psychologistRepository.create(({
      ...psychologist,
      photo: psychologist.photo ?? this.DEFAULT_IMAGE,
    }));
  }

  updatePsychologist(psychologist: Psychologist): Promise<Psychologist> {
    return this.psychologistRepository.update(psychologist);
  }

  detelePsychologist(psychologistId: number): Promise<void> {
    return this.psychologistRepository.delete(psychologistId);
  }
}
