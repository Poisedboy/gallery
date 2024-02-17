import { db } from "@/prisma/prisma";
import { hash } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { z } from "zod";

const PasswordSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 chracters"),
});

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { password, id } = PasswordSchema.parse(body);

    const hashPassword = await hash(password, 10);
    await db.user.update({
      where: { id },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully!" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
