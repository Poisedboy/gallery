import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || undefined;
    const product = await db.product.findUnique({ where: { id } });
    return NextResponse.json({ data: product });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
