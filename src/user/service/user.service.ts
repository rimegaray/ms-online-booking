import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User, UserProfile } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Patient } from 'src/patient/model/patient.model';
import { PrismaService } from 'src/common/service/prisma.service';
import { PatientService } from 'src/patient/service/patient.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly patientService: PatientService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUserById(userId: number): Promise<User> {
    return this.userRepository.findById(userId);
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async userNameExist(username: string): Promise<boolean> {
    const user = await this.userRepository.findByUsername(username);
    return !!user;
  }

  async createUser(user: User): Promise<User> {
    try {
      return this.userRepository.create(user);
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }

  async updateUser(user: User): Promise<User> {
    const getUser = await this.userRepository.findById(user.userId);
    if (!getUser) {
      throw new NotFoundException('Usuario no encontrado!');
    }
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    return this.userRepository.update(user);
  }

  async deleteUser(userId: number): Promise<void> {
    return this.userRepository.delete(userId);
  }

  async patchUser(userId: number, user: Partial<User>): Promise<User> {
    const getUser = await this.userRepository.findById(userId);
    if (!getUser) {
      throw new NotFoundException('Usuario no encontrado!');
    }
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    return this.userRepository.patch(userId, user);
  }

  async registerPatient(patientDto: Patient, userDto: User) {
    const result = await this.prisma.$transaction(async (tx) => {
      const patient = await this.patientService.createPatient(patientDto, tx);
      const user = await this.createUserPatient(userDto, patient.patientId, tx);
      return { patient, user };
    });
    return result;
  }

  private async createUserPatient(
    user: User,
    patientId: number,
    tx?: Prisma.TransactionClient,
  ): Promise<User> {
    try {
      return this.userRepository.create(
        {
          ...user,
          entityId: patientId,
          profile: UserProfile.PATIENT,
        },
        tx,
      );
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }
}
