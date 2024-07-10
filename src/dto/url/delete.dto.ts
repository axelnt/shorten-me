import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUrlDto {
    @IsString()
    @IsNotEmpty()
    code: string;
}

export class SoftDeleteUrlDto extends DeleteUrlDto {
    @IsString()
    deleteReason?: string;
}
export class HardDeleteUrlDto extends DeleteUrlDto {}
