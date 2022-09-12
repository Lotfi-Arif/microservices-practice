import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(userFindManyArgs: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(userFindManyArgs);
  }
  async findOne(userFindOneArgs: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(userFindOneArgs);
  }
  async create(userCreateArgs: Prisma.UserCreateArgs) {
    return this.prisma.user.create(userCreateArgs);
  }
  getMe(userId: string, select?: any) {
    return this.prisma.user.findUnique({ where: { id: userId }, ...select });
  }
  async updateUser(userUpdateArgs: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(userUpdateArgs);
  }
  async deleteUser(userDeleteArgs: Prisma.UserDeleteArgs) {
    return this.prisma.user.delete(userDeleteArgs);
  }
}