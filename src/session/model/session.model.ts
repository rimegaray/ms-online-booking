export interface Session {
  sessionId: number;
  title: string;
  description: string;
  bookingId: number;
  patientId: number;
  sessionDate?: Date;
}
