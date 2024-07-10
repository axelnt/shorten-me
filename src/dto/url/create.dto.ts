import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
    @IsString()
    @IsNotEmpty()
    @IsUrl({
        require_protocol: true,
        protocols: ['https'],
    })
    url: string;
}

export class CreateUrlWithCodeDto extends CreateUrlDto {
    @IsString()
    @IsNotEmpty()
    code: string;
}
