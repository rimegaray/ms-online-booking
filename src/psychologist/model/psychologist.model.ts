export interface Psychologist {
  psychologistId: number;
  name: string;
  lastname: string;
  age: number;
  specialty?: string;
  phoneNumber: string;
  address?: string;
  dni: string;
  experience?: string;
  admissionDate?: Date;
  photo?: string;
  isActive?: boolean;
}
