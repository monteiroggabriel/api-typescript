import { Request, Response } from 'express';
import MedicoService, { createMedicoSchema, updateMedicoSchema } from '../services/medicos.service';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

class MedicoController {
  async create(req: Request, res: Response) {
    try {
      const medicoData = createMedicoSchema.parse(req.body);
      const medico = await MedicoService.create(medicoData);
      return res.status(201).json(medico);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.flatten().fieldErrors,
        });
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(409).json({ message: 'Conflito: O email ou CRM fornecido já está em uso.' });
        }
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const medicos = await MedicoService.findAll();
      return res.status(200).json(medicos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar médicos.' });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const medico = await MedicoService.findOne(id);

      if (!medico) {
        return res.status(404).json({ message: 'Médico não encontrado.' });
      }

      return res.status(200).json(medico);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar médico.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const medicoData = updateMedicoSchema.parse(req.body);

      const medico = await MedicoService.update(id, medicoData);

      return res.status(200).json(medico);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.flatten().fieldErrors,
        });
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).json({ message: 'Médico não encontrado para atualização.' });
        }
        if (error.code === 'P2002') {
          return res.status(409).json({ message: 'Conflito: O email ou CRM fornecido já está em uso.' });
        }
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await MedicoService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).json({ message: 'Médico não encontrado para deleção.' });
        }
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new MedicoController();
