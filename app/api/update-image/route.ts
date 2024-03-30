import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const data1 = await req.formData();

    const file = data1.get("file") as unknown as File;
    const deleteImageName = data1.get("deleteImageName") as string;
    if (!file) {
      return NextResponse.json(
        { massage: "There is no image. Please upload!" },
        { status: 404 }
      );
    }

    if (deleteImageName) {
      await supabase.storage
        .from("product")
        .remove([`item/${deleteImageName}`]);
    }

    const stringWithUnderscores = file?.name.replace(/ /g, "-");

    const uniqueId = Math.random().toString(36).substring(2, 8);

    const uniqueFileName = `${uniqueId}-${stringWithUnderscores}`;
    const { data, error } = await supabase.storage
      .from("product")
      .upload(`item/${uniqueFileName}`, file as File);

    if (error) {
      return NextResponse.json(
        { message: "Error during upload image" },
        { status: 400 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product").getPublicUrl(data.path);

    return NextResponse.json(
      { message: "Image updated!", publicUrl },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
