import { Session } from 'src/session/model/session.model';
import { SessionRequestDto } from '../dto/session-request.dto';
import { SessionResponseDto } from '../dto/session-response.dto';

export class SessionMapper {
  static toModel(dto: SessionRequestDto): Session {
    return {
      sessionId: 0,
      title: dto.title.trim(),
      description: dto.description.trim(),
      bookingId: dto.bookingId,
      patientId: dto.patientId,
      sessionDate: dto.sessionDate,
    };
  }

  static toResponse(model: Session): SessionResponseDto {
    return {
      sessionId: model.sessionId,
      title: model.title,
      description: model.description,
      bookingId: model.bookingId,
      patientId: model.patientId,
      sessionDate: model.sessionDate,
    };
  }
}
