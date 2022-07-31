import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreatepostsInput } from './user-createposts.input';

@InputType()
export class UserCreateManyInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => UserCreatepostsInput, {nullable:true})
    posts?: UserCreatepostsInput;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
