import { Injectable } from '@nestjs/common';
import { Session } from 'src/session/model/session.model';

@Injectable()
export class RepositoryMapper {
  static toDomain(prismaSession: any): Session {
    return {
      sessionId: prismaSession.sessionId,
      title: prismaSession.title,
      description: prismaSession.description,
      bookingId: prismaSession.bookingId,
      patientId: prismaSession.patientId,
      sessionDate: prismaSession.sessionDate ?? undefined,
    };
  }
}
