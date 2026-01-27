import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "../model/user.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    getUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    getUserById(userId: number): Promise<User> {
        return this.userRepository.findById(userId);
    }

    createUser(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    async updateUser(user: User): Promise<User> {
        const getUser = this.userRepository.findById(user.userId);
        if(!getUser){
            throw new NotFoundException('Usuario no encontrado!')
        }
        if(user.password){
            user.password = await bcrypt.hash(user.password, 12);
        }

        return this.userRepository.update(user);
    }
}