import { IsNotEmpty, IsString } from 'class-validator';

export class FindAllUserDto {}

export class FindUserByUsernameDto {
    @IsString()
    @IsNotEmpty()
    username: string;
}
