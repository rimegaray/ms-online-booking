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
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { PatientResponseDto } from './dto/patient-response.dto';
import { PatientMapper } from './mapper/patient.mapper';
import { CreatePatientRequestDto } from './dto/patient-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UpdatePatientRequestDto } from './dto/update-patient-request.dto';

@Controller('/patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly patientMapper: PatientMapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPatients(): Promise<PatientResponseDto[]> {
    const patients = await this.patientService.getPatients();
    return patients.map((patient) => this.patientMapper.toResponse(patient));
  }

  @Get(':patientId')
  @UseGuards(JwtAuthGuard)
  async getPatientById(
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<PatientResponseDto> {
    const patient = await this.patientService.getPatientByIdOrFail(patientId);
    return this.patientMapper.toResponse(patient);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPatient(
    @Body() patientRequestDto: CreatePatientRequestDto,
  ): Promise<PatientResponseDto> {
    const model = this.patientMapper.toModel(patientRequestDto);
    const patient = await this.patientService.createPatient(model);
    return this.patientMapper.toResponse(patient);
  }

  @Put(':patientId')
  @UseGuards(JwtAuthGuard)
  async updatePatient(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Body() patientRequestDto: CreatePatientRequestDto,
  ): Promise<PatientResponseDto> {
    const model = this.patientMapper.toModel(patientRequestDto);
    const patient = await this.patientService.updatePatient({
      ...model,
      patientId,
    });
    return this.patientMapper.toResponse(patient);
  }

  @Delete(':patientId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePatient(
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<void> {
    await this.patientService.deletePatient(patientId);
  }

  @Patch(':patientId')
  @UseGuards(JwtAuthGuard)
  async updateSessionDate(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Body() request: UpdatePatientRequestDto,
  ): Promise<PatientResponseDto> {
    const model = this.patientMapper.toUpdateModel(request);
    const patient = await this.patientService.patchPatient(patientId, model);
    return this.patientMapper.toResponse(patient);
  }
}
