import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    constructor() {}

    check(): boolean {
        return true;
    }
}
