import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class CreateUserWithRoleDto extends CreateUserDto {
    @IsString()
    @IsEnum(['user', 'admin', 'moderator'])
    role: string = 'user';
}
