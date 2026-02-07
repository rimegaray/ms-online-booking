export interface User {
  userId: number;
  username: string;
  password: string;
  profile?: string;
  name: string;
  lastname: string;
  entityId: number;
  isActive: boolean;
}

export enum UserProfile {
  PATIENT = 'PATIENT',
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  SECRETARY = 'SECRETARY',
  ADMINISTRATOR = 'ADMINISTRATOR'
}
