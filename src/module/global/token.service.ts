import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    async generateToken(data: any): Promise<string> {
        return this.jwtService.sign(data);
    }
}
