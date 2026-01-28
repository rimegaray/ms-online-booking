import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookingService } from '../service/booking.service';
import { BookingRequestDto } from './dto/booking-request.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingMapper } from './mapper/booking.mapper';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

class ProcessingRequestDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}

@Controller('/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async postBooking(
    @Body() bookingRequestDto: BookingRequestDto,
  ): Promise<BookingResponseDto> {
    const model = BookingMapper.toModel(bookingRequestDto);
    const booking = await this.bookingService.createBooking(model);
    return BookingMapper.toResponse(booking);
  }

  @Get()
  async getBookings(
    @Query('patientId') patientId?: string,
    @Query('psychologistId') psychologistId?: string,
  ): Promise<BookingResponseDto[]> {
    const bookings = await this.bookingService.getBookings(
      patientId ? Number(patientId) : undefined,
      psychologistId ? Number(psychologistId) : undefined,
    );
    return bookings.map((booking) => BookingMapper.toResponse(booking));
  }

  @Get(':bookingId')
  async getBookingById(
    @Param('bookingId') bookingId: string,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingService.getBookingById(Number(bookingId));
    return BookingMapper.toResponse(booking);
  }

  @Post(':bookingId/processing')
  async startProcessing(
    @Param('bookingId') bookingId: string,
    @Body() processingRequestDto: ProcessingRequestDto,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingService.startProcessing(
      Number(bookingId),
      processingRequestDto.amount,
      processingRequestDto.transactionId,
    );
    return BookingMapper.toResponse(booking);
  }
}
