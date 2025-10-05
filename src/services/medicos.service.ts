import { prisma } from '../lib/prisma';
import { z } from 'zod';

// Schema de validação para a criação de um médico
export const createMedicoSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Formato de email inválido.' }),
  crm: z.string().length(6, { message: 'O CRM deve ter 6 caracteres.' }),
  especialidade: z.string().min(1, { message: 'A especialidade é obrigatória.' }),
});
export type CreateMedicoDTO = z.infer<typeof createMedicoSchema>;

// Schema para atualização (todos os campos são opcionais)
export const updateMedicoSchema = createMedicoSchema.partial();
export type UpdateMedicoDTO = z.infer<typeof updateMedicoSchema>;

class MedicoService {
  async create(data: CreateMedicoDTO) {
    const medico = await prisma.medico.create({ data });
    return medico;
  }

  async findAll() {
    const medicos = await prisma.medico.findMany();
    return medicos;
  }

  async findOne(id: string) {
    const medico = await prisma.medico.findUnique({
      where: { id },
    });
    return medico;
  }

  async update(id: string, data: UpdateMedicoDTO) {
    const medico = await prisma.medico.update({
      where: { id },
      data,
    });
    return medico;
  }

  async delete(id: string) {
    await prisma.medico.delete({
      where: { id },
    });
  }
}

export default new MedicoService();