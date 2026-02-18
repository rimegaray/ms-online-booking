import { Injectable } from '@nestjs/common';
import { Booking } from 'src/booking/model/booking.model';
import { BookingRequestDto } from '../dto/booking-request.dto';
import {
  BookingResponseDto,
  PatientInfoDto,
  PsychologistInfoDto,
  ServiceInfoDto,
} from '../dto/booking-response.dto';
import { UpdateBookingDto } from '../dto/update-booking-request.dto';

@Injectable()
export class BookingMapper {
  static toModel(dto: BookingRequestDto): Booking {
    return {
      patientId: dto.patientId,
      psychologistId: dto.psychologistId,
      serviceId: dto.serviceId,
      bookingDate: dto.bookingDate,
      timeRange: dto.timeRange,
      notes: dto.notes,
    };
  }

  static toResponse(booking: Booking): BookingResponseDto {
    return {
      bookingId: booking.bookingId ?? 0,
      patientId: booking.patientId,
      psychologistId: booking.psychologistId,
      serviceId: booking.serviceId,
      bookingDate: booking.bookingDate,
      timeRange: booking.timeRange,
      state: booking.state ?? 'PENDING_PAYMENT',
      notes: booking.notes,
      paymentId: booking.paymentId,
      patient: booking.patient
        ? this.toPatientInfoDto(booking.patient)
        : undefined,
      psychologist: booking.psychologist
        ? this.toPsychologistInfoDto(booking.psychologist)
        : undefined,
      service: booking.service
        ? this.toServiceInfoDto(booking.service)
        : undefined,
    };
  }

  static toPatientInfoDto(patient: Booking['patient']): PatientInfoDto {
    if (!patient) return undefined as any;
    return {
      patientId: patient.patientId,
      name: patient.name,
      lastname: patient.lastname,
      dni: patient.dni,
      phoneNumber: patient.phoneNumber,
    };
  }

  static toPsychologistInfoDto(
    psychologist: Booking['psychologist'],
  ): PsychologistInfoDto {
    if (!psychologist) return undefined as any;
    return {
      psychologistId: psychologist.psychologistId,
      name: psychologist.name,
      lastname: psychologist.lastname,
      specialty: psychologist.specialty,
    };
  }

  static toServiceInfoDto(service: Booking['service']): ServiceInfoDto {
    if (!service) return undefined as any;
    return {
      serviceId: service.serviceId,
      name: service.name,
      description: service.description,
      price: service.price,
    };
  }

  static toUpdateModel(dto: UpdateBookingDto): Partial<Booking> {
    return {
      timeRange: dto.timeRange,
      notes: dto.notes,
      bookingDate: dto.bookingDate,
      state: dto.state,
      statusNote: dto.statusNote,
    }
  }
}
