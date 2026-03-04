import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/common/service/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { EmailModule } from 'src/mail/email.module';
import { PatientService } from 'src/patient/service/patient.service';
import { PatientModule } from 'src/patient/patient.module';
import { PatientRepository } from 'src/patient/repository/patient.repository';

@Module({
  imports:[EmailModule, PatientModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, JwtAuthGuard, PatientService, PatientRepository],
  exports: [UserService],
})
export class UserModule {}
