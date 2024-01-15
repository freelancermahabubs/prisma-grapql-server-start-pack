export const typeDefs = `
    type User{
        id: ID!
        name: String!
        email: String!
    }
    type CreateUserResponse{
        success: Boolean!
        message: String!
        error: String
    }
    type UserLoginResponse{
        success: Boolean!
        message: String!
        token: String!
    }  
`;
