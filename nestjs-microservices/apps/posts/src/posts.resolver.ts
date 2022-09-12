import { EventEmitter2 } from '@nestjs/event-emitter';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { User } from 'apps/users/libs/common/src/generated/index/user/user.model';
import { CreateOnePostArgs } from '../libs/common/src/generated/index/post/create-one-post.args';
import { FindManyPostArgs } from '../libs/common/src/generated/index/post/find-many-post.args';
import { FindUniquePostArgs } from '../libs/common/src/generated/index/post/find-unique-post.args';
import { Post } from '../libs/common/src/generated/index/post/post.model';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostsResolver {
    constructor(private postsService: PostsService, private eventEmitter: EventEmitter2) { }

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

    @Mutation(() => User)
    async createUser(@Args('createPostArgs') createPostArgs: CreateOnePostArgs, @Info() info) {
        try {
            const post = new PrismaSelect(info).value;
            const newPost = this.postsService.create({
                ...createPostArgs,
                ...post
            });
            this.eventEmitter.emit('post.created', newPost);
            return newPost;
        } catch (error) {
            throw new Error(error);
        }
    }
}
