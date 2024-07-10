import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUrlDto } from 'src/dto';
import { BaseException, UrlNotFoundException } from 'src/exception';
import { ResponseBuilder } from 'type';
import { UrlService } from '../url/url.service';

@Controller()
export class ShortController {
    constructor(private readonly urlService: UrlService) {}

    responseBuilder = new ResponseBuilder();

    @Get('/:code')
    async getShortUrl(@Param('code') code: string, @Res() res: Response) {
        try {
            const url = await this.urlService.findByCode({ code });

            if (url) {
                await this.urlService.updateVisits(code);

                return res.redirect(url.url);
            } else {
                throw new UrlNotFoundException();
            }
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

    @Post('/generate')
    async generateShortUrl(
        @Body() createUrlDto: CreateUrlDto,
        @Req() req: Request,
    ) {
        try {
            const url = await this.urlService.createWithRandomCode({
                url: createUrlDto.url,
            });

            const shortUrl = `${req.protocol}://${req.get('Host')}/${url.code}`;

            return this.responseBuilder.success(shortUrl, undefined).build();
        } catch (error) {
            console.log(error);
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
