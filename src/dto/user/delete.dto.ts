import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
}

export class SoftDeleteUserDto extends DeleteUserDto {
    @IsString()
    deleteReason?: string;
}
export class HardDeleteUserDto extends DeleteUserDto {}
