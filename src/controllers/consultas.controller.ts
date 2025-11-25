import { Request, Response } from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import {
  getConsultas,
  getConsultaById,
  createConsulta,
  updateConsulta,
  deleteConsulta,
} from '../services/consultas.service';

// Esquema de validação para criar uma nova consulta
const createConsultaSchema = z.object({
  data: z.string().datetime({ message: "O campo 'data' deve ser uma data e hora válida." }),
  medicoId: z.string().cuid({ message: "O 'medicoId' deve ser um CUID válido." }),
  pacienteId: z.string().cuid({ message: "O 'pacienteId' deve ser um CUID válido." }),
});

// Esquema de validação para atualizar uma consulta (todos os campos são opcionais)
const updateConsultaSchema = createConsultaSchema.partial();

export const getAllConsultas = async (req: Request, res: Response) => {
  try {
    const consultas = await getConsultas();
    res.status(200).json(consultas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas.' });
  }
};

export const getConsulta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const consulta = await getConsultaById(id);

    if (!consulta) {
      return res.status(404).json({ message: 'Consulta não encontrada.' });
    }
    res.status(200).json(consulta);
  } catch (error) {
    // Se o ID fornecido não estiver no formato esperado (ex: CUID), o serviço pode falhar.
    // Embora o Prisma não retorne um erro P2025 aqui, tratamos o caso de não encontrar.
    res.status(500).json({ message: 'Erro ao buscar consulta.' });
  }
};

export const newConsulta = async (req: Request, res: Response) => {
  try {
    const consultaData = createConsultaSchema.parse(req.body);
    const novaConsulta = await createConsulta(consultaData);
    res.status(201).json(novaConsulta);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Erro de validação nos dados da consulta.',
        errors: error.flatten().fieldErrors,
      });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // O código P2003 indica uma falha na restrição de chave estrangeira.
      // Isso significa que o medicoId ou o pacienteId não existem.
      if (error.code === 'P2003') {
        return res.status(404).json({ message: 'Médico ou Paciente não encontrado.' });
      }
    }
    res.status(500).json({ message: 'Erro interno ao criar consulta.' });
  }
};

export const editConsulta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const consultaData = updateConsultaSchema.parse(req.body);

    const updatePayload: { data?: Date; medicoId?: string; pacienteId?: string } = {};
    if (consultaData.data) {
      updatePayload.data = new Date(consultaData.data);
    }
    if (consultaData.medicoId) {
      updatePayload.medicoId = consultaData.medicoId;
    }
    if (consultaData.pacienteId) {
      updatePayload.pacienteId = consultaData.pacienteId;
    }
    
    const consultaAtualizada = await updateConsulta(id, updatePayload);
    res.status(200).json(consultaAtualizada);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Erro de validação nos dados de atualização.',
        errors: error.flatten().fieldErrors,
      });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2025: Registro a ser atualizado não encontrado.
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Consulta não encontrada para atualização.' });
      }
      // P2003: Chave estrangeira inválida (médico ou paciente não existem).
      if (error.code === 'P2003') {
        return res.status(404).json({ message: 'Médico ou Paciente não encontrado.' });
      }
    }
    res.status(500).json({ message: 'Erro interno ao atualizar consulta.' });
  }
};

export const removeConsulta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteConsulta(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2025: Registro a ser deletado não encontrado.
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Consulta não encontrada para deleção.' });
      }
    }
    res.status(500).json({ message: 'Erro ao deletar consulta.' });
  }
};
