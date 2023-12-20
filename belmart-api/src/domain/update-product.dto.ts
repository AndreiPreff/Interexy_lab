import {ArrayMinSize, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateProductDto {

  @ApiProperty({
    description: "Product title",
    example: "Laptop",
  })
  @IsOptional()
  @IsString()
  title: string

  @ApiProperty({
    description: "Product price",
    example: 975,
  })
  @IsOptional()
  @IsNumber()
  price: number

  @ApiProperty({
    description: "Product description",
    example: "Ultra thin business laptop",
  })
  @IsOptional()
  @IsString()
  description: string

  @ApiModelPropertyOptional({ type: ["string"], format: "binary" })
  @IsOptional()
  @IsString({each: true})
  @ArrayMinSize(1)
  image_url: string[]  

  @ApiProperty({
    description: "Product quantity in stock",
    example: 21,
  })
  @IsNumber()
  available_amount: number
}