"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Button } from "./ui/button";
import ProfileIcon from "./icons/Profile";
import ShoppingCartIcon from "./icons/ShoppingCart";

const links = [
  { name: "Home", link: "/" },
  { name: "Exhibition", link: "/exhibition" },
  { name: "Contacts", link: "/contacts" },
  { name: "Shop", link: "/shop" },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setActive] = useState("");
  console.log(pathname, isActive);

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
                pathname === item.link ? "text-blue-600" : ""
              }`}
              href={item.link}
              onClick={() => setActive(item.link)}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" size="icon">
            <Link href={"/cart"}>
              <ShoppingCartIcon width={25} height={25} />
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <ProfileIcon width={25} height={25} />
          </Button>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <div className="flex justify-between">
          <div>
            {links.map((item, index) => (
              <NavbarMenuItem key={`${item.name}-${index}`}>
                <Link
                  className={`w-full ${
                    pathname === item.link ? "text-blue-600" : ""
                  }`}
                  href={item.link}
                  onClick={() => setIsMenuOpen((prevState) => false)}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen((prevState) => false)}
            >
              <Link href={"/cart"}>
                <ShoppingCartIcon width={25} height={25} />
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <ProfileIcon width={25} height={25} />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
