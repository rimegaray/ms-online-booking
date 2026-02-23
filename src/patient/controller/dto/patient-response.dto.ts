export class PatientResponseDto {
  patientId!: number;
  name!: string;
  lastname!: string;
  age!: number;
  dni!: string;
  phoneNumber!: string;
  tutorName?: string;
  admissionDate?: Date;
  observations!: string;
  lastSessionDate?: Date;
  signedConsent!: string | null;
}
