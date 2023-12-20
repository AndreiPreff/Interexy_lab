import { PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'
import { faker } from '@faker-js/faker'

dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
  const products: Product[] = []

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName()

    const product = await prisma.product.create({
      data: {
        title: productName,
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(10, 999, 0),
        image_url: Array.from({ length: 4 }).map(() => faker.image.imageUrl()),
        available_amount: Math.floor(Math.random() * (100 - 5 + 1) + 5) // Генерация от 5 до 100
      }
    })
    products.push(product)
  }

  console.log(`Created ${products.length} products!`)
}

async function main() {
  console.log('Start seeding...')
  await createProducts(33)
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
