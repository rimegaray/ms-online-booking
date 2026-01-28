import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/service/prisma.service";
import { Service } from "../model/service.model";
import { RepositoryMapper } from "./mapper/repository.mapper";

@Injectable()
export class ServiceRepository {
    
    constructor(private readonly prismaService: PrismaService) {}

    async create(service: Service): Promise<Service> {
        const created = await this.prismaService.service.create({
            data: {
                name: service.name,
                description: service.description,
                is_active: service.isActive,
                price: service.price,
                image: service.image
            }
        });

        return RepositoryMapper.toDomain(created);
    }

    async findAll(): Promise<Service[]> {
        const lists = await this.prismaService.service.findMany();
        return lists.map((services) => RepositoryMapper.toDomain(services));
    }

    async findById(serviceId: number): Promise<Service> {
        const service = await this.prismaService.service.findUnique({
            where: {service_id: serviceId},
        })
        return RepositoryMapper.toDomain(service);
    }
}