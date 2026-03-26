import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import dbConfig from './configurations/database.config';
import { UsersModule } from '@modules/users/users.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { AddressesModule } from '@modules/addresses/addresses.module';
import { IngredientsModule } from '@modules/ingredients/ingredients.module';
import { ProductsModule } from '@modules/products/products.module';
import { ProductVariantsModule } from '@modules/product-variants/product-variants.module';
import { ProductIngredientsModule } from '@modules/product-ingredients/product-ingredients.module';
import { StartTimingMiddleware } from './common/middleware/start-timing.middleware';

/* import { AddressesModule } from '@modules/addresses/addresses.module';
import { IngredientsModule } from '@modules/ingredients/ingredients.module';
import { ProductsModule } from '@modules/products/products.module';
import { ProductVariantsModule } from '@modules/product-variants/product-variants.module';
import { ProductIngredientsModule } from '@modules/product-ingredients/product-ingredients.module';
 */
@Module({
  imports: [
    // Khởi tạo ConfigModule để quản lý configuration của app
    ConfigModule.forRoot({
      // isGlobal: true ConfigModule có thể dùng ở mọi module
      isGlobal: true,
      // load file database.config.ts
      load: [dbConfig],
      // chỉ định file env để đọc biến môi trường
      envFilePath: '.env',
    }),

    // Kết nối database bằng TypeORM
    // forRootAsync dùng khi config được tạo động (ví dụ đọc từ .env)
    TypeOrmModule.forRootAsync({
      // inject  truyền ConfigService vào useFactory
      inject: [ConfigService],

      useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
        configService.getOrThrow('database'),
    }),

    UsersModule,
    CategoriesModule,
    AddressesModule,
    IngredientsModule,
    ProductsModule,
    ProductVariantsModule,
    ProductIngredientsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StartTimingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
