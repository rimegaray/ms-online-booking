import { ForbiddenException, Injectable } from '@nestjs/common';
import { ServiceRepository } from '../repository/service.repository';
import { Service } from '../model/service.model';
import { AuthUser } from 'src/auth/jwt/jwt.guard';
import { Role } from 'src/auth/roles/role.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  createService(service: Service): Promise<Service> {
    return this.serviceRepository.create(service);
  }

  findService(user: AuthUser): Promise<Service[]> {
    const where = this.buildFilterByRole(user);
    return this.serviceRepository.findAll(where);
  }

  private buildFilterByRole(user: AuthUser): Prisma.serviceWhereInput {
    const where: Prisma.serviceWhereInput = {};
    switch (user.role) {
      case Role.PATIENT:
        where.is_active = true;
        break;
      case Role.PSYCHOLOGIST:
        break;
      case Role.SECRETARY:
        break;
      default:
        throw new ForbiddenException();
    }
    return where;
  }

  findServiceById(serviceId: number): Promise<Service> {
    return this.serviceRepository.findById(serviceId);
  }

  updateService(service: Service): Promise<Service> {
    return this.serviceRepository.update(service);
  }

  deleteService(serviceId: number): Promise<void> {
    return this.serviceRepository.delete(serviceId);
  }
}
