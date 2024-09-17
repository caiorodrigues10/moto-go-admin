import { z } from "zod";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

export const createDriverSchema = z.object({
  name: z.string({ message: "Nome é obrigatório" }),
  document: z
    .string({ message: "CPF é obrigatório" })
    .refine((cpf) => isValidCPF(cpf), {
      message: "CPF inválido",
    }),
  telephone: z.string({ message: "Telefone é obrigatório" }),
});

export type FormCreateDriverProps = z.infer<typeof createDriverSchema>;
