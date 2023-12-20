import { Product } from '@prisma/client'
import {ApiProperty} from "@nestjs/swagger";

export class ProductEntity implements Product {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty()
    description: string

    @ApiProperty()
    price: number

    @ApiProperty()
    image_url: string[]

    @ApiProperty()
    available_amount: number;

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date
}