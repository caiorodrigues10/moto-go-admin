"use client";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/context/ToastContext";
import { updateUserAdmin } from "@/services/usersAdmin/client";
import { IUserAdmin } from "@/services/usersAdmin/types";
import { phoneMask } from "@/utils/MaskProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { editAdminSchema, FormEditAdminProps } from "./types";
import { PROVIDERS } from "@/providers";
import { useRevalidatePath } from "@/utils/revalidate";

export function FormEditUserAdmin({ user }: { user: IUserAdmin }) {
  const { addToast, removeToast } = useToast();
  const { push } = useRouter();
  const { setDataCookie } = PROVIDERS.cookies();
  const { refresh } = useRevalidatePath("adminUsers");

  const { handleSubmit, setValue, control } = useForm<FormEditAdminProps>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      name: user.name,
      telephone: user.telephone,
      userName: user.user_name,
    },
  });

  const onSubmit = useCallback(
    async (data: FormEditAdminProps) => {
      const response = await updateUserAdmin({ name: data.name, userName: data.userName });

      if (response?.result === "success") {
        addToast({
          type: "success",
          message: response?.message || "Serviço indisponível tente novamente mais tarde",
          onClose: removeToast,
        });
        setDataCookie({
          cookies: {
            path: "motogo.name",
            value: data.name,
          },
        });
        setDataCookie({
          cookies: {
            path: "motogo.userName",
            value: data.userName,
          },
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
    [addToast, push, removeToast, user]
  );

  return (
    <Card className="bg-[#2B3544] w-full max-w-7xl p-6">
      <CardHeader>
        <h1 className="text-xl font-medium">Editando - {user.name}</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextInput
                  type="text"
                  placeholder="Digite o nome completo"
                  label="Nome completo"
                  value={value}
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
                  value={value}
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
                  label="Telefone"
                  placeholder="Digite o telefone"
                  isDisabled
                  value={phoneMask(value || "")}
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
            endContent={<Save size={16} />}
          >
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
