"use client";
import Footer from "@/components/Footer";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

const ProductPage = ({ params }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (quantity <= 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [quantity]);
  return (
    <>
      <div className="flex flex-wrap justify-center  px-5 sm:px-10 py-[50px] gap-5">
        <Image src="/nature.jpg" width={800} radius="none" />
        <div className="w-full sm:w-[360px] flex flex-col gap-2">
          <h2>Product - {params.id}</h2>
          <p>price</p>
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

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>Hardcover - Size</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
