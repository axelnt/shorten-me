import { IsNotEmpty, IsString } from 'class-validator';

export class FindAllUrlDto {}

export class FindUrlByCodeDto {
    @IsString()
    @IsNotEmpty()
    code: string;
}
