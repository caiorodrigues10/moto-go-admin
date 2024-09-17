import { z } from "zod";

export const createDriverSchema = z
  .object({
    name: z.string({ message: "Nome é obrigatório" }),
    document: z.string({ message: "Nome de usuário é obrigatório" }),
    telephone: z.string({ message: "Telefone é obrigatório" }),
  });


export type FormCreateDriverProps = z.infer<typeof createDriverSchema>;
