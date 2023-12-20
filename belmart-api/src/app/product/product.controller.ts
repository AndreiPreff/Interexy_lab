import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put, Query, UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CreateProductDto} from "../../domain/create-product.dto";
import {FiltersProductsDto} from "../../domain/filters-products.dto";
import {UpdateProductDto} from "../../domain/update-product.dto";
import {JwtAuthGuard} from "../../libs/security/guards/jwt-auth.guard";
import {AdminRoleGuard} from "../../libs/security/guards/admin-role.guard";
import {ApiTags} from "@nestjs/swagger";

@Controller('products')
@ApiTags("Products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createProduct(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto)
  }

  @Get('')
  @HttpCode(200)
  async getProducts(@Query() filtersProductsDto: FiltersProductsDto) {
    return this.productService.getProducts(filtersProductsDto)
  }

  @Get(':id')
  @HttpCode(200)
  @Auth()
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProduct(id)
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: UpdateProductDto
  ) {
    return this.productService.updateProduct(id, productDto)
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id)
  }
}
