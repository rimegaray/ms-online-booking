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
}