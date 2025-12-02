// If your Prisma file is located elsewhere, you can change the path

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    // async sendResetPassword(data, request) {
    //   // Send an email to the user with a link to reset their password
    // },
  },
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
});
