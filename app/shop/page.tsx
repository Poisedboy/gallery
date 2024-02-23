"use client";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types/Common.type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product-list");
      const data = await res.json();

      if (data.message) {
        setError(data.message);
        return toast.error(data.message);
      }
      setProducts(data.data);
    };
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="mt-[200px] flex justify-center items-center">
        <p className="text-[20px] sm:text-[27px] xl:text-[32px]">
          Here is no data yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 my-[50px] mx-10">
        {error ? (
          <p className="w-full text-center">No Data</p>
        ) : (
          products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ShopPage;
