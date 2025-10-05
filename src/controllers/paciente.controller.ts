import { Request, Response} from "express";
import PacienteService, { createPacienteSchema, updatePacienteSchema } from '../services/pacientes.service';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

class PacienteController {
    async create(req:Request, res: Response) {
        try{
            const pacienteData = createPacienteSchema.parse(req.body);
            const paciente = await PacienteService.create(pacienteData);
            return res.status(201).json(paciente);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                  message: 'Erro de validação',
                  errors: error.flatten().fieldErrors,
                });
              }  
            if (error instanceof Prisma.PrismaClientKnownRequestError) {   
                if (error.code === 'P2002') {
                    return res.status(409).json({ message: 'Conflito: O email ou CPF fornecido já está em uso.' });
                }
            }
            return res.status(500).json({ message: 'Erro interno do servidor' });
            
        

        }   
    }
    async findAll(req: Request, res: Response) {
        try {
            const pacientes = await PacienteService.findAll();
            return res.status(200).json(pacientes);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar pacientes.' });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const paciente = await PacienteService.findOne(id);
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente não encontrado.' });
            }
            return res.status(200).json(paciente);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar paciente.' });
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const pacienteData = updatePacienteSchema.parse(req.body);
            const paciente = await PacienteService.update(id, pacienteData);
            return res.status(200).json(paciente);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                  message: 'Erro de validação',
                  errors: error.flatten().fieldErrors,
                });
              }
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        return res.status(409).json({ message: 'Conflito: O email ou CPF fornecido já está em uso.' });
                    }
                }
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

    }
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await PacienteService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar paciente.' });
        }
        
    }
        




    
}

export default new PacienteController();
