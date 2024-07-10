import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from 'src/schema/url.schema';
import { CodeService } from '../global/code.service';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }])],
    providers: [UrlService, CodeService],
    controllers: [UrlController],
    exports: [],
})
export class UrlModule {}
