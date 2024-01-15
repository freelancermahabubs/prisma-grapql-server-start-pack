import { getUserToken } from "./../../Services/User";
import { UserService, createUserPayload } from "../../Services/User";

const queries = {
  GetUser: async (_: any, payload: any, context: any) => {
    return await UserService.getCurrentUser(context.id);
  },
};
const mutations = {
  RegisterUser: async (_: any, payload: createUserPayload) => {
    await UserService.createUser(payload);
    return { success: true, message: "User Register Successful", error: null };
  },
  LoginUser: async (_: any, payload: getUserToken) => {
    return await UserService.getUserToken(payload);
  },
};

export const resolvers = { queries, mutations };
