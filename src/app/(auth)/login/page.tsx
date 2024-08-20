"use client";
import { Button, Input, Link as LinkNextUI } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full flex h-full h-min-screen">
      <div className="w-1/3 h-full flex flex-col gap-6 p-12 pt-32 min-h-screen">
        <h1 className="text-3xl font-semibold">Login</h1>

        <Input type="email" label="Email" placeholder="Enter your email" />
        <Input
          label="Password"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <Eye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Link href={"/"} className="w-fit">
          <LinkNextUI>Esqueceu a senha?</LinkNextUI>
        </Link>
        <Button color="primary">Entrar</Button>
      </div>
      <div className="w-2/3 h-full min-h-screen"></div>
    </div>
  );
}
