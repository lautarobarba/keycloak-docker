import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "app.module";
import * as cookieParser from "cookie-parser";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS
  app.enableCors({
    origin: ["http://localhost", "http://localhost:8000"],
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  // Cookies
  app.use(cookieParser());

  // Configuro el prefijo para todas las rutas
  app.setGlobalPrefix("api");

  // Archivos estaticos
  app.useStaticAssets(join(__dirname, "..", "emails/assets"), {
    prefix: "/api/assets/",
  });
  app.setBaseViewsDir(join(__dirname, "..", "emails/templates"));
  app.setViewEngine("hbs");

  // Configuración para swagger
  const config = new DocumentBuilder()
    .setTitle("API - JARDÍN BOTÁNICO USHUAIA")
    .setDescription("API jardín botánico ushuaia")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(AppModule.port);
}
bootstrap();
