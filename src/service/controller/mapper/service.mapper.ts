import { Injectable } from "@nestjs/common";
import { ServiceRequestDto } from "../dto/service-request.dto";
import { Service } from "src/service/model/service.model";
import { ServiceResponseDto } from "../dto/service-response.dto";

@Injectable()
export class ServiceMapper {
    static toModel(dto: ServiceRequestDto): Service {
        return {
            serviceId: 0,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            image: dto.image,
            isActive: dto.isActive,
        }
    }

    static toResponse(service: Service): ServiceResponseDto {
        return {
            serviceId: service.serviceId,
            name: service.name,
            description: service.description,
            price: service.price,
            image: service.image,
            isActive: service.isActive
        }
    }
}