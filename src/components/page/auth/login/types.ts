import { z } from "zod";

export const loginAdminSchema = z.object({
  userName: z.string({ message: "Nome de usuário é obrigatório" }).min(1, "Nome de usuário é obrigatório" ),
  password: z.string({
    message: "Senha é obrigatório",
  }).min(1, "Senha é obrigatório" ),
});

export type LoginAdminProps = z.infer<typeof loginAdminSchema>;
