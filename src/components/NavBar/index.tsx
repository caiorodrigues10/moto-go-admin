"use client";
import { PROVIDERS } from "@/providers";
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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ClientOnly } from "../ClientOnly";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resetCookies, getCookies } = PROVIDERS.cookies();
  const { userName, name, id } = getCookies();
  const { push } = useRouter();
  const path = usePathname();

  function LogOut() {
    resetCookies();
    push("/login");
  }

  const menuItems = [
    { name: "Dashboard", link: "/dashboard", action: () => {} },
    { name: "Administradores", link: "/adminUsers", action: () => {} },
    { name: "Usuários", link: "/users", action: () => {} },
    { name: "Motoristas", link: "/drivers", action: () => {} },
    // { name: "Serviços", link: "/services", action: () => {} },
    { name: "Sair", link: "/login", action: () => LogOut() },
  ] as {
    name: string;
    link: string;
    action?: () => void;
  }[];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#2B3544]"
      classNames={{
        wrapper: "max-w-7xl justify-center",
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image src="/logo.svg" width={50} height={300} alt="" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Image src="/logo.svg" width={50} height={300} alt="" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems
          .filter((f) => f.name !== "Sair")
          .map((e, i) => {
            return (
              <NavbarItem key={i}>
                <Link
                  color={path.startsWith(e.link) ? "primary" : "foreground"}
                  href={e.link}
                >
                  {e.name}
                </Link>
              </NavbarItem>
            );
          })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Popover placement="bottom" showArrow={true}>
            <ClientOnly
              fallback={
                <div className="animate-pulse bg-[#4f6282] rounded-full h-10 w-10" />
              }
            >
              <PopoverTrigger>
                <button className="flex justify-center items-center h-10 w-10 border-2 text-xs border-white rounded-full uppercase pt-0.5">
                  {userName?.slice(0, 3)}
                </button>
              </PopoverTrigger>
            </ClientOnly>
            <PopoverContent className="bg-[#1e2530]">
              <div className="px-1 py-2 flex flex-col gap-4">
                <div className="flex border border-zinc-300 rounded-md p-2 pr-6 gap-4">
                  <div className="flex justify-center items-center h-10 w-10 border-2 text-xs border-white rounded-full uppercase pt-0.5">
                    {userName?.slice(0, 3)}
                  </div>
                  <div className="flex flex-col">
                    <p>{userName}</p>
                    <p>{name}</p>
                  </div>
                </div>
                <Button
                  color="primary"
                  size="sm"
                  className="w-full"
                  radius="full"
                  variant="flat"
                  onClick={() => push("/adminUsers/" + id)}
                >
                  Editar perfil
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  className="w-full"
                  radius="full"
                  onClick={LogOut}
                >
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
              href={item.link}
              size="lg"
              onClick={item?.action}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
