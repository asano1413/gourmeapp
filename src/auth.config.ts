import { DefaultSession, NextAuthConfig } from "next-auth";
import { prisma } from "./lib/db";
import { type User as PrismaUser } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

declare module "next-auth" {
     interface Session extends DefaultSession {
          user: User;
     }

     interface User extends Omit<PrismaUser, "password"> {}
}

import { type JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
     interface JWT {
          id: string;
     }
}

export const authConfig = {
     // pages: {
     //      // signIn: "/login"
     // },

     session: {
          strategy: "jwt",
     },

     callbacks: {
          jwt({ token, user }) {
               if (user && user.id) {
                    token.id = user.id;
               }
               return token;
          },
          async session({ session, token }) {
               if (token?.id) {
                    try {
                         const user = await prisma.user.findUnique({
                              where: {
                                   id: Number(token.id),
                              },
                         });
     
                         if (user?.id) {
                              session.user = user as any;
                         }
                    } catch (error) {}
               }

               return session;
          },

          signIn({ user }) {
               if (!user) {
                    // throw new Error("No user found");
                    return false;
               }
               return true;
          }
     },

     providers: [
          CredentialsProvider({
               id: "credentials",
               name: "Credentials",
               credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
               },
               async authorize(credentials) {
                    if (
                         !credentials
                         || typeof credentials?.email !== "string"
                         || typeof credentials?.password !== "string"
                    ) return null;

                    const user = await prisma.user.findUnique({
                         where: {
                              email: credentials.email,
                         },
                    });
                    if (!user) {
                         return null;
                    }

                    if (await bcryptjs.compare(String(credentials.password), user.password)) {
                         const { password: _p, ...userWithoutPassword } = user;

                         return {
                              ...userWithoutPassword,
                              id: user.id.toString(),
                         };
                    }

                    return null;
               }
          }),

     ]

} satisfies NextAuthConfig;