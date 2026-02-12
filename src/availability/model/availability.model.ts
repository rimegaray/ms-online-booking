export interface Availability {
  availabilityId?: number;
  psychologistId: number;
  date?: Date | null;
  timeRange: string;
  isActive?: AvailabilityStatus;
}

export enum AvailabilityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RESERVED = 'RESERVED',
}
