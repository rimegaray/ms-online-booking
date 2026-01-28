export interface Booking {
  bookingId?: number;
  patientId: number;
  psychologistId: number;
  serviceId: number;
  bookingDate: Date;
  timeRange: string;
  state?: string;
  notes?: string;
  paymentId?: number;
  payment?: Payment;
  patient?: PatientInfo;
  psychologist?: PsychologistInfo;
  service?: ServiceInfo;
}

export interface PatientInfo {
  patientId: number;
  name: string;
  lastname: string;
  dni?: string;
  phoneNumber?: string;
}

export interface PsychologistInfo {
  psychologistId: number;
  name: string;
  lastname: string;
  specialty: string;
}

export interface ServiceInfo {
  serviceId: number;
  name: string;
  description: string;
  price: number;
}

export interface Payment {
  paymentId: number;
  paymentUuid: string;
  bookingId: number;
  amount: number;
  currency: string;
  transactionId: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
