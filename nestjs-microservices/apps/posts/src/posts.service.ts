import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '../prisma/generated/prisma-client-js';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaClient) { }

  async findAll(postFindManyArgs: Prisma.PostFindManyArgs) {
    return this.prisma.post.findMany(postFindManyArgs);
  }
  async findOne(postFindOneArgs: Prisma.PostFindUniqueArgs) {
    return this.prisma.post.findUnique(postFindOneArgs);
  }

  getMe(postId: string, select?: any) {
    return this.prisma.post.findUnique({ where: { id: postId }, ...select });
  }
  async updatePost(postUpdateArgs: Prisma.PostUpdateArgs) {
    return this.prisma.post.update(postUpdateArgs);
  }
  async deletePost(postDeleteArgs: Prisma.PostDeleteArgs) {
    return this.prisma.post.delete(postDeleteArgs);
  }
}
