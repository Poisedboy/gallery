import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const products = await db.product.findMany();
		const responseInit = {
			headers: {
				"Cache-Control": "s-maxage=1, stale-while-revalidate",
			},
		};
		return NextResponse.json({ data: products }, responseInit);
	} catch (e) {
		return NextResponse.json(
			{ message: "Something went wrong!" },
			{ status: 500 }
		);
	}
}
