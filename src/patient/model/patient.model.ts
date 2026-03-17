export interface Patient {
  readonly patientId: number;
  readonly name: string;
  readonly lastname: string;
  readonly age: number | null;
  readonly dni: string | null;
  readonly phoneNumber: string | null;
  readonly tutorName: string | null;
  readonly admissionDate: Date | null;
  readonly observations: string | null;
  readonly lastSessionDate: Date | null;
  readonly signedConsent: Uint8Array | null;
}

export interface CreatePatientDTO {
  readonly name: string;
  readonly lastname: string;
  readonly age: number;
  readonly dni: string;
  readonly phoneNumber: string;
  readonly tutorName?: string;
  readonly observations?: string;
  readonly lastSessionDate?: Date;
  readonly signedConsent?: Uint8Array;
}

export interface UpdatePatientDTO {
  readonly name?: string;
  readonly lastname?: string;
  readonly age?: number;
  readonly dni?: string;
  readonly phoneNumber?: string;
  readonly tutorName?: string;
  readonly observations?: string;
  readonly lastSessionDate?: Date;
  readonly signedConsent?: Uint8Array;
}
