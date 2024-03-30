import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@nextui-org/react";
import { Button } from "./ui/button";
import { getFileNameFromUrl } from "@/utils/getName";

const PublicInfoSchema = z.object({
  address: z.string().min(1, "Address is required").max(100),
  email: z.string().min(1, "Email is required"),
  instagramLink: z.string().min(1, "Link is required").max(250),
  facebookLink: z.string().min(1, "Link is required").max(250),
  id: z.string(),
  numberPhone: z.string().min(1, "Numbers is required").max(13),
});

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";

const PublicInfo = () => {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof PublicInfoSchema>>({
    resolver: zodResolver(PublicInfoSchema),
    defaultValues: {
      address: "",
      email: "",
      instagramLink: "",
      facebookLink: "",
      numberPhone: "",
      id: "",
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${apiUrl}api/public-info?type=all`, {
        method: "GET",
        cache: "no-cache",
      });
      const { data } = await res.json();

      if (data.message) {
        return toast.error(data.message);
      }
      form.setValue("address", data?.address);
      form.setValue("email", data?.email);
      form.setValue("instagramLink", data?.instagramLink);
      form.setValue("facebookLink", data?.facebookLink);
      form.setValue("id", data?.id);
      form.setValue("numberPhone", data?.numberPhone);

      setPreviewLogoImage(data?.logo);
      setPreviewBannerImage(data?.banner);
      setLogoImageDeleting(data?.logo);
      setBannerImageDeleting(data?.banner);
    };

    fetchProducts();
    return () => {
      form.setValue("address", "");
      form.setValue("email", "");
      form.setValue("instagramLink", "");
      form.setValue("facebookLink", "");
      form.setValue("numberPhone", "");
      setPreviewLogoImage("");
      setPreviewBannerImage("");
      setLogoImageDeleting("");
      setBannerImageDeleting("");
    };
  }, []);

  const [previewLogoImage, setPreviewLogoImage] = useState<string | undefined>(
    ""
  );
  const [previewBannerImage, setPreviewBannerImage] = useState<
    string | undefined
  >("");

  const [logoImage, setLogoImage] = useState<File | undefined | null>(null);
  const [bannerImage, setBannerImage] = useState<File | undefined | null>(null);
  const [isLogoLoading, setLogoLoading] = useState(false);
  const [isBannerLoading, setBannerLoading] = useState(false);

  const onLogoImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setPreviewLogoImage(URL.createObjectURL(event.target.files[0]));
      const file: File | undefined = event.target.files?.[0];
      setLogoImage(file);
    }
    toast.success("Image upload");
  };

  const onBannerImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setPreviewBannerImage(URL.createObjectURL(event.target.files[0]));
      const file: File | undefined = event.target.files?.[0];
      setBannerImage(file);
    }
    toast.success("Image upload");
  };

  const inputRefLogo = useRef<any>();
  const inputRefBanner = useRef<any>();

  const handleBrowseLogo = () => {
    inputRefLogo?.current?.click();
  };

  const handleBrowseBanner = () => {
    inputRefBanner?.current?.click();
  };

  const removeImageLogo = () => {
    if (previewLogoImage) {
      setLogoImage(null);
      toast.error("File deleted!");
      return setPreviewLogoImage("");
    }
  };

  const removeImageBanner = () => {
    if (previewBannerImage) {
      setBannerImage(null);
      toast.error("File deleted!");
      return setPreviewBannerImage("");
    }
  };

  const [logoPublicUrl, setLogoPublicUrl] = useState<string>("");
  const [bannerPublicUrl, setBannerPublicUrl] = useState<string>("");
  const [logoImageDeleting, setLogoImageDeleting] = useState<string>("");
  const [bannerImageDeleting, setBannerImageDeleting] = useState<string>("");

  const onSubmit = async (values: z.infer<typeof PublicInfoSchema>) => {
    try {
      setLoading(true);
      let logo, banner;
      if (logoImage) {
        const imageName = getFileNameFromUrl(logoImageDeleting);
        const formData = new FormData();
        formData.append("file", logoImage as File);
        formData.append("deleteImageName", imageName as string);

        setLogoLoading(true);
        const updatedImage = await fetch(`${apiUrl}api/update-image`, {
          method: "PUT",
          body: formData,
        });

        const { message, publicUrl } = await updatedImage.json();
        logo = publicUrl;
        toast.success(message);
        setLogoPublicUrl(publicUrl);
        setLogoLoading(false);
      } else {
        toast.error("Logo did not change!");
      }

      if (bannerImage) {
        const imageName = getFileNameFromUrl(bannerImageDeleting);
        const formData = new FormData();
        formData.append("file", bannerImage as File);
        formData.append("deleteImageName", imageName as string);

        setBannerLoading(true);
        const updatedImage = await fetch(`${apiUrl}api/update-image`, {
          method: "PUT",
          body: formData,
        });

        const { message, publicUrl } = await updatedImage.json();
        banner = publicUrl;
        toast.success(message);
        setBannerPublicUrl(publicUrl);
        setBannerLoading(false);
      } else {
        toast.error("Banner did not change!");
      }

      const response = await fetch(`${apiUrl}api/update-public-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          banner: banner || previewBannerImage,
          logo: logo || previewLogoImage,
        }),
      });
      console.log("wwwwww", response);
    } catch (e) {
      toast.error("Error during updating product!");
      setLogoLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-center my-5 gap-5 sm:10 w-full">
      <div className="flex gap-2">
        <div className="border-[2px] border-black dark:border-white w-[298px] h-[298px] border-dashed rounded-2xl">
          {isLogoLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader isLoading={isLogoLoading} width={250} height={250} />
            </div>
          ) : (
            <>
              {!previewLogoImage ? (
                <div
                  className="flex flex-col justify-center items-center w-[300px] h-[300px]"
                  onClick={handleBrowseLogo}
                >
                  <input
                    ref={inputRefLogo}
                    onChange={onLogoImageChange}
                    className="hidden w-[300px] h-[300px]"
                    type="file"
                  />
                  <p className="text-[20px]">Upload Logo Image Here</p>
                </div>
              ) : (
                <div className="relative">
                  <div
                    className="absolute top-[-10px] right-[-10px] flex justify-center items-center border-[1px] border-black dark:border-white bg-white dark:bg-black rounded-full"
                    onClick={removeImageLogo}
                  >
                    <Cross2Icon width={25} height={25} />
                  </div>
                  <img
                    className="w-[300px] h-[300px] object-contain rounded-2xl"
                    alt="preview image"
                    src={previewLogoImage}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="border-[2px] border-black dark:border-white w-[298px] h-[298px] border-dashed rounded-2xl">
          {isBannerLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader isLoading={isBannerLoading} width={250} height={250} />
            </div>
          ) : (
            <>
              {!previewBannerImage ? (
                <div
                  className="flex flex-col justify-center items-center w-[300px] h-[300px]"
                  onClick={handleBrowseBanner}
                >
                  <input
                    ref={inputRefBanner}
                    onChange={onBannerImageChange}
                    className="hidden w-[300px] h-[300px]"
                    type="file"
                  />
                  <p className="text-[20px]">Upload Banner Image Here</p>
                </div>
              ) : (
                <div className="relative">
                  <div
                    className="absolute top-[-10px] right-[-10px] flex justify-center items-center border-[1px] border-black dark:border-white bg-white dark:bg-black rounded-full"
                    onClick={removeImageBanner}
                  >
                    <Cross2Icon width={25} height={25} />
                  </div>
                  <img
                    className="w-[300px] h-[300px] object-contain rounded-2xl"
                    alt="preview image"
                    src={previewBannerImage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[5px] w-full sm:w-[450px]">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Address" variant="underlined" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Email" variant="underlined" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberPhone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Phone" variant="underlined" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Instagram Link"
                      variant="underlined"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebookLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Facebook Link"
                      variant="underlined"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              className="w-full rounded-none"
              type="submit"
              disabled={isLoading || !previewBannerImage || !previewLogoImage}
            >
              <div className="flex gap-1">
                <Loader isLoading={isLoading} width={24} height={24} />
                Update Info
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PublicInfo;
