import { z } from "zod";

export const consultaSchema = z.object({
  medicoId: z.string().min(1, "O médico é obrigatório."),
  pacienteId: z.string().min(1, "O paciente é obrigatório."),
  data: z.string().refine((data) => !isNaN(Date.parse(data)), {
    message: "Data e hora inválidas.",
  }),
});
