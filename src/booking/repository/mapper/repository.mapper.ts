import { Injectable } from '@nestjs/common';
import { Booking, Payment } from 'src/booking/model/booking.model';

@Injectable()
export class RepositoryMapper {
  static toDomain(prismaBooking: any): Booking {
    return {
      bookingId: prismaBooking.bookingId,
      patientId: prismaBooking.patientId,
      psychologistId: prismaBooking.psychologistId,
      serviceId: prismaBooking.serviceId,
      bookingDate: prismaBooking.bookingDate,
      timeRange: prismaBooking.timeRange,
      state: prismaBooking.state ?? undefined,
      notes: prismaBooking.notes ?? undefined,
      paymentId: prismaBooking.paymentId ?? undefined,
      patient: prismaBooking.patient
        ? {
            patientId: prismaBooking.patient.patient_id,
            name: prismaBooking.patient.name,
            lastname: prismaBooking.patient.lastname,
            dni: prismaBooking.patient.dni ?? undefined,
            phoneNumber: prismaBooking.patient.phone_number ?? undefined,
          }
        : undefined,
      psychologist: prismaBooking.psychologist
        ? {
            psychologistId: prismaBooking.psychologist.psychologist_id,
            name: prismaBooking.psychologist.name,
            lastname: prismaBooking.psychologist.lastname,
            specialty: prismaBooking.psychologist.specialty,
          }
        : undefined,
      service: prismaBooking.service
        ? {
            serviceId: prismaBooking.service.service_id,
            name: prismaBooking.service.name,
            description: prismaBooking.service.description,
            price: prismaBooking.service.price,
          }
        : undefined,
    };
  }

  static toPaymentDomain(prismaPayment: any): Payment {
    return {
      id: prismaPayment.id,
      paymentId: prismaPayment.paymentId,
      bookingId: prismaPayment.bookingId,
      amount: prismaPayment.amount,
      currency: prismaPayment.currency,
      transactionId: prismaPayment.transactionId,
      status: prismaPayment.status ?? undefined,
      createdAt: prismaPayment.createdAt ?? undefined,
      updatedAt: prismaPayment.updatedAt ?? undefined,
    };
  }
}
