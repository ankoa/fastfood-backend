import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/repspone.interceptor';
import { AllExceptionFilter } from './common/filters/AllExceptionFilter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* console.log(process.env.PORT); */
  const reflector = app.get(Reflector);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes undefined or extra fields that are not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if the request contains fields not defined in the DTO
      transform: true, // Automatically transforms data types (e.g., converts query string '123' to number 123)
      /*  transformOptions: {
        enableImplicitConversion: true, // Allows implicit type conversion based on the DTO types (apperance errorr unexpect)
      }, */
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
