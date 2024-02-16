import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { username, email } = userSchema.parse(body);
    await db.user.update({
      where: { email },
      data: {
        email,
        username,
      },
    });

    return NextResponse.json(
      { message: "User updated successfully!" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
