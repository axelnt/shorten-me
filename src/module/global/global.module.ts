import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CodeService } from './code.service';
import { EncryptionService } from './encryption.service';
import { TokenService } from './token.service';

@Module({
    imports: [ConfigModule],
    providers: [EncryptionService, TokenService, CodeService],
    exports: [],
})
export class GlobalModule {}
