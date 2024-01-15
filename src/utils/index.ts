import { User } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { GraphQLError } from "graphql";

export const checkUserLogin = (context: Partial<User>) => {
  if (!context.id) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: HttpStatusCode.Unauthorized },
      },
    });
  }
};
