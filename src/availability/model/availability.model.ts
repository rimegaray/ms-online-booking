export interface Availability {
  availabilityId?: number;
  psychologistId: number;
  date?: Date | null;
  timeRange: string;
  isActive?: boolean;
}
