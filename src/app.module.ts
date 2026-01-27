import { Module } from '@nestjs/common';
import { PsychologistController } from './psychologist/controller/psychologist.controller';
import { PsychologistService } from './psychologist/service/psichologist.service';
import { PsychologistRepository } from './psychologist/repository/psychologist.repository';
import { PrismaService } from './common/service/prisma.service';

@Module({
  imports: [],
  controllers: [PsychologistController],
  providers: [PsychologistService, PsychologistRepository, PrismaService],
})
export class AppModule {}
