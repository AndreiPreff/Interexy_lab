import { EnumUserRoles, User} from '@prisma/client';
import {ApiProperty} from '@nestjs/swagger';

export class UserEntity implements User {

  @ApiProperty({example: 7})
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  role: EnumUserRoles

  @ApiProperty()
  first_name: string

  @ApiProperty()
  last_name: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}