import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const publicInfoSchema = z.object({
  address: z.string().min(1, "Address is required").max(100),
  email: z.string().min(1, "Email is required"),
  instagramLink: z.string().min(1, "Link is required").max(250),
  facebookLink: z.string().min(1, "Link is required").max(250),
  logo: z.string(),
  banner: z.string(),
  id: z.string(),
  numberPhone: z.string().min(1, "Numbers is required").max(13),
});

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      address,
      email,
      instagramLink,
      facebookLink,
      logo,
      banner,
      id,
      numberPhone,
    } = publicInfoSchema.parse(body);
    console.log("UPDATE PUBLIC INFO >>>>", body);
    await db.publicInfo.update({
      where: {
        id,
      },
      data: {
        address,
        email,
        instagramLink,
        facebookLink,
        logo,
        banner,
        numberPhone,
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log("PUBLIC  >>>>", e);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
