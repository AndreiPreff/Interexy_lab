import {Prisma} from "@prisma/client";

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  title: true,
  price: true,
  description: true,
  image_url: true,
  available_amount: true,
  createdAt: true
}

