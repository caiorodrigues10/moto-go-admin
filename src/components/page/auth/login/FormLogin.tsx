import { TextInput } from "@/components/TextInput";
import { Button } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginAdminProps, loginAdminSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth/client";
import { useToast } from "@/context/ToastContext";
import { PROVIDERS } from "@/providers";

export default function FormLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const { addToast, removeToast } = useToast();
  const { setCookies } = PROVIDERS.cookies();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { push } = useRouter();

  const { handleSubmit, control } = useForm<LoginAdminProps>({
    resolver: zodResolver(loginAdminSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginAdminProps) => {
      const response = await login(data);

      if (response.result === "success") {
        addToast({
          type: "success",
          message: response.message,
          onClose: removeToast,
        });
        setCookies({
          userCookies: {
            name: response.data?.user.name,
            token: response.data?.token,
            userName: response.data?.user.userName,
          },
        });
        push("/adminUsers");
      } else {
        addToast({
          type: "error",
          message: response.message,
          onClose: removeToast,
        });
      }
    },
    [addToast, push, removeToast]
  );

  return (
    <form
      className="flex flex-col gap-4 max-w-[500px] w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 mb-6 items-center">
        <div className="w-1.5 rounded-md h-10 bg-[#FFE924]" />
        <h1 className="text-3xl font-semibold">Login</h1>
      </div>
      <Controller
        name="userName"
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              type="text"
              label="Nome de usuário"
              onChange={onChange}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({ fieldState: { error }, field: { onChange } }) => {
          return (
            <TextInput
              label="Senha"
              onChange={onChange}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
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
          );
        }}
      />
      <Link href="" className="w-fit text-xs">
        Esqueceu a senha?
      </Link>

      <Button type="submit" color="primary" radius="full">
        Entrar
      </Button>
    </form>
  );
}
