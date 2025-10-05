import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const createPacienteSchema = z.object({
    nome: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    email: z.string().email({ message: 'Formato de email inválido.' }),
    cpf: z.string().length(11, { message: 'O CPF deve ter 11 caracteres.' }),
    dataNascimento: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Data de nascimento inválida.' }),
});

export type CreatePacienteDTO = z.infer<typeof createPacienteSchema>;

export const updatePacienteSchema = createPacienteSchema.partial();
export type UpdatePacienteDTO = z.infer<typeof updatePacienteSchema>;

class PacienteService {
    async create (data: CreatePacienteDTO){
        const paciente = await prisma.paciente.create({data});
        return paciente;

        
    }
    
    async findAll() {
        const paciente = await prisma.paciente.findMany();
        return paciente;
    }

    async findOne(id:string) {
        const paciente = await prisma.paciente.findUnique({
            where: {id},

        });
        return paciente
    }

    async update (id: string, data: UpdatePacienteDTO){
        const paciente = await prisma.paciente.update({
            where: {id},
            data,
        });
        return paciente

    }

    async delete(id:string){
        await prisma.paciente.delete({
            where: {id},

        });
        
    }

}

export default new PacienteService();

