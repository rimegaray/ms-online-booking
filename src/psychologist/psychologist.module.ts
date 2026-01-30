import { Module } from '@nestjs/common';
import { PsychologistController } from './controller/psychologist.controller';
import { PsychologistService } from './service/psychologist.service';
import { PsychologistRepository } from './repository/psychologist.repository';
import { PrismaService } from 'src/common/service/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  controllers: [PsychologistController],
  providers: [PsychologistService, PsychologistRepository, PrismaService, JwtAuthGuard],
  exports: [PsychologistService],
})
export class PsychologistModule {}
