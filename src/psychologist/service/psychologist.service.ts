import { Injectable } from '@nestjs/common';
import { Psychologist } from '../model/psychologist.model';
import { PsychologistRepository } from '../repository/psychologist.repository';

@Injectable()
export class PsychologistService {
  constructor(
    private readonly psychologistRepository: PsychologistRepository,
  ) {}

  getPsychologists(): Promise<Psychologist[]> {
    return this.psychologistRepository.findAll();
  }

  getPsychologistsById(psychologistId: number): Promise<Psychologist> {
    return this.psychologistRepository.findById(psychologistId);
  }

  createPsychologist(psychologist: Psychologist): Promise<Psychologist> {
    return this.psychologistRepository.create(psychologist);
  }

  updatePsychologist(psychologist: Psychologist): Promise<Psychologist> {
    return this.psychologistRepository.update(psychologist);
  }

  detelePsychologist(psychologistId: number): Promise<void> {
    return this.psychologistRepository.delete(psychologistId);
  }
}
