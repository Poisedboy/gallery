"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "./ui/card";
import {
  Image,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IProduct } from "@/types/Common.type";
import Loader from "./Loader";
import { Button } from "./ui/button";
import TrashIcon from "./icons/Trash";
import { Settings } from "lucide-react";
import Link from "next/link";

interface IDelete {
  id: string;
  name: string | undefined;
}

const EditProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<IDelete>({
    id: "",
    name: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch("/api/product-list");
      const data = await res.json();

      if (data.message) {
        setError(data.message);
        setLoading(false);
        return toast.error(data.message);
      }
      setLoading(false);
      setProducts(data.data);
    };
    fetchProducts();
  }, []);

  const submitDelete = ({ id, name }: IDelete) => {
    setOpen(true);
    setDeletingProduct({ id, name });
  };
  const onClose = () => setOpen(false);

  const handleDelete = async () => {
    setDeletingLoader(true);
    try {
      const response = await fetch(
        `api/delete-product?id=${deletingProduct.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== deletingProduct.id)
        );
      } else if (!response.ok) {
        toast.error("Error during deleting product!");
      }
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setDeletingLoader(false);
      setOpen(false);
    }
  };

  return isLoading ? (
    <div className="flex justify-center m-5">
      <Loader isLoading={isLoading} width={50} height={50} />
    </div>
  ) : error ? (
    <p className="w-full text-center">No Data</p>
  ) : (
    <>
      {products.map((product: IProduct) => (
        <Card className="flex flex-wrap mb-5 p-2 sm:p-3 justify-between items-center">
          <div className="flex flex-wrap gap-5 items-center">
            <Image
              alt="deleting product"
              className="object-cover rounded-md w-[25px] sm:w-[50px] h-[25px] sm:h-[50px]"
              src={product.image ? product.image : "/vertical-pic.jpg"}
            />
            <p className="truncate max-w-[6rem] w-[75px]">{product.name}</p>
            <p>{product.price}</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5">
            <Button variant="outline">
              <Link href={`/settings/${product.id}`}>
                <Settings />
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                submitDelete({ id: product.id, name: product.name })
              }
            >
              <TrashIcon />
            </Button>
          </div>
        </Card>
      ))}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Are you sure to delete this product "{deletingProduct.name}"?
              </ModalHeader>
              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProduct;
