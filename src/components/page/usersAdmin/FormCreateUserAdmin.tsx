"use client";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/context/ToastContext";
import { createUserAdmin } from "@/services/usersAdmin/client";
import { phoneMask } from "@/utils/MaskProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createAdminSchema, FormCreateAdminProps } from "./types";
import { useRevalidatePath } from "@/utils/revalidate";

export function FormCreateUserAdmin() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);
  const { addToast, removeToast } = useToast();
  const { handleSubmit, setValue, control } = useForm<FormCreateAdminProps>({
    resolver: zodResolver(createAdminSchema),
  });
  const { push } = useRouter();
  const { refresh } = useRevalidatePath("adminUsers");

  const onSubmit = useCallback(
    async (data: FormCreateAdminProps) => {
      const response = await createUserAdmin(data);

      if (response?.result === "success") {
        addToast({
          type: "success",
          message: response?.message || "Serviço indisponível tente novamente mais tarde",
          onClose: removeToast,
        });
        refresh();
        push("/adminUsers");
      } else {
        addToast({
          type: "error",
          message: response?.message || "Serviço indisponível tente novamente mais tarde",
          onClose: removeToast,
        });
      }
    },
    [addToast, push, removeToast, refresh]
  );

  return (
    <Card className="bg-[#2B3544] w-full max-w-7xl p-6">
      <CardHeader>
        <h1 className="text-2xl font-medium">Cadastro de usuário admin</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => {
              return (
                <TextInput
                  type="text"
                  placeholder="Digite o nome completo"
                  label="Nome completo"
                  onChange={onChange}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              );
            }}
          />

          <Controller
            name="userName"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextInput
                  type="text"
                  placeholder="Digite o nome de usuário"
                  label="Nome de usuário"
                  onChange={onChange}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              );
            }}
          />

          <Controller
            name="telephone"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextInput
                  type="text"
                  placeholder="Digite o telefone"
                  label="Telefone"
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    setValue("telephone", phoneMask(e.target.value));
                  }}
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
                  autoComplete="new-password"
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  placeholder="Digite sua senha"
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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ fieldState: { error }, field: { onChange } }) => {
              return (
                <TextInput
                  label="Confirmar senha"
                  autoComplete="new-password"
                  placeholder="Confirme sua senha"
                  onChange={onChange}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConfirm}
                    >
                      {isVisibleConfirm ? (
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
                  type={isVisibleConfirm ? "text" : "password"}
                />
              );
            }}
          />
        </CardBody>
        <CardFooter className="pb-4 flex justify-between gap-4">
          <Link href={"/adminUsers"}>
            <Button
              color="primary"
              radius="full"
              variant="bordered"
              startContent={<ArrowLeft size={16} />}
            >
              Voltar
            </Button>
          </Link>
          <Button
            color="primary"
            type="submit"
            radius="full"
            endContent={<Check size={16} />}
          >
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
