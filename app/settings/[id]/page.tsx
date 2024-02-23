"use client";
import CreateProduct from "@/components/CreateProduct";
import { useEffect, useState } from "react";

const EditProduct = ({ params }: any) => {
  const [product, setProduct] = useState<any>({});
  const [isDownloding, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setDownloading(true);
      const res = await fetch(`/api/product?id=${params.id}`);
      const data = await res.json();

      setProduct(data.data);
      setDownloading(false);
    };
    fetchProduct();
    return () => {
      setDownloading(false);
    };
  }, []);
  return (
    <CreateProduct type="edit" isDownloading={isDownloding} product={product} />
  );
};

export default EditProduct;
