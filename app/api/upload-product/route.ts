import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required").max(250),
  hardcover: z.string().min(1, "Hardcover is required"),
  image: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, price, description, hardcover, image } =
      productSchema.parse(body);

    await db.product.create({
      data: {
        name: title,
        price,
        description,
        hardcover,
        image,
      },
    });
    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
