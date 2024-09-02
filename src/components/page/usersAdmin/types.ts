import { validatePassword } from "@/utils/validatePassword";
import { z } from "zod";

export const createAdminSchema = z
  .object({
    name: z.string({ message: "Nome é obrigatório" }),
    userName: z.string({ message: "Nome de usuário é obrigatório" }),
    telephone: z.string({ message: "Telefone é obrigatório" }),
    password: z
      .string({
        message: "Senha é obrigatório",
      })
      .refine(validatePassword, () => ({
        message:
          "A senha deve conter pelo menos 8 caracteres, uma maiúscula, um número e um caractere especial",
      })),
    confirmPassword: z.string({ message: "Confirmar senha é obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type FormCreateAdminProps = z.infer<typeof createAdminSchema>;

export const editAdminSchema = z.object({
  name: z.string({ message: "Nome é obrigatório" }),
  userName: z.string().optional(),
  telephone: z.string().optional(),
});

export type FormEditAdminProps = z.infer<typeof editAdminSchema>;
