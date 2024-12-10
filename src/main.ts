import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const { httpAdapter } = app.get(HttpAdapterHost);

    await app.listen(process.env.BACKEND_PORT!);
}

bootstrap();
