import { Injectable } from '@nestjs/common';
import { Session } from 'src/session/model/session.model';

@Injectable()
export class RepositoryMapper {
  static toDomain(prismaSession: any): Session {
    return {
      sessionId: prismaSession.session_id,
      title: prismaSession.title,
      description: prismaSession.description,
      bookingId: prismaSession.booking_id,
      patientId: prismaSession.patient_id,
      sessionDate: prismaSession.session_date ?? undefined,
    };
  }
}
