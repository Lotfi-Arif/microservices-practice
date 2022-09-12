import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PostsModule } from './posts.module';

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
