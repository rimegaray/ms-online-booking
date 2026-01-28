import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { Booking, Payment } from '../model/booking.model';
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
        state: 'PENDING_PAYMENT',
        notes: booking.notes,
      },
    });

    return RepositoryMapper.toDomain(created);
  }

  async findById(id: number): Promise<Booking> {
    const found = await this.prisma.booking.findUnique({
      where: { booking_id: id },
      include: {
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
  ): Promise<Booking[]> {
    const where: any = {};

    if (patientId) {
      where.patient_id = patientId;
    }

    if (psychologistId) {
      where.psychologist_id = psychologistId;
    }

    const list = await this.prisma.booking.findMany({
      where,
      include: {
        patient: true,
        psychologist: true,
        service: true,
      },
    });

    return list.map((booking) => RepositoryMapper.toDomain(booking));
  }

  async updateBookingToProcessing(
    bookingId: number,
    state: string,
    paymentId: string,
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
        payment_id: payment.paymentId,
        booking_id: payment.bookingId,
        amount: payment.amount,
        currency: payment.currency,
        transaction_id: payment.transactionId,
        status: payment.status ?? 'PENDING',
      },
    });

    return RepositoryMapper.toPaymentDomain(created);
  }
}
