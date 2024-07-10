import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateUserDto,
    CreateUserWithRoleDto,
    FindAllUserDto,
    FindUserByUsernameDto,
    HardDeleteUserDto,
    SoftDeleteUserDto,
} from 'src/dto';
import { LoginUserDto } from 'src/dto/user/login.dto';
import {
    UserLoginFailedException,
    UserRegistrationFailedException,
} from 'src/exception/user.exception';
import { User } from 'src/schema';
import { EncryptionService } from '../global/encryption.service';
import { TokenService } from '../global/token.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private readonly encryptionService: EncryptionService,
        private readonly tokenService: TokenService,
    ) {}

    async login(loginUserDto: LoginUserDto): Promise<string> {
        try {
            const user = await this.findOne({
                username: loginUserDto.username,
            });

            if (!user) throw new Error('User not found');

            const isPasswordValid = await this.encryptionService.compare(
                loginUserDto.password,
                user.password,
            );

            if (!isPasswordValid) throw new Error('Invalid password');

            const token = await this.tokenService.generateToken({
                username: user.username,
            });

            return token;
        } catch (error) {
            console.log(error);
            throw new UserLoginFailedException();
        }
    }

    async createUser(
        createUserDto: CreateUserDto,
        hash: boolean = true,
    ): Promise<User> {
        const existingUser = await this.findOne({
            username: createUserDto.username,
        });

        if (existingUser) throw new UserRegistrationFailedException();

        const hashedPassword = hash
            ? await this.encryptionService.hash(createUserDto.password)
            : createUserDto.password;

        const user: User = {
            ...createUserDto,
            password: hashedPassword,
            role: 'user',
            deleted: false,
            banned: false,
            createdAt: new Date(),
        };

        const createdUser = new this.UserModel(user);

        return createdUser.save();
    }

    async createWithRole(
        createUserWithRoleDto: CreateUserWithRoleDto,
    ): Promise<User> {
        const user: User = {
            ...createUserWithRoleDto,
            deleted: false,
            banned: false,
            createdAt: new Date(),
        };

        const createdUser = new this.UserModel(user);
        return createdUser.save();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAll(findAllUserDto: FindAllUserDto): Promise<User[]> {
        return this.UserModel.find().exec();
    }

    async findOne(findUserByUsernameDto: FindUserByUsernameDto): Promise<User> {
        return this.UserModel.findOne(findUserByUsernameDto).exec();
    }

    async softDelete(softDeleteUserDto: SoftDeleteUserDto): Promise<User> {
        return this.UserModel.findOneAndUpdate(
            { username: softDeleteUserDto.username },
            { deleted: true, deleteReason: softDeleteUserDto.deleteReason },
            { new: true },
        ).exec();
    }

    async delete(hardDeleteUserDto: HardDeleteUserDto): Promise<User> {
        return this.UserModel.findOneAndDelete({
            username: hardDeleteUserDto.username,
        }).exec();
    }
}
