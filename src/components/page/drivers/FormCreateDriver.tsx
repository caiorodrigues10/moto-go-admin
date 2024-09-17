"use client";
import { DropZone } from "@/components/DropZone";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/context/ToastContext";
import { createDriver } from "@/services/drivers/client";
import { ICreateDriver } from "@/services/drivers/types";
import { cpfMask, phoneMask } from "@/utils/MaskProvider";
import { useRevalidatePath } from "@/utils/revalidate";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createDriverSchema, FormCreateDriverProps } from "./types";

export function FormCreateDriver() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast, removeToast} = useToast()
  const [photo, setPhoto] = useState('')

  const { push } = useRouter();
  const { refresh } = useRevalidatePath("/drivers");

  const onSubmit = useCallback(
    async (data: FormCreateDriverProps) => {
      setIsLoading(true)
      const newData = {
        ...data,
        profile_picture: photo?.replace(/^data:.*;base64,/, ""),
      } as ICreateDriver


      const response = await createDriver(newData);

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
      setIsLoading(false)
    },
    [addToast, push, removeToast, refresh, photo]
  );

 
  const { handleSubmit, setValue, control } = useForm<FormCreateDriverProps>({
    resolver: zodResolver(createDriverSchema),
  });

  return (
    <Card className="bg-[#2B3544] w-full max-w-7xl p-6">
      <CardHeader>
        <h1 className="text-2xl font-medium">Cadastro de usuário admin</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-row gap-24">
            <DropZone photo={photo} setPhoto={setPhoto} className="!w-fit" />
            <div className="flex flex-col gap-4 w-full">
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
            name="document"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextInput
                  type="text"
                  placeholder="Digite o documento"
                  label="Documento"
                  onChange={(e) => {
                    onChange(e)
                    setValue('document', cpfMask(e.target.value))
                  }}
                  value={value}
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
          </div>
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
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
