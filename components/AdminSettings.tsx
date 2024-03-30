"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import CreateProduct from "./CreateProduct";
import { ChangeUserData } from "./user/ChangeUserData";
import EditProduct from "./EditProduct";
import PublicInfo from "./PublicInfo";

const AdminSettings = () => {
  return (
    <div className="w-full xl:w-[1100px]">
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Profile">
          <ChangeUserData />
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Create Product">
          <CreateProduct />
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Edit Product">
          <EditProduct />
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title="Public Information"
        >
          <PublicInfo />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AdminSettings;
