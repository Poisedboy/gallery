"use client";
import Link from "next/link";
import { ModeToggle } from "./toggle-theme";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";

const links = [
  { name: "Home", link: "/" },
  { name: "Exhibition", link: "/exhibition" },
  { name: "Contacts", link: "/contacts" },
  { name: "Shop", link: "/shop" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setActive] = useState("");

  return (
    <Navbar
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="px-4"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>Effulgenzy</NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link
              className={`w-full ${
                isActive === item.name ? "text-blue-600" : ""
              }`}
              href={item.link}
              onClick={() => setActive(item.name)}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex items-center gap-3">
          <ModeToggle />
          <p>today: 10am - 6pm</p>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {links.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link className="w-full" href={item.link}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <ModeToggle />
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
