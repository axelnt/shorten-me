import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './middleware';
import { GlobalModule } from './module/global/global.module';
import { HealthModule } from './module/health/health.module';
import { ShortModule } from './module/short/short.module';
import { UrlModule } from './module/url/url.module';
import { UserModule } from './module/user/user.module';

@Module({
    imports: [
        UserModule,
        UrlModule,
        GlobalModule,
        HealthModule,
        ShortModule,
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {}),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    // only allow api/user/login and api/user/register without token
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude('/api/auth/login', '/api/auth/register')
            .forRoutes('/api/*');
    }
}
