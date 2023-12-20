import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateUserDto {
  @ApiProperty({
    description: "Update user's password",
    example: "Password007",
  })
  @IsOptional()
  @IsString()
  password?: string

  @ApiProperty({
    description: "Update user's first name",
    example: "Andrew",
  })
  @IsOptional()
  @IsString()
  first_name?: string

  @ApiProperty({
    description: "Update user's last name",
    example: "Smith",
  })
  @IsOptional()
  @IsString()
  last_name?: string

  @ApiProperty({
    description: "Update user's phone",
    example: "375293331177",
  })
  @IsOptional()
  @IsString()
  phone?: string
}