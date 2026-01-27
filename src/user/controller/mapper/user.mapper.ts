import { User } from "src/user/model/user.model";
import { UserRequestDto } from "../dto/user-request.dto";
import { UserResponseDto } from "../dto/user-response.dto";

export class UserMapper{
    static toModel(dto: UserRequestDto): User {
        return {
            userId: 0,
            username: dto.username.trim(),
            password: dto.password.trim(),
            profile: dto.profile,
            name: dto.name.trim(),
            lastname: dto.lastname.trim(),
            patientId: dto.patientId,
            psychologistId: dto.psychologistId,
            isActive: dto.isActive,
        }
    }

    static toResponse(model: User): UserResponseDto {
        return {
            userId: model.userId,
            username: model.username,
            password: model.password,
            profile: model.profile,
            name: model.name,
            lastname: model.lastname,
            patientId: model.patientId,
            psychologistId: model.psychologistId,
            isActive: model.isActive,
        }
    }
}