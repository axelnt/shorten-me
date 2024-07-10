import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateUrlWithCodeDto } from 'src/dto';
import { BaseException } from 'src/exception';
import { RoleGuard } from 'src/guard/role.guard';
import { ResponseBuilder } from 'type';
import { UrlService } from './url.service';

@Controller('api/url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    private responseBuilder = new ResponseBuilder();

    @UseGuards(RoleGuard(['admin']))
    @Get('/')
    async getAllUrls() {
        try {
            const urls = await this.urlService.findAll();

            return this.responseBuilder.successWithoutMessage(urls).build();
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

    @UseGuards(RoleGuard(['admin']))
    @Get('/:code')
    async getUrlByCode(@Param('code') code: string) {
        try {
            const response = await this.urlService.findByCode({ code });

            return this.responseBuilder.successWithoutMessage(response).build();
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

    @UseGuards(RoleGuard(['admin']))
    @Post('/')
    async createUrlWithCode(
        @Body() createUrlWithCodeDto: CreateUrlWithCodeDto,
    ) {
        try {
            const response =
                await this.urlService.createWithCode(createUrlWithCodeDto);

            return this.responseBuilder.successWithoutMessage(response).build();
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

    @UseGuards(RoleGuard(['admin']))
    @Delete('/:code')
    async deleteUrlByCode(@Param('code') code: string) {
        try {
            await this.urlService.softDelete({ code });

            return this.responseBuilder.successWithoutMessage().build();
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

    @UseGuards(RoleGuard(['admin']))
    @Delete('/:code/hard')
    async hardDeleteUrlByCode(@Param('code') code: string) {
        try {
            await this.urlService.delete({ code });

            return this.responseBuilder.successWithoutMessage().build();
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

    @UseGuards(RoleGuard(['admin']))
    @Patch('/:code')
    async updateUrlByCode(
        @Param('code') code: string,
        @Body() updateUrlDto: CreateUrlWithCodeDto,
    ) {
        try {
            const response = await this.urlService.update(code, updateUrlDto);

            return this.responseBuilder.successWithoutMessage(response).build();
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

    @UseGuards(RoleGuard(['admin']))
    @Patch('/:code/restore')
    async restoreUrlByCode(@Param('code') code: string) {
        try {
            await this.urlService.restore(code);

            return this.responseBuilder.successWithoutMessage().build();
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
