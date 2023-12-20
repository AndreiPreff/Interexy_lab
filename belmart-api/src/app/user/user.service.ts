import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "../../domain/update-user.dto";
import { PrismaService } from "../../libs/prisma.service";
import { hash } from "argon2";
import { returnUserObject } from "./return-user.object";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: number, selectObject: Prisma.UserSelect = {}) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: id },
        select: {
          ...returnUserObject,
          ...selectObject,
        },
      });
      if (!user) {
        throw new NotFoundException("User not found by ID!");
      }
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException("Invalid request to the database.");
      }
      throw error;
    }
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto) {
    await this.getUser(id);
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          first_name: updateUserDto.first_name,
          last_name: updateUserDto.last_name,
          phone: updateUserDto.phone,
        },
      });
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException("Invalid request to the database.");
      }
      throw error;
    }
  }

  async findUserByEmail(email: string, selectObject: Prisma.UserSelect = {}) {
    return await this.prismaService.user.findUnique({
      where: { email },
      select: {
        ...returnUserObject,
        ...selectObject,
      },
    });
  }
}
