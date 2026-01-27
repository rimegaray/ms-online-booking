export class PatientResponseDto {
    patientId: number;
    name: string;
    lastname: string;
    age: number;
    dni: string;
    phoneNumber: string;
    tutorName: string;
    admissionDate: string;
    observations: string;
    lastSessionDate: string;
    signedConsent: string | null;
}