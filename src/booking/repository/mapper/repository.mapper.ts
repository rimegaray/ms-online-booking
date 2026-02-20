import { Injectable } from '@nestjs/common';
import { Booking, Payment } from 'src/booking/model/booking.model';

@Injectable()
export class RepositoryMapper {
  static toDomain(prismaBooking: any): Booking {
    return {
      bookingId: prismaBooking.booking_id,
      patientId: prismaBooking.patient_id,
      psychologistId: prismaBooking.psychologist_id,
      serviceId: prismaBooking.service_id,
      bookingDate: prismaBooking.booking_date,
      timeRange: prismaBooking.time_range,
      state: prismaBooking.state ?? undefined,
      notes: prismaBooking.notes ?? undefined,
      statusNote: prismaBooking.status_note ?? undefined,
      paymentId: prismaBooking.payment_id ?? undefined,
      payment: prismaBooking.payment
        ? {
            paymentId: prismaBooking.payment.payment_id,
            paymentUuid: prismaBooking.payment.payment_uuid,
            bookingId: prismaBooking.payment.booking_id,
            amount: prismaBooking.payment.amount,
            currency: prismaBooking.payment.currency,
            transactionId: prismaBooking.payment.transaction_id,
            status: prismaBooking.payment.status ?? undefined,
            createdAt: prismaBooking.payment.created_at ?? undefined,
            updatedAt: prismaBooking.payment.updated_at ?? undefined
          }
        : undefined,
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
      paymentId: prismaPayment.payment_id,
      paymentUuid: prismaPayment.payment_uuid,
      bookingId: prismaPayment.booking_id,
      amount: prismaPayment.amount,
      currency: prismaPayment.currency,
      transactionId: prismaPayment.transaction_id,
      status: prismaPayment.status ?? undefined,
      createdAt: prismaPayment.created_at ?? undefined,
      updatedAt: prismaPayment.updated_at ?? undefined,
    };
  }
}
