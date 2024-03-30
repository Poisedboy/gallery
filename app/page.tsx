import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google";

const inter = Roboto({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default async function Home() {
  return (
    <>
      <main
        className={`flex flex-col items-center justify-between ${inter.className}`}
      >
        <div>
          <Banner />
        </div>
      </main>
      <Footer />
    </>
  );
}
