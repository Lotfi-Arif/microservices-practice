import { Args, Info, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { CreateOneUserArgs } from '../libs/common/src/generated/index/user/create-one-user.args';
import { FindManyUserArgs } from '../libs/common/src/generated/index/user/find-many-user.args';
import { FindUniqueUserArgs } from '../libs/common/src/generated/index/user/find-unique-user.args';
import { User } from '../libs/common/src/generated/index/user/user.model';
import { UsersService } from './users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Resolver((of) => User)
export class UsersResolver {
    constructor(private usersService: UsersService, private eventEmitter: EventEmitter2,) { }

    @Query(() => [User])
    async findAllUsers(@Args() userFindManyArgs: FindManyUserArgs, @Info() info) {
        try {
            const users = new PrismaSelect(info).value;
            return this.usersService.findAll({ ...userFindManyArgs, ...users });
        } catch (error) {
            console.error(error);
        }
    }

    @Query(() => User)
    async findOneUser(@Args() userFindUnique: FindUniqueUserArgs, @Info() info) {
        try {
            const user = new PrismaSelect(info).value;
            return this.usersService.findOne({ ...userFindUnique, ...user });
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation(() => User)
    async createUser(@Args('createUserArgs') createUserArgs: CreateOneUserArgs, @Info() info) {
        try {
            const user = new PrismaSelect(info).value;
            const newUser = this.usersService.create({
                ...createUserArgs,
                ...user
            });
            this.eventEmitter.emit('user.created', newUser);
            return newUser
        } catch (error) {
            throw new Error(error);
        }
    }
}