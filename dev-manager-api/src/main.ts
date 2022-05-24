import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
  });
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  const config = new DocumentBuilder()
    .setTitle('Dev Manager API')
    .setDescription('Documentação referente as consultas disponíveis na API.')
    .setVersion('1.0')
    .addTag('devmanager')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
