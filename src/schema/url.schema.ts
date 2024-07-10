import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '.';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
    @Prop({ required: true })
    url: string;

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true, default: false })
    deleted: boolean;

    @Prop()
    deleteReason: string;

    @Prop({ required: true, default: 0 })
    visits: number;

    @Prop({ type: Date })
    lastVisited: Date;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
    })
    createdBy: User;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
    })
    deletedBy: User;

    @Prop({ type: Date, required: true })
    createdAt: Date;

    @Prop({ type: Date })
    deletedAt: Date;
}

const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

export { UrlSchema };
