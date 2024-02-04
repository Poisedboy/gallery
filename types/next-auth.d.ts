import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    status: string;
    user: IUser;
  }
}
