import { Controller, Get } from '@nestjs/common';
import { ResponseBuilder } from 'type';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    private responseBuilder = new ResponseBuilder();

    @Get('/')
    async check() {
        try {
            const response = {
                status: this.healthService.check(),
            };

            return this.responseBuilder.success(response, undefined).build();
        } catch (error) {
            return this.responseBuilder.error(undefined, error.message).build();
        }
    }
}
