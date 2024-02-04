"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/Common.type";

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("api/product-list");
      const data = await res.json();
      setProducts(data.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 my-[50px] mx-10">
      {products.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShopPage;
