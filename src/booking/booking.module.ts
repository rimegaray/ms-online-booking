import { Module } from '@nestjs/common';
import { BookingController } from './controller/booking.controller';
import { BookingService } from './service/booking.service';
import { BookingRepository } from './repository/booking.repository';
import { PrismaService } from 'src/common/service/prisma.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, PrismaService],
  exports: [BookingService],
})
export class BookingModule {}
