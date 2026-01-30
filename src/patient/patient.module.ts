import { Module } from '@nestjs/common';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './service/patient.service';
import { PatientRepository } from './repository/patient.repository';
import { PrismaService } from 'src/common/service/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PatientRepository, PrismaService, JwtAuthGuard],
  exports: [PatientService],
})
export class PatientModule {}
