"use client";
import { IProduct } from "@/types/Common.type";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none w-[150px] sm:w-[250px]"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover w-[150px] sm:w-[250px] h-[250px] sm:h-[350px]"
        height={350}
        src={product.image ? product.image : "/vertical-pic.jpg"}
        width={250}
      />
      <CardFooter className="justify-between bg-black/60 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white">
          {product.price ? `${product.price} грн` : "Available soon."}
        </p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          <Link href={`/shop/${product.id}`}>
            {product.name ? product.name : "Art"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
