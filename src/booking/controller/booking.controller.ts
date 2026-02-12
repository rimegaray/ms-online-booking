import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BookingService } from '../service/booking.service';
import { BookingRequestDto } from './dto/booking-request.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingMapper } from './mapper/booking.mapper';
import { IsNumber, IsNotEmpty, IsString, Matches } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Role, Roles } from 'src/auth/roles/role.model';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CurrentUser } from 'src/auth/roles/user.decorator';
import { UpdateBookingDto } from './dto/update-booking-request.dto';

class ProcessingRequestDto {
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$/, {
    message: 'Debe contener exactamente 8 dígitos numéricos',
  })
  transactionId!: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
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

  
  @Roles(Role.SECRETARY, Role.PSYCHOLOGIST, Role.PATIENT)
  @Get()
  async getBookings(
    @CurrentUser() user,
    @Query('patientId') patientId?: string,
    @Query('psychologistId') psychologistId?: string,
    @Query('bookingDate') bookingDate?: string 
  ): Promise<BookingResponseDto[]> {
    const bookings = await this.bookingService.getBookings(
      user,
      patientId ? Number(patientId) : undefined,
      psychologistId ? Number(psychologistId) : undefined,
      bookingDate,
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

  @Post(':bookingId/confirmation')
  async bookingConfirmation(@Param('bookingId') bookingId: string): Promise<BookingResponseDto> {
    const bookingConfirm = await this.bookingService.confirm(Number(bookingId));
    return BookingMapper.toResponse(bookingConfirm);
  }

  @Post(':bookingId/rejection')
  async bookingRejected(@Param('bookingId') bookingId: string): Promise<BookingResponseDto> {
    const bookingReject = await this.bookingService.rejected(Number(bookingId));
    return BookingMapper.toResponse(bookingReject);
  }

  @Patch(':bookingId')
  async bookingUpdate(@Param('bookingId') bookingId: string, @Body() updateDto: UpdateBookingDto): Promise<BookingResponseDto> {
    console.log("booking update: ", updateDto);
    const model = BookingMapper.toUpdateModel(updateDto);
    const updatedBooking = await this.bookingService.updateBooking(Number(bookingId), model);
    return BookingMapper.toResponse(updatedBooking);
  }
}
