import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthUserDto {
  @ApiProperty({
    description: "User's email address",
    example: 'preff@gmail.com'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "User's password. Minimum 8 characters",
    example: 'Password007'
  })
  @MinLength(8, {
    message: 'Password is too short. It must be at least 8 characters long'
  })
  @IsString()
  password: string
}
