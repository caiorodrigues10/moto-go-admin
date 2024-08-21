'use client'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";

export function BodyPage({ children }: PropsWithChildren) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-[#2B3544]"
        classNames={{
          wrapper: 'max-w-7xl'
        }}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
          <Image
          src="/logo.svg"
          width={70}
          height={300}
          alt=""
          className="absolute top-8 right-8"
        />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
          <Image
            src="/logo.svg"
            width={50}
            height={300}
            alt=""
          />
          </NavbarBrand>
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <button className="flex justify-center items-center h-10 w-10 border-2 text-xs border-white rounded-full">
                Adm
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-[#1e2530]">
              <div className="px-1 py-2 flex flex-col gap-4">
                <div className="flex border border-zinc-300 rounded-md p-2 gap-4">
                <div className="flex justify-center items-center h-10 w-10 border-2 text-xs border-white rounded-full">
                Adm
              </div>
            <div className="flex flex-col">
              <p>Admin</p>
              <p>admin@gmail.com</p>
            </div>
                </div>

                <Button color="danger" size="sm" className="w-full">
                  Sair
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          </NavbarItem>
          
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
        <div className="w-full h-full flex justify-center mt-40">
        {children}
      </div>
    </div>
  );
}
