export class PatientInfoDto {
  patientId: number;
  name: string;
  lastname: string;
  dni?: string;
  phoneNumber?: string;
}

export class PsychologistInfoDto {
  psychologistId: number;
  name: string;
  lastname: string;
  specialty: string;
}

export class ServiceInfoDto {
  serviceId: number;
  name: string;
  description: string;
  price: number;
}

export class BookingResponseDto {
  bookingId: number;
  patientId: number;
  psychologistId: number;
  serviceId: number;
  bookingDate: Date;
  timeRange: string;
  state: string;
  notes?: string;
  paymentId?: string;
  patient?: PatientInfoDto;
  psychologist?: PsychologistInfoDto;
  service?: ServiceInfoDto;
}
