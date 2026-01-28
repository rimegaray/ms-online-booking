import { Injectable } from '@nestjs/common';
import { Session } from '../model/session.model';
import { SessionRepository } from '../repository/session.repository';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  getSessions(): Promise<Session[]> {
    return this.sessionRepository.findAll();
  }

  getSessionById(sessionId: number): Promise<Session> {
    return this.sessionRepository.findById(sessionId);
  }

  createSession(session: Session): Promise<Session> {
    return this.sessionRepository.create(session);
  }

  updateSession(session: Session): Promise<Session> {
    return this.sessionRepository.update(session);
  }

  deleteSession(sessionId: number): Promise<void> {
    return this.sessionRepository.delete(sessionId);
  }

  getSessionsByPatientId(patientId: number): Promise<Session[]> {
    return this.sessionRepository.findByPatientId(patientId);
  }
}
