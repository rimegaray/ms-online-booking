import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User, UserProfile } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/mail/service/email.service';
import { Prisma } from '@prisma/client';
import { Patient } from 'src/patient/model/patient.model';
import { PrismaService } from 'src/common/service/prisma.service';
import { PatientService } from 'src/patient/service/patient.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
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
    if(!user) {
      throw new NotFoundException('Usuario no encontrado')
    }
    return user;
  }

  async userNameExist(username: string): Promise<boolean> {
    const user = await this.userRepository.findByUsername(username);
    return !!user;
  }

  async createUser(user: User): Promise<User> {
    const exist = await this.userNameExist(user.username);
    if(exist) {
      throw new ConflictException('Usuario ya existe');
    }
    return this.userRepository.create(user);
  }

  async updateUser(user: User): Promise<User> {
    const getUser = this.userRepository.findById(user.userId);
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

  async createUserPatient(user: User, tx?: Prisma.TransactionClient): Promise<User> {

    try {
      user.profile= UserProfile.PATIENT;
      const createdUserPatient = await this.userRepository.create(user, tx);
      return createdUserPatient;
    } catch (error) {
      if((error as any)?.code === 'P2002'){
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }

  async patchUser(userId: number, user: Partial<User>): Promise<User> {
    const getUser = this.userRepository.findById(userId);
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

      const user = await this.createUserPatient(
        {
          ...userDto,
          entityId: patient.patientId,
        },
        tx,
      );

      return {patient, user}
    });
    if(result.user.email){
        await this.emailService.sendMessage(result.user.username, result.user.email)
        .catch(error => console.error('Error enviando correo: ', error)); 
    }
      
    return result;
  }
}
