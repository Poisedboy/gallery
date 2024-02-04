import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";

interface ISearch {
  get: (_: string) => string;
}

interface INextUrl {
  searchParams: ISearch;
}
interface IReq {
  nextUrl: INextUrl;
}

export async function GET(req: IReq) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const product = await db.product.findUnique({ where: { id } });
    return NextResponse.json({ data: product });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
