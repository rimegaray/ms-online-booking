import { Injectable } from '@nestjs/common';
import { Booking, Payment } from '../model/booking.model';
import { BookingRepository } from '../repository/booking.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  createBooking(booking: Booking): Promise<Booking> {
    return this.bookingRepository.create(booking);
  }

  getBookingById(bookingId: number): Promise<Booking> {
    return this.bookingRepository.findById(bookingId);
  }

  getBookings(patientId?: number, psychologistId?: number): Promise<Booking[]> {
    return this.bookingRepository.findAll(patientId, psychologistId);
  }

  async startProcessing(
    bookingId: number,
    amount: number,
    transactionId: string,
  ): Promise<Booking> {
    const paymentUuid = `PAY-${randomUUID()}`;

    const payment: Payment = {
      paymentId : 0,
      paymentUuid,
      bookingId,
      amount,
      currency: 'PEN',
      transactionId,
      status: 'PENDING',
    };

    const createdPayment = await this.bookingRepository.createPayment(payment);

    const updatedBooking =
      await this.bookingRepository.updateBookingToProcessing(
        bookingId,
        'PROCESSING',
        createdPayment.paymentId,
      );

    return {
      ...updatedBooking,
      paymentId: createdPayment.paymentId,
    };
  }
}
