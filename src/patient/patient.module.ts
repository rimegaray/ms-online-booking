import { Module } from '@nestjs/common';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './service/patient.service';
import { PatientRepository } from './repository/patient.repository';
import { PrismaService } from 'src/common/service/prisma.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PatientRepository, PrismaService],
  exports: [PatientService],
})
export class PatientModule {}
