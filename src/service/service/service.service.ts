import { Injectable } from "@nestjs/common";
import { ServiceRepository } from "../repository/service.repository";
import { Service } from "../model/service.model";

@Injectable()
export class ServiceService {

    constructor(private readonly serviceRepository: ServiceRepository) {}

    createService(service: Service): Promise<Service> {
        return this.serviceRepository.create(service);
    }

    findService(): Promise<Service[]> {
        return this.serviceRepository.findAll();
    }

    findServiceById(serviceId: number): Promise<Service> {
        return this.serviceRepository.findById(serviceId);
    }
}