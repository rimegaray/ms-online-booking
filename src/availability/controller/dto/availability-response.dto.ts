export interface AvailabilityResponseDto {
  availabilityId: number;
  psychologistId: number;
  date?: Date | null;
  timeRange: string;
  isActive?: string;
}
