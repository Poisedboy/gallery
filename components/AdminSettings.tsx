"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import CreateProduct from "./CreateProduct";

const AdminSettings = () => {
  return (
    <div className="w-full">
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Security">
          Security
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Create Product">
          <CreateProduct />
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Features">
          Features
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AdminSettings;
