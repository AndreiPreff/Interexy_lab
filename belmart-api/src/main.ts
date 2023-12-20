// main.ts

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./libs/prisma.service";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);

  app.setGlobalPrefix("api");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Belmart Online Shop")
    .setDescription("Belmart backend")
    .setVersion("1.0")
    .addTag("Belmart")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}!`));
}
bootstrap();
