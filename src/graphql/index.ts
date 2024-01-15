import { ApolloServer } from "@apollo/server";
import { User } from "./User";

export const createGraphQLSever = async () => {
  const graphQLSever = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}
        type Query{
          ${User.queries}    
        }
        type Mutation{
          ${User.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await graphQLSever.start();

  return graphQLSever;
};
