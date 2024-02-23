import { supabase } from "@/lib/supabase";
import { db } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data1 = await req.formData();

    const file: File | null = data1.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { massage: "There is no image. Please upload!" },
        { status: 404 }
      );
    }
    const stringWithUnderscores = file?.name.replace(/ /g, "-");

    const uniqueId = Math.random().toString(36).substring(2, 8);

    const uniqueFileName = `public/${stringWithUnderscores}-${uniqueId}`;
    const { data, error } = await supabase.storage
      .from("product")
      .upload(uniqueFileName, file as File);

    if (error) {
      return NextResponse.json(
        { message: "Error during upload image" },
        { status: 400 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product").getPublicUrl(uniqueFileName);

    return NextResponse.json(
      { message: "Image uploaded successfully", publicUrl },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
