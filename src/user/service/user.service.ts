import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User, UserProfile } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/mail/service/email.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUserById(userId: number): Promise<User> {
    return this.userRepository.findById(userId);
  }

  getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username);
  }

  createUser(user: User): Promise<User> {
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

  async createUserPatient(user: User): Promise<User> {

    try {
      user.profile= UserProfile.PATIENT;
       const createdUserPatient = await this.userRepository.create(user);

      if(createdUserPatient.email){
        await this.emailService.sendMessage(user.username, user.email)
        .catch(error => console.error('Error enviando correo: ', error)); 
      }

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
}
