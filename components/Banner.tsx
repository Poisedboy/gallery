import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";

const Banner = async () => {
  const res = await fetch(`${apiUrl}api/public-info?type=banner`, {
    method: "GET",
    cache: "no-cache",
  });
  const { data: banner } = await res.json();
  return (
    <Image
      // loader={imageLoader}
      src={banner}
      alt="orange envirment"
      width={999}
      height={999}
      className="w-screen h-[100vh] object-cover"
    />
  );
};

export default Banner;
