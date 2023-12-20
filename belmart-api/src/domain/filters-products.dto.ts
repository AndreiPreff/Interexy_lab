import {ArrayMinSize, IsEnum, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";
import {PaginationDto} from "../domain/pagination.dto";
import {ApiProperty} from "@nestjs/swagger";

export enum EnumProductsSort {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest",
}

export class FiltersProductsDto extends PaginationDto{

  @ApiProperty({
    description: "Sort products by",
    example: EnumProductsSort.HIGH_PRICE,
  })
  @IsOptional()
  @IsEnum(EnumProductsSort)
  sort?: EnumProductsSort

  @ApiProperty({
    description: "Search condition",
    example: "tea",
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({
    description: "Lowest price",
    example: "50",
  })
  @IsOptional()
  @IsString()
  minPrice?: string

  @ApiProperty({
    description: "Highest price",
    example: "9999",
  })
  @IsOptional()
  @IsString()
  maxPrice?: string
}