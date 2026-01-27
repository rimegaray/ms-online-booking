import { Injectable } from '@nestjs/common';
import { Psychologist } from '../model/psychologist.model';
import { PsychologistRepository } from '../repository/psychologist.repository';

@Injectable()
export class PsychologistService {

  constructor(
    private readonly psychologistRepository: PsychologistRepository,
  ) { }

  getPsychologists(): Promise<Psychologist[]> {
    return this.psychologistRepository.findAll();
  }
}
