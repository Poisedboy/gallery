"use client";
import CreateProduct from "@/components/CreateProduct";
import { useEffect, useState } from "react";

const EditProduct = ({ params }: any) => {
  const [product, setProduct] = useState<any>({});
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product?id=${params.id}`);
      const data = await res.json();

      setProduct(data.data);
    };
    fetchProduct();
  }, []);
  return <CreateProduct type="edit" product={product} />;
};

export default EditProduct;
