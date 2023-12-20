import {Module} from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './app/user/user.module';
import { ProductModule } from './app/product/product.module';
import { OrderModule } from './app/order/order.module';
import { PaginationModule } from './app/pagination/pagination.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {PrismaService} from "./libs/prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ServeStaticModule.forRoot({serveRoot: '/images', rootPath: path.resolve(__dirname, 'static')}),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
    PaginationModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
