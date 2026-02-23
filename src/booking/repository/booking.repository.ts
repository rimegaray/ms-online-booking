import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { Booking, BookingState, Payment, PaymentStatus } from '../model/booking.model';
import { RepositoryMapper } from './mapper/repository.mapper';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(booking: Booking): Promise<Booking> {
    const created = await this.prisma.booking.create({
      data: {
        patient_id: booking.patientId,
        psychologist_id: booking.psychologistId,
        service_id: booking.serviceId,
        booking_date: booking.bookingDate,
        time_range: booking.timeRange,
        state: BookingState.PENDING_PAYMENT,
        notes: booking.notes,
        status_note: booking.statusNote,
      },
    });

    return RepositoryMapper.toDomain(created);
  }

  async findById(id: number): Promise<Booking> {
    const found = await this.prisma.booking.findUnique({
      where: { booking_id: id },
      include: {
        payment: true,
        patient: true,
        psychologist: true,
        service: true,
      },
    });
    return RepositoryMapper.toDomain(found);
  }

  async findAll(
    patientId?: number,
    psychologistId?: number,
    bookingDate?: string,
  ): Promise<Booking[]> {
    const where: any = {};

    if (patientId) {
      where.patient_id = patientId;
    }

    if (psychologistId) {
      where.psychologist_id = psychologistId;
    }

    if(bookingDate) {
      const start = new Date(`${bookingDate}T00:00:00.000Z`);
      const end = new Date(`${bookingDate}T23:59:59.999Z`);
      
      where.booking_date = {
        gte: start,
        lte: end,
      }
    }

    const list = await this.prisma.booking.findMany({
      where,
      include: {
        payment: true,
        patient: true,
        psychologist: true,
        service: true,
      },
      orderBy: {
        booking_date: 'asc',
      }
    });

    return list.map((booking) => RepositoryMapper.toDomain(booking));
  }

  async updateBookingToProcessing(
    bookingId: number,
    state: string,
    paymentId: number,
  ): Promise<Booking> {
    const updated = await this.prisma.booking.update({
      where: { booking_id: bookingId },
      data: { state, payment_id: paymentId },
    });
    return RepositoryMapper.toDomain(updated);
  }

  async createPayment(payment: Payment): Promise<Payment> {
    const created = await this.prisma.payment.create({
      data: {
        payment_uuid: payment.paymentUuid,
        booking_id: payment.bookingId,
        amount: payment.amount,
        currency: payment.currency,
        transaction_id: payment.transactionId,
        status: payment.status ?? PaymentStatus.PENDING,
      },
    });

    return RepositoryMapper.toPaymentDomain(created);
  }

  async updateStateBooking(bookingId: number, state: BookingState): Promise<Booking>{
    const stateUpdate = await this.prisma.booking.update({
      where: { booking_id: bookingId},
      data: { state }
    })

    return RepositoryMapper.toDomain(stateUpdate);
  }

  async updateStatusPayment(paymentId: number, status: PaymentStatus): Promise<Payment> {
    const statusUpdate = await this.prisma.payment.update({
      where: { payment_id: paymentId },
      data: {
        status,
        updated_at: new Date(),
      }
    })

    return RepositoryMapper.toPaymentDomain(statusUpdate);
  }

  async updateBooking(bookingId: number, booking: Partial<Booking>): Promise<Booking> {

    const data: any = {};

    if (booking.timeRange !== undefined) {
      data.time_range = booking.timeRange;
    }

    if (booking.notes !== undefined) {
      data.notes = booking.notes;
    }

    if (booking.bookingDate !== undefined) {
      data.booking_date = booking.bookingDate;
    }

    if (booking.state !== undefined) {
      data.state = booking.state; 
    }

    if (booking.statusNote !== undefined) {
      data.status_note = booking.statusNote;
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { booking_id: bookingId},
      data,
    })

    return RepositoryMapper.toDomain(updatedBooking); 
  }

  async deleteBooking(bookingId: number): Promise<void> {
    await this.prisma.booking.delete({
      where: {booking_id: bookingId},
    })
  }
}
