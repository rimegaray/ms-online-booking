import { Injectable } from '@nestjs/common';
import { Service } from 'src/service/model/service.model';

@Injectable()
export class RepositoryMapper {
  static toDomain(prismaService: any): Service {
    return {
      serviceId: prismaService.service_id,
      name: prismaService.name,
      description: prismaService.description,
      isActive: prismaService.is_active,
      price: prismaService.price,
      image: prismaService.image,
    };
  }
}
