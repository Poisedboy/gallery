import Footer from "@/components/Footer";
import { Inter, Roboto, Rochester } from "next/font/google";
import Image from "next/image";

const inter = Roboto({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <main
        className={`flex flex-col items-center justify-between ${inter.className}`}
      >
        <div>
          <Image
            src="/nature.jpg"
            alt="orange envirment"
            width={999}
            height={999}
            className="w-screen h-[100vh] object-cover"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
