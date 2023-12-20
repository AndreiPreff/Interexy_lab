import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../../libs/prisma.service";
import { OrderDto } from "../../domain/order.dto";
import { returnProductObject } from "../product/return-product.object";
import { returnUserPartialObject } from "../user/return-user.object";
import { UpdateOrderStatusDto } from "../../domain/update-order-status.dto";
import { EnumOrderStatus } from "@prisma/client";

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService
  ) {}

  async placeOrder(orderDto: OrderDto, userId: number) {
    const total = orderDto.orderItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    // Проверяем доступное количество продуктов перед созданием заказа
    for (const item of orderDto.orderItems) {
      const product = await this.prismaService.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.available_amount < item.quantity) {
        throw new BadRequestException(`Product with id ${item.productId} is out of stock.`);
      }
    }

    // Создаем заказ с дефолтным статусом
    const createdOrder = await this.prismaService.order.create({
      data: {
        status: orderDto.status,
        totalAmount: total,
        orderItems: {
          create: orderDto.orderItems.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            product: { connect: { id: item.productId } },
          })),
        },
        user: { connect: { id: userId } },
      },
      include: {
        orderItems: true,
      },
    });

    return createdOrder;
  }

  async getAllOrders() {
    return this.prismaService.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
  }

  async getOrderDetail(orderId: number) {
    const order = await this.prismaService.order.findUnique({
      where: {id: orderId},
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
    if (!order) {
      throw new NotFoundException("Order not found!")
    }
    return order
  }

  async getAllUserOrders(userId: number) {
    return this.prismaService.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
  }

  async getUserOrderDetail(userId: number, orderId: number) {
    const order = await this.prismaService.order.findUnique({
      where: {id: orderId},
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
    if (!order || order.userId !== userId) {
      throw new NotFoundException("Order not found!")
    }
    return order
  }

  async updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.getOrderDetail(orderId);

    // Проверяем, что статус изменяется с IN_CART на COMPLETED
    if (order.status === EnumOrderStatus.IN_CART && updateOrderStatusDto.status === EnumOrderStatus.COMPLETED) {
      // Обновляем доступное количество продуктов после создания заказа
      for (const item of order.orderItems) {
        await this.prismaService.product.update({
          where: { id: item.product.id },
          data: {
            available_amount: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    // Обновляем статус заказа
    return await this.prismaService.order.update({
      where: { id: orderId },
      data: { status: updateOrderStatusDto.status },
    });
  }

  async cancelOrder(userId: number, orderId: number) {
    const order = await this.getUserOrderDetail(userId, orderId)
    if (order.status === EnumOrderStatus.IN_CART) {
      return await this.prismaService.order.update({
        where: {id: orderId},
        data: {status: EnumOrderStatus.CANCELED}
      })
    }
    throw new BadRequestException("Cancellation of the order is not possible as it has already been completed or canceled.")
  }

  async deleteOrder(orderId: number) {
    return await this.prismaService.order.delete({where: {id: orderId}})
  }
}
