import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import {PrismaService} from "../../libs/prisma.service";
import {CreateProductDto} from "../../domain/create-product.dto";
import {returnProductObject} from "./return-product.object";
import {EnumProductsSort, FiltersProductsDto} from "../../domain/filters-products.dto";
import {PaginationService} from "../pagination/pagination.service";
import {Prisma} from "@prisma/client";
import {UpdateProductDto} from "../../domain/update-product.dto";


@Injectable()
export class ProductService {

  constructor(
    private prismaService: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async createProduct(productDto: CreateProductDto) {
    try {
      const {title, price, description, image_url, available_amount} = productDto
      return await this.prismaService.product.create({
        data: {
          title: title,
          price: price,
          description: description,
          image_url: image_url,
          available_amount: available_amount
        }
      })
    } catch (error) {
      if (error.code === "P2002") {
        throw new BadRequestException("Product with the same title already exists!")
      } 
      throw new InternalServerErrorException(`Something went wrong! ${error.message}`)
    }
  }

  async getProducts(filtersProductsDto: FiltersProductsDto = {}) {
    const {perPage, skip} = this.paginationService.getPagination(filtersProductsDto)
    const filters = this.createFilter(filtersProductsDto)

    const products = await this.prismaService.product.findMany({
      where: filters,
      select: returnProductObject,
      orderBy: this.getSortOption(filtersProductsDto.sort),
      skip,
      take: perPage
    })
    const count = await this.prismaService.product.count({where: filters})
    return {count, products}
  }

  async getProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {id: id},
      select: returnProductObject,
    })
    if (!product) throw new NotFoundException("Product not found!")
    return product
  }

  async updateProduct(id: number, productDto: UpdateProductDto) {
    try {
      const {title, price, description, image_url, available_amount} = productDto
      const product = await this.getProduct(id)
      return await this.prismaService.product.update({
        where: {id: id},
        data: {
          title: title ? title : product.title,
          price: price ? price : product.price,
          description: description ? description : product.description,
          image_url: image_url ? image_url : product.image_url,
          available_amount: available_amount ? available_amount : product.available_amount
        }
      })
    } catch (error) {
      if (error.code === "P2025") {
        throw new BadRequestException(`${error.meta.cause}`)
      }
      throw new InternalServerErrorException(`Something went wrong!`)
    }
  }

  async deleteProduct(id: number) {
    await this.getProduct(id)
    return await this.prismaService.product.delete({where: {id}})
  }


  private createFilter(dto: FiltersProductsDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = []
    if (dto.search) filters.push(this.getSearchFilter(dto.search))
    if (dto.minPrice || dto.maxPrice) {
      filters.push(this.getPriceFilter(this.convertToNumber(dto.minPrice), this.convertToNumber(dto.maxPrice)))
    }
    return filters.length ? {AND: filters} : {}
  }

  private getSortOption(sort: EnumProductsSort): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductsSort.LOW_PRICE:
        return [{price: "asc"}]
      case EnumProductsSort.HIGH_PRICE:
        return [{price: "desc"}]
      case EnumProductsSort.OLDEST:
        return [{createdAt: "asc"}]
      default:
        return [{createdAt: "desc"}]
    }
  }

  private getSearchFilter(search: string): Prisma.ProductWhereInput {
    return {
      OR: [
        {title: {contains: search, mode: "insensitive"}},
        {description: {contains: search, mode: "insensitive"}}
      ]
    }
  }

  private getPriceFilter(minPrice?: number, maxPrice?: number): Prisma.ProductWhereInput {
    let priceFilter: Prisma.IntFilter | undefined = undefined
    if (minPrice) {
      priceFilter = {
        ...priceFilter, gte: minPrice
      }
    }
    if (maxPrice) {
      priceFilter = {
        ...priceFilter, lte: maxPrice
      }
    }
    return {price: priceFilter}
  }

  private convertToNumber(input: string): number | undefined {
    const number = +input
    return isNaN(number) ? undefined : number
  }
}
