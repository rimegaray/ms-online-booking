import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SessionService } from '../service/session.service';
import { SessionResponseDto } from './dto/session-response.dto';
import { SessionRequestDto } from './dto/session-request.dto';
import { SessionMapper } from './mapper/session.mapper';

@Controller('/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getSessions(
    @Query('patientId') patientId?: string,
  ): Promise<SessionResponseDto[]> {
    if (patientId) {
      const sessions = await this.sessionService.getSessionsByPatientId(
        Number(patientId),
      );
      return sessions.map((session) => SessionMapper.toResponse(session));
    }
    const sessions = await this.sessionService.getSessions();
    return sessions.map((session) => SessionMapper.toResponse(session));
  }

  @Get(':sessionId')
  getSessionById(
    @Param('sessionId') sessionId: string,
  ): Promise<SessionResponseDto> {
    return this.sessionService
      .getSessionById(Number(sessionId))
      .then((session) => SessionMapper.toResponse(session));
  }

  @Post()
  async postSession(
    @Body() sessionRequestDto: SessionRequestDto,
  ): Promise<SessionResponseDto> {
    const model = SessionMapper.toModel(sessionRequestDto);
    const session = await this.sessionService.createSession(model);
    return SessionMapper.toResponse(session);
  }

  @Put(':sessionId')
  async updateSession(
    @Param('sessionId') sessionId: string,
    @Body() sessionRequestDto: SessionRequestDto,
  ): Promise<SessionResponseDto> {
    let model = SessionMapper.toModel(sessionRequestDto);
    model = {
      ...model,
      sessionId: Number(sessionId),
    };
    const session = await this.sessionService.updateSession(model);
    return SessionMapper.toResponse(session);
  }

  @Delete(':sessionId')
  deleteSession(@Param('sessionId') sessionId: string): Promise<void> {
    return this.sessionService.deleteSession(Number(sessionId));
  }
}
