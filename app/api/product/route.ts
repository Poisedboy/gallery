import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";

type NextRequest = {
  nextUrl: URL;
};

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    const product = await db.product.findUnique({ where: { id } });
    return NextResponse.json({ data: product });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
