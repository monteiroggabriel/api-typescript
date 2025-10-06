import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const consultaSchema = z.object({
  data: z.string().datetime(),
  medicoId: z.string().cuid(),
  pacienteId: z.string().cuid(),
});

export const getConsultas = async () => {
  return await prisma.consulta.findMany({
    include: {
      medico: true,
      paciente: true,
    },
  });
};

export const getConsultaById = async (id: string) => {
  return await prisma.consulta.findUnique({
    where: { id },
    include: {
      medico: true,
      paciente: true,
    },
  });
};

export const createConsulta = async (data: unknown) => {
  const validatedData = consultaSchema.parse(data);
  return await prisma.consulta.create({
    data: validatedData,
  });
};

export const updateConsulta = async (id: string, data: unknown) => {
  const validatedData = consultaSchema.partial().parse(data);
  return await prisma.consulta.update({
    where: { id },
    data: validatedData,
  });
};

export const deleteConsulta = async (id: string) => {
  return await prisma.consulta.delete({
    where: { id },
  });
};
