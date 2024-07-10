import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/module/user/user.service';
import { ResponseBuilder } from 'type';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    private responseBuilder = new ResponseBuilder();

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];

        console.log(token);

        if (!token) {
            return this.responseBuilder
                .errorWithoutData('Unauthorized')
                .code(401)
                .build();
        }

        try {
            const decoded = await this.jwtService.verify(
                token.toString().split('Bearer ')[1],
                {
                    secret: process.env.JWT_SECRET,
                },
            );

            if (!decoded) {
                return this.responseBuilder
                    .errorWithoutData('Unauthorized')
                    .code(401)
                    .build();
            }

            const user = await this.userService.findOne({
                username: decoded.username,
            });

            if (!user || user.banned || user.deleted) {
                return this.responseBuilder
                    .errorWithoutData('Unauthorized')
                    .code(401)
                    .build();
            }

            req['user'] = {
                username: user.username,
                role: user.role,
            };

            next();
        } catch (error) {
            return this.responseBuilder
                .errorWithoutData('Unauthorized')
                .code(401)
                .build();
        }
    }
}
