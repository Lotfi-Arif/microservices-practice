import { Args, Info, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { FindManyUserArgs } from '../libs/common/src/generated/index/user/find-many-user.args';
import { FindUniqueUserArgs } from '../libs/common/src/generated/index/user/find-unique-user.args';
import { User } from '../libs/common/src/generated/index/user/user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
    constructor(private usersService: UsersService) { }

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
}
