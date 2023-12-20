import {Prisma} from "@prisma/client";

export const returnUserPartialObject: Prisma.UserSelect = {
  id: true,
  email: true,
  role: true,
  first_name: true,
  last_name: true,
  phone: true
}

export const returnUserObject: Prisma.UserSelect = {
  ...returnUserPartialObject,
  password: true
}