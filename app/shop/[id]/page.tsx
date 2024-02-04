"use client";
import Footer from "@/components/Footer";
import { IProduct } from "@/types/Common.type";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

const ProductPage = ({ params }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [product, setProduct] = useState<IProduct | null>();

  useEffect(() => {
    if (quantity <= 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [quantity]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product?id=${params.id}`);
      const data = await res.json();
      setProduct(data.data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center  px-5 sm:px-10 py-[50px] gap-5">
        <Image
          src={product?.image ? product.image : "/nature.jpg"}
          width={800}
          radius="none"
        />
        <div className="w-full sm:w-[360px] flex flex-col gap-2">
          <h2>{product?.name}</h2>
          <p>{product?.price}</p>
          <p>Quantity</p>
          <Card radius="none" className="w-[90px]">
            <CardBody className="flex flex-row justify-center items-center gap-3">
              <button
                disabled={disabled}
                onClick={() => setQuantity((prevState) => prevState - 1)}
              >
                -
              </button>
              <p className="w-[20px] text-center">{quantity}</p>
              <button onClick={() => setQuantity((prevState) => prevState + 1)}>
                +
              </button>
            </CardBody>
          </Card>
          <Button variant="bordered" radius="none">
            Add to card
          </Button>

          <p>{product?.description}</p>
          <p>Hardcover - {product?.hardcover}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
