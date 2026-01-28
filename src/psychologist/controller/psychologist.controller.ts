import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PsychologistService } from '../service/psychologist.service';
import { PsychologistResponseDto } from './dto/psychologist-response.dto';
import { PsychologistRequestDto } from './dto/psychologist-request.dto';
import { PsychologistMapper } from './mapper/psychologist.mapper';

@Controller('/psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Get()
  getPsychologists(): Promise<PsychologistResponseDto[]> {
    return this.psychologistService.getPsychologists();
  }

  @Get(':psychologistId')
  getPsychologistById(
    @Param('psychologistId') psychologistId: string,
  ): Promise<PsychologistResponseDto> {
    return this.psychologistService.getPsychologistsById(
      Number(psychologistId),
    );
  }

  @Post()
  async postPsychologist(
    @Body() psychologistRequestDto: PsychologistRequestDto,
  ): Promise<PsychologistResponseDto> {
    const model = PsychologistMapper.toModel(psychologistRequestDto);
    const psychologist =
      await this.psychologistService.createPsychologist(model);
    return PsychologistMapper.toResponse(psychologist);
  }

  @Put(':psychologistId')
  async updatePsychologist(
    @Param('psychologistId') psychologistId: string,
    @Body() psychologistRequestDto: PsychologistRequestDto,
  ): Promise<PsychologistResponseDto> {
    let model = PsychologistMapper.toModel(psychologistRequestDto);
    model = {
      ...model,
      psychologistId: Number(psychologistId),
    };
    const psychologist =
      await this.psychologistService.updatePsychologist(model);
    return PsychologistMapper.toResponse(psychologist);
  }

  @Delete(':psychologistId')
  deletePsychologist(
    @Param('psychologistId') psychologistId: string,
  ): Promise<void> {
    return this.psychologistService.detelePsychologist(Number(psychologistId));
  }
}
