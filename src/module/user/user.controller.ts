import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, CreateUserWithRoleDto } from 'src/dto';
import { LoginUserDto } from 'src/dto/user/login.dto';
import { BaseException } from 'src/exception';
import { ResponseBuilder } from 'type';
import { EncryptionService } from '../global/encryption.service';
import { UserService } from './user.service';

@Controller('api/auth')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
    ) {}

    private responseBuilder = new ResponseBuilder();

    @Post('/login')
    async login(@Body() loginDto: LoginUserDto) {
        try {
            const token = await this.userService.login(loginDto);

            return this.responseBuilder
                .successWithoutMessage({ token })
                .build();
        } catch (error) {
            if (error instanceof BaseException) {
                return this.responseBuilder
                    .error(undefined, error.message)
                    .code(error.code)
                    .build();
            }

            return this.responseBuilder.error(undefined, error.message).build();
        }
    }

    @Post('/')
    async createUser(@Body() createUserWithRoleDto: CreateUserWithRoleDto) {
        try {
            createUserWithRoleDto.password = await this.encryptionService.hash(
                createUserWithRoleDto.password,
            );

            const user = await this.userService.createWithRole(
                createUserWithRoleDto,
            );

            return this.responseBuilder.successWithoutMessage(user).build();
        } catch (error) {
            if (error instanceof BaseException) {
                return this.responseBuilder
                    .error(undefined, error.message)
                    .code(error.code)
                    .build();
            }

            return this.responseBuilder.error(undefined, error.message).build();
        }
    }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        try {
            console.log(createUserDto.password);
            createUserDto.password = await this.encryptionService.hash(
                createUserDto.password,
            );

            const user = await this.userService.createUser(
                createUserDto,
                false,
            );
            delete user.data.password;

            return this.responseBuilder.successWithoutMessage(user).build();
        } catch (error) {
            if (error instanceof BaseException) {
                return this.responseBuilder
                    .error(undefined, error.message)
                    .code(error.code)
                    .build();
            }

            return this.responseBuilder.error(undefined, error.message).build();
        }
    }
}
