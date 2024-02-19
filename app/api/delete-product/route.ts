import { supabase } from "@/lib/supabase";
import { db } from "@/prisma/prisma";
import { getFileNameFromUrl } from "@/utils/getName";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || undefined;
    const img = searchParams.get("img") || undefined;
    const imageName = getFileNameFromUrl(img);

    if (img) {
      const { data, error } = await supabase.storage
        .from("product")
        .remove([`public/${imageName}`]);
    }

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
