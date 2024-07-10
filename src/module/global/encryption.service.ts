import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
    constructor(private configService: ConfigService) {}

    private saltRound =
        parseInt(this.configService.get<string>('SALT_ROUNDS')) || 10;

    async hash(data: string): Promise<string> {
        return await bcrypt.hash(data, this.saltRound);
    }

    async compare(data: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(data, hash);
    }
}
