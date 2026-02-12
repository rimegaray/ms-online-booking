export interface Patient {
  patientId: number;
  name: string;
  lastname: string;
  age: number;
  dni: string;
  phoneNumber: string;
  tutorName: string;
  admissionDate?: Date;
  observations: string;
  lastSessionDate?: Date;
  signedConsent: Uint8Array | null;
}
