import { Module } from '@nestjs/common';
import { PrismaService } from './common/service/prisma.service';
import { PsychologistModule } from './psychologist/psychologist.module';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { AvailabilityModule } from './availability/availability.module';
import { BookingModule } from './booking/booking.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PsychologistModule,
    PatientModule,
    UserModule,
    SessionModule,
    AvailabilityModule,
    BookingModule,
    ServiceModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
