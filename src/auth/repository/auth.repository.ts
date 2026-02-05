import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/service/prisma.service";

@Injectable()
export class AuthRepository {

    constructor( private readonly prisma: PrismaService ) {}

    async findByUsername(username: string) {
        return await this.prisma.user.findUnique({
            where: { username: username },
        })
    }

    async saved(userId: number, refreshToken: string, entityId: number) {
        return this.prisma.auth.create({
            data: {
                user_id: userId,
                refresh_token: refreshToken,
                entity_id: entityId,
                expires_at: new Date(Date.now() + 120 * 60 * 1000)
            }
        })
    }

    async findByRefreshToken(refreshToken: string) {
        return await this.prisma.auth.findFirst({
            where: { refresh_token: refreshToken },
        });
    }

    async updateRefreshToken(authId: number, refreshToken: string, expiresAt: Date) {

        const updateCreateAt = new Date(Date.now());
        return await this.prisma.auth.update({
            where: { auth_id: authId},
            data: {
                refresh_token: refreshToken,
                created_at: updateCreateAt,
                expires_at: expiresAt
            },
        });
    }

    async deleteByRefreshToken(refreshToken: string) {
        return await this.prisma.auth.deleteMany({
            where: {refresh_token: refreshToken},
        });
    }

    async deleteAllByUserId(userId: number) {
        return await this.prisma.auth.deleteMany({
            where: { user_id: userId },
        });
    }
}