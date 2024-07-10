import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';
config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        abortOnError: false,
        logger: ['error', 'warn', 'log'],
    });

    const version = app.get(ConfigService).get('VERSION');
    const port = app.get(ConfigService).get('PORT');

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // app.setGlobalPrefix(`api/${version}`);

    const documentConfig = new DocumentBuilder()
        .setTitle('Shorten Me API')
        .setDescription('Shorten Me API is a lightweight URL shortener service')
        .setVersion(version)
        .build();

    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup(`api/${version}/docs`, app, document);

    await app.listen(port);
}
bootstrap();
