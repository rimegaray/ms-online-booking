import { Module } from '@nestjs/common';
import { PsychologistController } from './controller/psychologist.controller';
import { PsychologistService } from './service/psychologist.service';
import { PsychologistRepository } from './repository/psychologist.repository';
import { PrismaService } from 'src/common/service/prisma.service';

@Module({
  controllers: [PsychologistController],
  providers: [PsychologistService, PsychologistRepository, PrismaService],
  exports: [PsychologistService],
})
export class PsychologistModule {}
