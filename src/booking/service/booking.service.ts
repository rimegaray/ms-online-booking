import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  Booking,
  BookingState,
  Payment,
  PaymentStatus,
} from '../model/booking.model';
import { BookingRepository } from '../repository/booking.repository';
import { randomUUID } from 'crypto';
import { AuthUser } from 'src/auth/jwt/jwt.guard';
import { Role } from 'src/auth/roles/role.model';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  createBooking(booking: Booking): Promise<Booking> {
    return this.bookingRepository.create(booking);
  }

  getBookingById(bookingId: number): Promise<Booking> {
    return this.bookingRepository.findById(bookingId);
  }

  getBookings(
    user: AuthUser,
    patientId?: number,
    psychologistId?: number,
  ): Promise<Booking[]> {
    const filters = this.buildFiltersByRole(user, patientId, psychologistId);

    return this.bookingRepository.findAll(
      filters.patientId,
      filters.psychologistId,
    );
  }

  private buildFiltersByRole(
    user: AuthUser,
    patientId?: number,
    psychologistId?: number,
  ) {
    switch (user.role) {
      case Role.PATIENT:
        return {
          patientId: user.userId,
          psychologistId: undefined,
        };

      case Role.PSYCHOLOGIST:
        return {
          patientId: patientId ? Number(patientId) : undefined,
          psychologistId: user.userId,
        };

      case Role.SECRETARY:
        return {
          patientId: patientId ? Number(patientId) : undefined,
          psychologistId: psychologistId ? Number(psychologistId) : undefined,
        };

      default:
        throw new ForbiddenException();
    }
  }

  async startProcessing(
    bookingId: number,
    amount: number,
    transactionId: string,
  ): Promise<Booking> {
    const paymentUuid = `PAY-${randomUUID()}`;

    const payment: Payment = {
      paymentId: 0,
      paymentUuid,
      bookingId,
      amount,
      currency: 'PEN',
      transactionId,
      status: PaymentStatus.PENDING,
    };

    const createdPayment = await this.bookingRepository.createPayment(payment);

    const updatedBooking =
      await this.bookingRepository.updateBookingToProcessing(
        bookingId,
        BookingState.PROCESSING,
        createdPayment.paymentId,
      );

    return {
      ...updatedBooking,
      paymentId: createdPayment.paymentId,
    };
  }

  async confirm(bookingId: number): Promise<Booking> {
    const booking = await this.bookingRepository.updateStateBooking(
      bookingId,
      BookingState.CONFIRMED,
    );

    if (!booking.paymentId) {
      throw new BadRequestException('El booking no tiene un payment asociado.');
    }

    await this.bookingRepository.updateStatusPayment(
      booking.paymentId,
      PaymentStatus.CONFIRMED,
    );

    return booking;
  }

  async rejected(bookingId: number): Promise<Booking> {
    const booking = await this.bookingRepository.updateStateBooking(
      bookingId,
      BookingState.REJECTED,
    );

    if (!booking.paymentId) {
      throw new BadRequestException('El booking no tiene un payment asociado.');
    }

    await this.bookingRepository.updateStatusPayment(
      booking.paymentId,
      PaymentStatus.REJECTED,
    );

    return booking;
  }
}
