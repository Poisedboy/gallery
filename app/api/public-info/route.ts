import { db } from "@/prisma/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextApiRequest) {
  const url = new URL(req.url as string);
  const type = url.searchParams.get("type");

  try {
    const publicInfo = await db.publicInfo.findMany();
    switch (type) {
      case "banner":
        return NextResponse.json({ data: publicInfo[0].banner });
      case "logo":
        return NextResponse.json({ data: publicInfo[0].logo });
      case "all":
        return NextResponse.json({ data: publicInfo[0] });
    }
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
