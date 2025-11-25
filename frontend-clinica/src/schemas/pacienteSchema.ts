import { z } from "zod";

export const pacienteSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("Email inválido."),
  cpf: z.string().min(11, "O CPF deve ter no mínimo 11 caracteres."),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;
