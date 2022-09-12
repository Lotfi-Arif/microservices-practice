import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: false,
      },
      gateway: {
        serviceHealthCheck: true,
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {name: 'users', url: 'http://localhost:3001/graphql'},
          ]
        })
      }
    }),
  ],
})
export class GatewayModule {}
