import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/prisma/prisma";
import { compare } from "bcrypt-ts";

interface IProps {
  email: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) return null;
        const passwordMatch = await compare(
          credentials?.password,
          existingUser?.password
        );
        if (!passwordMatch) return null;
        return {
          id: `${existingUser?.id}`,
          username: existingUser?.username,
          email: existingUser?.email,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
