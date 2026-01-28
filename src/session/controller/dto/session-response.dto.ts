export class SessionResponseDto {
  sessionId: number;
  title: string;
  description: string;
  bookingId: number;
  patientId: number;
  sessionDate?: Date;
}
