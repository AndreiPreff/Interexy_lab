import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {

  @ApiProperty({
    description: "Page number",
    example: "5",
  })
  @IsOptional()
  @IsString()
  page?: string

  @ApiProperty({
    description: "Products per page",
    example: "20",
  })
  @IsOptional()
  @IsString()
  perPage?: string
}