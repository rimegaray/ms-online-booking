export enum Role {
  SECRETARY = 'SECRETARY',
  PATIENT = 'PATIENT',
  PSYCHOLOGIST = 'PSYCHOLOGIST',
}

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);