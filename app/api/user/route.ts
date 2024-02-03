import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt-ts";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 chracters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, email } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    const hashPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        passwrod: hashPassword,
        role: "USER",
      },
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
