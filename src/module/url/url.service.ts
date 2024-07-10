import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateUrlDto,
    CreateUrlWithCodeDto,
    FindUrlByCodeDto,
    HardDeleteUrlDto,
    SoftDeleteUrlDto,
} from 'src/dto';
import {
    UrlCreationFailedException,
    UrlDeletionFailedException,
    UrlNotFoundException,
    UrlRestoreFailedException,
    UrlsNotFoundException,
    UrlUpdateFailedException,
} from 'src/exception';
import { Url } from 'src/schema';
import { CodeService } from '../global/code.service';

@Injectable()
export class UrlService {
    constructor(
        @InjectModel(Url.name) private UrlModel: Model<Url>,
        private readonly codeService: CodeService,
    ) {}

    async createWithCode(
        createUrlWithCodeDto: CreateUrlWithCodeDto,
    ): Promise<Url> {
        try {
            const createdUrl = new this.UrlModel({
                ...createUrlWithCodeDto,
                createdAt: new Date(),
            });
            return createdUrl.save();
        } catch (error) {
            throw new UrlCreationFailedException();
        }
    }

    async createWithRandomCode(createUrlDto: CreateUrlDto): Promise<Url> {
        try {
            do {
                const randomCode = this.codeService.generateRandomCode(7);
                const existingUrl = await this.UrlModel.findOne({
                    code: randomCode,
                });

                if (existingUrl) continue;

                const createUrlWithCodeDto: CreateUrlWithCodeDto = {
                    ...createUrlDto,
                    code: randomCode,
                };
                const createdUrl = await new this.UrlModel({
                    ...createUrlWithCodeDto,
                    createdAt: new Date(),
                }).save();

                return createdUrl;
            } while (true);
        } catch (error) {
            console.log(error);
            throw new UrlCreationFailedException();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAll(): Promise<Url[]> {
        try {
            return this.UrlModel.find({
                deleted: false,
            }).exec();
        } catch (error) {
            throw new UrlsNotFoundException();
        }
    }

    async findByCode(findUrlByCodeDto: FindUrlByCodeDto): Promise<Url> {
        try {
            return this.UrlModel.findOne({
                code: findUrlByCodeDto.code,
                deleted: false,
            }).exec();
        } catch (error) {
            throw new UrlNotFoundException();
        }
    }

    async softDelete(softDeleteUrlDto: SoftDeleteUrlDto): Promise<Url> {
        try {
            return this.UrlModel.findOneAndUpdate(
                { code: softDeleteUrlDto.code },
                { deleted: true, deleteReason: softDeleteUrlDto.deleteReason },
                { new: true },
            ).exec();
        } catch (error) {
            throw new UrlDeletionFailedException();
        }
    }

    async delete(hardDeleteUrlDto: HardDeleteUrlDto): Promise<Url> {
        try {
            return this.UrlModel.findOneAndDelete({
                code: hardDeleteUrlDto.code,
            }).exec();
        } catch (error) {
            throw new UrlDeletionFailedException();
        }
    }

    async restore(code: string): Promise<Url> {
        try {
            return this.UrlModel.findOneAndUpdate(
                { code },
                { deleted: false, deleteReason: null },
                { new: true },
            ).exec();
        } catch (error) {
            throw new UrlRestoreFailedException();
        }
    }

    async update(code: string, updateUrlDto: CreateUrlDto): Promise<Url> {
        try {
            return this.UrlModel.findOneAndUpdate(
                { code },
                { ...updateUrlDto },
                { new: true },
            ).exec();
        } catch (error) {
            throw new UrlUpdateFailedException();
        }
    }

    async updateVisits(code: string): Promise<Url> {
        try {
            return this.UrlModel.findOneAndUpdate(
                { code },
                { $inc: { visits: 1 }, lastVisited: new Date() },
                { new: true },
            ).exec();
        } catch (error) {
            throw new UrlUpdateFailedException();
        }
    }
}
