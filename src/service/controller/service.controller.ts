import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from '../service/service.service';
import { ServiceRequestDto } from './dto/service-request.dto';
import { ServiceResponseDto } from './dto/service-response.dto';
import { ServiceMapper } from './mapper/service.mapper';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Role, Roles } from 'src/auth/roles/role.model';
import { CurrentUser } from 'src/auth/roles/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async createService(
    @Body() serviceRequestDto: ServiceRequestDto,
  ): Promise<ServiceResponseDto> {
    const model = ServiceMapper.toModel(serviceRequestDto);
    const service = await this.serviceService.createService(model);
    return ServiceMapper.toResponse(service);
  }

  @Roles(Role.PATIENT, Role.PSYCHOLOGIST, Role.SECRETARY)
  @Get()
  getAll(
    @CurrentUser() user,
  ): Promise<ServiceResponseDto[]> {
    return this.serviceService.findService(user);
  }

  @Get(':serviceId')
  getById(@Param('serviceId') serviceId: string): Promise<ServiceResponseDto> {
    return this.serviceService.findServiceById(Number(serviceId));
  }

  @Put(':serviceId')
  async updateService(
    @Param('serviceId') serviceId: string,
    @Body() service: ServiceRequestDto,
  ): Promise<ServiceResponseDto> {
    let model = ServiceMapper.toModel(service);
    model = {
      ...model,
      serviceId: Number(serviceId),
    };
    const serviceUpdate = await this.serviceService.updateService(model);
    return ServiceMapper.toResponse(serviceUpdate);
  }

  @Delete(':serviceId')
  deleteService(@Param('serviceId') serviceId: string): Promise<void> {
    return this.serviceService.deleteService(Number(serviceId));
  }
}
