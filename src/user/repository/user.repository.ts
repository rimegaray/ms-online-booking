import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { User } from '../model/user.model';
import { RepositoryMapper } from './mapper/repository.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const list = await this.prisma.user.findMany();
    return list.map((user) => RepositoryMapper.toDomain(user));
  }

  async findById(id: number): Promise<User> {
    const found = await this.prisma.user.findUnique({
      where: { user_id: id },
    });
    return RepositoryMapper.toDomain(found);
  }

  async create(user: User): Promise<User> {
    const passwordEncryp = await bcrypt.hash(user.password, 12);
    const created = await this.prisma.user.create({
      data: {
        username: user.username,
        password: passwordEncryp,
        profile: user.profile,
        name: user.name,
        lastname: user.lastname,
        patient_id: user.patientId,
        psychologist_id: user.psychologistId,
        is_active: true,
      },
    });

    return RepositoryMapper.toDomain(created);
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { user_id: user.userId },
      data: {
        username: user.username,
        password: user.password,
        profile: user.profile,
        name: user.name,
        lastname: user.lastname,
        patient_id: user.patientId,
        psychologist_id: user.psychologistId,
        is_active: user.isActive,
      },
    });

    return RepositoryMapper.toDomain(updated);
  }

  async delete(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { user_id: userId }
    })
  }
}
