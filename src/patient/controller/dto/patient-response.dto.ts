export class PatientResponseDto {
  patientId!: number;
  name!: string;
  lastname!: string;
  age!: number | null;
  dni!: string | null;
  phoneNumber!: string | null;
  tutorName?: string | null;
  admissionDate?: Date | null;
  observations?: string | null;
  lastSessionDate?: Date | null;
}
