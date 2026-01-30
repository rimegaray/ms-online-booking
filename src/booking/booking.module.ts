import { Module } from '@nestjs/common';
import { BookingController } from './controller/booking.controller';
import { BookingService } from './service/booking.service';
import { BookingRepository } from './repository/booking.repository';
import { PrismaService } from 'src/common/service/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, PrismaService, JwtAuthGuard]
})
export class BookingModule {}
