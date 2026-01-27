import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PatientService } from "../service/patient.service";
import { PatientResponseDto } from "./dto/patient-response.dto";
import { PatientMapper } from "./mapper/patient.mapper";
import { PatientRequestDto } from "./dto/patient-request.dto";

@Controller('/patient')
export class PatientController {

    constructor(private readonly patientService: PatientService) {}

    @Get()
    async getPatients(): Promise<PatientResponseDto[]> {
        const patients = await this.patientService.getPatients();
        return patients.map(PatientMapper.toResponse);
    }

    @Get(':patientId')
    async getPatientById(@Param('patientId') patientId: String): Promise<PatientResponseDto> {
       const patient = await this.patientService.getPatientById(Number(patientId));
       return PatientMapper.toResponse(patient);
    }

    @Post()
    async createPatient(@Body() patientRequestDto: PatientRequestDto): Promise<PatientRequestDto> {
        const model = PatientMapper.toModel(patientRequestDto);
        const patient = await this.patientService.createPatient(model);
        return PatientMapper.toResponse(patient);
    }

    @Put(':patientId')
    async updatePatient(@Param('patientId') patientId: string, @Body() patientRequestDto: PatientRequestDto): Promise<PatientResponseDto> {
        let model = PatientMapper.toModel(patientRequestDto);
        model = {
            ...model,
            patientId: Number(patientId),
        }
        const patient = await this.patientService.createPatient(model);
        return PatientMapper.toResponse(patient);
    }

    @Delete(':patientId')
    deletePatient(@Param('patientId') patientId: string): Promise<void> {
        return this.patientService.deletePatient(Number(patientId));
    }
}