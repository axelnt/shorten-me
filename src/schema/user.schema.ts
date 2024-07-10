import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['user', 'admin', 'moderator'] })
    role: string;

    @Prop({ required: true, default: false })
    deleted: boolean;

    @Prop()
    deleteReason?: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    deletedBy?: string;

    @Prop({ required: true, default: false })
    banned: boolean;

    @Prop()
    banReason?: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    bannedBy?: User;

    @Prop({ type: Date, required: true })
    createdAt: Date;

    @Prop({ type: Date })
    bannedAt?: Date;

    @Prop({ type: Date })
    deletedAt?: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

export { UserSchema };
