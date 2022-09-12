import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { UsersService } from './users.service';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

@Module({
  providers: [PrismaService, UsersService],
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      cors: false,
      autoSchemaFile: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  exports: [PrismaService],
})
export class AppModule { }
