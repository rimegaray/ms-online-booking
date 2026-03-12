import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service/prisma.service';
import { Service } from '../model/service.model';
import { RepositoryMapper } from './mapper/repository.mapper';
import { Prisma } from '@prisma/client';

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
        image: service.image,
      },
    });

    return RepositoryMapper.toDomain(created);
  }

  async findAll(where?: Prisma.serviceWhereInput): Promise<Service[]> {
    const lists = await this.prismaService.service.findMany({
      where,
    });

    return lists.map((services) => RepositoryMapper.toDomain(services));
  }

  async findById(serviceId: number): Promise<Service> {
    const service = await this.prismaService.service.findUnique({
      where: { service_id: serviceId },
    });
    return RepositoryMapper.toDomain(service);
  }

  async update(service: Service): Promise<Service> {
    const updated = await this.prismaService.service.update({
      where: { service_id: service.serviceId },
      data: {
        name: service.name,
        description: service.description,
        is_active: service.isActive,
        price: service.price,
        image: service.image,
      },
    });

    return RepositoryMapper.toDomain(updated);
  }

  async delete(serviceId: number): Promise<void> {
    await this.prismaService.service.delete({
      where: { service_id: serviceId },
    });
  }
}
