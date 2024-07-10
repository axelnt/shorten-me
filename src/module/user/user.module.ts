import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { EncryptionService } from '../global/encryption.service';
import { TokenService } from '../global/token.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    providers: [UserService, EncryptionService, TokenService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
