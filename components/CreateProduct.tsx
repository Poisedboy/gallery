import { Input } from "@nextui-org/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ChangeEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";

const FormProductSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required").max(250),
  hardcover: z.string().min(1, "Hardcover is required"),
});

const CreateProduct = () => {
  const form = useForm<z.infer<typeof FormProductSchema>>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      hardcover: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [image, setImage] = useState<File | undefined | null>(null);

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
    const file: File | undefined = event.target.files?.[0];
    setImage(file);
    toast.success("Image upload");
  };

  const onSubmit = async (values: z.infer<typeof FormProductSchema>) => {
    const { data, error } = await supabase.storage
      .from("product")
      .upload("public/" + image?.name, image as File);
    if (error) {
      return toast.error(error.message);
    }

    const {
      data: { publicUrl },
    } = await supabase.storage
      .from("product")
      .getPublicUrl("public/" + image?.name);

    if (publicUrl) {
      const response = await fetch("api/upload-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          price: values.price,
          description: values.description,
          hardcover: values.hardcover,
          image: publicUrl,
        }),
      });
      if (response.ok) {
        form.reset({
          title: "",
          price: "",
          description: "",
          hardcover: "",
        });
        setImage(null);
        setPreviewImage("");
        toast.success("Product created successfully!");
      } else {
        return toast.error("Registration failed!");
      }
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-center my-5 gap-5 sm:10 w-full"
      >
        <div className="border-[2px] border-black dark:border-white border-dashed rounded-2xl">
          <label className=" bg-slate-500 cursor-pointer">
            <img
              className="w-[300px] h-[300px] object-no-repeat rounded-2xl"
              alt="preview image"
              src={previewImage}
            />
            <input
              onChange={onImageChange}
              className="hidden w-full h-full"
              type="file"
            />
          </label>
        </div>
        <div className="flex flex-col gap-[5px] w-full sm:w-[450px]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Title" variant="underlined" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Price" variant="underlined" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hardcover"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Hardcover" variant="underlined" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <label className="text-[#6b7280]">Description</label>
                <textarea
                  className="w-full p-2 focus:border-black outline-none resize-none border-[#d4d4d8] dark:border-white dark:bg-black border-solid border-[2px] h-[100px] scrollbar-hide rounded-lg"
                  {...field}
                />
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            className="w-full rounded-none"
            type="submit"
          >
            Create product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProduct;