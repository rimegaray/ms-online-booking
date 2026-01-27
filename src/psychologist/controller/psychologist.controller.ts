import { Controller, Get } from '@nestjs/common';
import { PsychologistService } from '../service/psichologist.service';
import { PsychologistResponseDto } from './dto/psychologist-response.dto';

@Controller('/psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Get()
  getPsychologists(): Promise<PsychologistResponseDto[]> {
    return this.psychologistService.getPsychologists();
  }
}
