import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from 'src/schema/url.schema';
import { UrlService } from '../url/url.service';
import { ShortController } from './short.controller';
import { CodeService } from '../global/code.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }])],
    providers: [UrlService, CodeService],
    controllers: [ShortController],
    exports: [],
})
export class ShortModule {}
