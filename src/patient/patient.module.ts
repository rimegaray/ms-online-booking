import { Module, forwardRef } from '@nestjs/common';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './service/patient.service';
import { PatientRepository } from './repository/patient.repository';
import { PatientMapper } from './controller/mapper/patient.mapper';
import { RepositoryMapper } from './repository/mapper/repository.mapper';

@Module({
  controllers: [PatientController],
  providers: [
    PatientService,
    PatientRepository,
    PatientMapper,
    RepositoryMapper,
  ],
  exports: [PatientService, PatientRepository],
})
export class PatientModule {}
