import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ServiceService } from "../service/service.service";
import { ServiceRequestDto } from "./dto/service-request.dto";
import { ServiceResponseDto } from "./dto/service-response.dto";
import { ServiceMapper } from "./mapper/service.mapper";
import { AuthGuard } from "@nestjs/passport";

@Controller('/service')
export class ServiceController {

    constructor( private readonly serviceService: ServiceService ) {}

    @Post()
    async createService(@Body() serviceRequestDto: ServiceRequestDto): Promise<ServiceResponseDto> {
        const model = ServiceMapper.toModel(serviceRequestDto);
        const service = await this.serviceService.createService(model);
        return ServiceMapper.toResponse(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll(): Promise<ServiceResponseDto[]> {
        return this.serviceService.findService();
    }

    @Get(':serviceId')
    getById(@Param('serviceId') serviceId: string): Promise<ServiceResponseDto> {
        return this.serviceService.findServiceById(Number(serviceId));
    }
}