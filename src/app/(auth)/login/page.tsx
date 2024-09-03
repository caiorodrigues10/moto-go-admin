import Continue from "@/components/page/auth/login/Continue";
import FormLogin from "@/components/page/auth/login/FormLogin";
import { isValidAuth } from "@/utils/isValidAuth";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function LoginPage() {
  const token = cookies().get("motogo.token")?.value;
  const name = cookies().get("motogo.name")?.value;
  const isValid = await isValidAuth(token || "");

  return (
    <div className="w-full flex h-full h-min-screen">
      <div className="w-1/2 h-full p-8 justify-center min-h-screen flex items-center flex-col">
        {isValid ? <Continue name={name || ""} /> : <FormLogin />}
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
