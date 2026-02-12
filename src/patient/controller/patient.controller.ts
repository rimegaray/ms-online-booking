import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { PatientResponseDto } from './dto/patient-response.dto';
import { PatientMapper } from './mapper/patient.mapper';
import { PatientRequestDto } from './dto/patient-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UpdatePatientRequestDto } from './dto/update-patient-request.dto';

@Controller('/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPatients(): Promise<PatientResponseDto[]> {
    const patients = await this.patientService.getPatients();
    return patients.map(PatientMapper.toResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':patientId')
  async getPatientById(
    @Param('patientId') patientId: string,
  ): Promise<PatientResponseDto> {
    const patient = await this.patientService.getPatientById(Number(patientId));
    return PatientMapper.toResponse(patient);
  }

  @Post()
  async createPatient(
    @Body() patientRequestDto: PatientRequestDto,
  ): Promise<PatientRequestDto> {
    const model = PatientMapper.toModel(patientRequestDto);
    
    const patient = await this.patientService.createPatient(model);
    return PatientMapper.toResponse(patient);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':patientId')
  async updatePatient(
    @Param('patientId') patientId: string,
    @Body() patientRequestDto: PatientRequestDto,
  ): Promise<PatientResponseDto> {
    let model = PatientMapper.toModel(patientRequestDto);
    model = {
      ...model,
      patientId: Number(patientId),
    };
    const patient = await this.patientService.updatePatient(model);
    return PatientMapper.toResponse(patient);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':patientId')
  deletePatient(@Param('patientId') patientId: string): Promise<void> {
    return this.patientService.deletePatient(Number(patientId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':patientId')
  async updateSessionDate(@Param('patientId') patientId: string, @Body() request: UpdatePatientRequestDto): Promise<PatientResponseDto> {
    const model = PatientMapper.toUpdateModel(request);
    const patient = await this.patientService.patchPatient(Number(patientId),model);
    return PatientMapper.toResponse(patient);
  }
}
