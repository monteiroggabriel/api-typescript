import { z } from "zod";

export const medicoSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("Email inválido."),
  crm: z.string().min(4, "O CRM deve ter no mínimo 4 caracteres."),
  especialidade: z.string().min(3, "A especialidade deve ter no mínimo 3 caracteres."),
});

export type MedicoFormData = z.infer<typeof medicoSchema>;
