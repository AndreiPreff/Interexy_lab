import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {PrismaService} from "../../libs/prisma.service";
import {UserModule} from "../user/user.module";
import {PaginationModule} from "../pagination/pagination.module";

@Module({
  imports: [UserModule, PaginationModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService]
})
export class ProductModule {}
