"use client";
import { TextInput } from "@/components/TextInput";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {push} = useRouter()

  return (
    <div className="w-full flex h-full h-min-screen">
      <div className="w-1/2 h-full p-8 justify-center min-h-screen flex items-center flex-col">
        <form className="flex flex-col gap-4 max-w-[500px] w-full">
          <div className="flex gap-2 mb-6">
            <div className="w-1.5 rounded-md h-10 bg-[#FFE924]" />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <TextInput type="email" label="Email" />
          <TextInput
            label="Senha"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <Eye
                    className="text-default-400 pointer-events-none"
                    size={18}
                  />
                ) : (
                  <EyeOff
                    className="text-default-400 pointer-events-none"
                    size={18}
                  />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Link href="" className="w-fit text-xs">
            Esqueceu a senha?
          </Link>

          <Button color="primary" onClick={()=> push('/adminUsers')}>Entrar</Button>
        </form>
      </div>
      <div className="w-2/3 h-full min-h-screen bg-[#13161c] flex items-center relative">
        <Image
          src="/logo.svg"
          width={100}
          height={300}
          alt=""
          className="absolute top-8 right-8"
        />
        <div className="flex w-full justify-center py-12 flex-col items-center h-full">
          <Image
            src="/dashboard.png"
            width={300}
            height={300}
            alt=""
            className="mr-[25%]"
          />
          <Image
            src="/computer.gif"
            width={200}
            height={300}
            alt=""
            className="-mt-32 ml-[50%]"
          />
          <h1 className="text-3xl font-semibold mt-12">
            Plataforma administrativa do Moto{" "}
            <span className="text-[#FFE924]">GO</span>
          </h1>
          <h4 className="text-xl">
            Aqui você visualiza todo o registro de seu moto-táxi
          </h4>
        </div>
      </div>
    </div>
  );
}
