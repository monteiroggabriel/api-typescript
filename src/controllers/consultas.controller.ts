import { Request, Response } from 'express';
import {
  getConsultas,
  getConsultaById,
  createConsulta,
  updateConsulta,
  deleteConsulta,
} from '../services/consultas.service';

export const getAllConsultas = async (req: Request, res: Response) => {
  try {
    const consultas = await getConsultas();
    res.status(200).json(consultas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas', error });
  }
};

export const getConsulta = async (req: Request, res: Response) => {
  try {
    const consulta = await getConsultaById(req.params.id);
    if (!consulta) {
      return res.status(404).json({ message: 'Consulta não encontrada' });
    }
    res.status(200).json(consulta);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consulta', error });
  }
};

export const newConsulta = async (req: Request, res: Response) => {
  try {
    const novaConsulta = await createConsulta(req.body);
    res.status(201).json(novaConsulta);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos para criação de consulta', error });
  }
};

export const editConsulta = async (req: Request, res: Response) => {
  try {
    const consultaAtualizada = await updateConsulta(req.params.id, req.body);
    if (!consultaAtualizada) {
      return res.status(404).json({ message: 'Consulta não encontrada para atualização' });
    }
    res.status(200).json(consultaAtualizada);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos para atualização de consulta', error });
  }
};

export const removeConsulta = async (req: Request, res: Response) => {
  try {
    await deleteConsulta(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar consulta', error });
  }
};
