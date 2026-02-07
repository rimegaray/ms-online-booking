import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRefreshToken(refreshToken: string) {
    return await this.prisma.auth.findFirst({
      where: { refresh_token: refreshToken },
    });
  }

  async upsertRefreshToken(
    userId: number,
    refreshToken: string,
    entityId: number,
  ) {
    const expiresAt = new Date(Date.now() + 120 * 60 * 1000);

    return this.prisma.auth.upsert({
      where: {
        user_id: userId,
      },
      update: {
        refresh_token: refreshToken,
        expires_at: expiresAt,
      },
      create: {
        user_id: userId,
        refresh_token: refreshToken,
        entity_id: entityId,
        expires_at: expiresAt,
      },
    });
  }

  async deleteByRefreshToken(refreshToken: string) {
    return await this.prisma.auth.deleteMany({
      where: { refresh_token: refreshToken },
    });
  }
}
