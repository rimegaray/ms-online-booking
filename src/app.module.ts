import { Module } from '@nestjs/common';
import { PsychologistController } from './psychologist/controller/psychologist.controller';
import { PsychologistService } from './psychologist/service/psychologist.service';
import { PsychologistRepository } from './psychologist/repository/psychologist.repository';
import { PrismaService } from './common/service/prisma.service';
import { PatientRepository } from './patient/repository/patient.repository';
import { PatientService } from './patient/service/patient.service';
import { PatientController } from './patient/controller/patient.controller';
import { UserService } from './user/service/user.service';
import { UserRepository } from './user/repository/user.repository';
import { UserController } from './user/controller/user.controller';

@Module({
  imports: [],
  controllers: [PsychologistController, PatientController, UserController],
  providers: [PsychologistService, PsychologistRepository, 
    PatientService, PatientRepository,
    UserService, UserRepository,
    PrismaService],
})
export class AppModule {}
