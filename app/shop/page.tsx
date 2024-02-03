"use client";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

const ShopPage = ({ price, name }: any) => {
  const products = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center my-[50px] mx-10">
      {products.map((product, index) => (
        <Card
          key={product}
          isFooterBlurred
          radius="lg"
          className="border-none w-[250px]"
        >
          <Image
            alt="Woman listing to music"
            className="object-cover w-[250px] h-[350px]"
            height={350}
            src={index === 1 ? "/vertical-pic.jpg" : "/nature.jpg"}
            width={250}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">
              {price ? price : "Available soon."}
            </p>
            <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              <Link href={`/shop/${product}`}>{name ? name : "Art"}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ShopPage;
