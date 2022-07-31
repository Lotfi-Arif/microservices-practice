import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { FindManyPostArgs } from '../libs/common/src/generated/index/post/find-many-post.args';
import { FindUniquePostArgs } from '../libs/common/src/generated/index/post/find-unique-post.args';
import { Post } from '../libs/common/src/generated/index/post/post.model';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostsResolver {
    constructor(private postsService: PostsService) { }

    @Query(() => [Post])
    async findAllPosts(@Args() postFindManyArgs: FindManyPostArgs, @Info() info) {
        try {
            const posts = new PrismaSelect(info).value;
            return this.postsService.findAll({ ...postFindManyArgs, ...posts });
        } catch (error) {
            console.error(error);
        }
    }

    @Query(() => Post)
    async findOnePost(@Args() postFindUnique: FindUniquePostArgs, @Info() info) {
        try {
            const post = new PrismaSelect(info).value;
            return this.postsService.findOne({ ...postFindUnique, ...post });
        } catch (error) {
            console.error(error);
        }
    }
}
