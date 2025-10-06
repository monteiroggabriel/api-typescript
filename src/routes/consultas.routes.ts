import { Router } from 'express';
import {
  getAllConsultas,
  getConsulta,
  newConsulta,
  editConsulta,
  removeConsulta,
} from '../controllers/consultas.controller';

const consultasRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Consulta:
 *       type: object
 *       required:
 *         - data
 *         - medicoId
 *         - pacienteId
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente para a consulta
 *         data:
 *           type: string
 *           format: date-time
 *           description: A data e hora da consulta
 *         medicoId:
 *           type: string
 *           description: O ID do médico
 *         pacienteId:
 *           type: string
 *           description: O ID do paciente
 *       example:
 *         id: clxkz228e000008l3g2f6d4h7
 *         data: '2025-10-05T14:30:00.000Z'
 *         medicoId: 'clxkyg36h000008l3b2n2f8e5'
 *         pacienteId: 'clxkyg36h000008l3b2n2f8e6'
 *     ConsultaResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         data:
 *           type: string
 *           format: date-time
 *         medico:
 *           $ref: '#/components/schemas/Medico'
 *         paciente:
 *           $ref: '#/components/schemas/Paciente'
 *       example:
 *         id: clxkz228e000008l3g2f6d4h7
 *         data: '2025-10-05T14:30:00.000Z'
 *         medico:
 *           id: clxkyg36h000008l3b2n2f8e5
 *           nome: Dr. House
 *           email: house@example.com
 *           crm: '123456'
 *           especialidade: Infectologia
 *         paciente:
 *           id: clxkyg36h000008l3b2n2f8e6
 *           nome: John Doe
 *           email: john.doe@example.com
 *           cpf: '123.456.789-00'
 */

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: API para gerenciamento de Consultas
 */

/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Retorna a lista de todas as consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: A lista de consultas com dados do médico and paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConsultaResponse'
 */
consultasRouter.get('/', getAllConsultas);

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Cria uma nova consulta
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - medicoId
 *               - pacienteId
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *               medicoId:
 *                 type: string
 *               pacienteId:
 *                 type: string
 *             example:
 *               data: '2025-10-05T14:30:00.000Z'
 *               medicoId: 'clxkyg36h000008l3b2n2f8e5'
 *               pacienteId: 'clxkyg36h000008l3b2n2f8e6'
 *     responses:
 *       201:
 *         description: A consulta foi criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       400:
 *         description: Erro de validação
 */
consultasRouter.post('/', newConsulta);

/**
 * @swagger
 * /consultas/{id}:
 *   get:
 *     summary: Busca uma consulta pelo ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da consulta
 *     responses:
 *       200:
 *         description: Os dados da consulta com informações do médico e paciente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsultaResponse'
 *       404:
 *         description: Consulta não encontrada
 */
consultasRouter.get('/:id', getConsulta);

/**
 * @swagger
 * /consultas/{id}:
 *   put:
 *     summary: Atualiza uma consulta pelo ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *               medicoId:
 *                 type: string
 *               pacienteId:
 *                 type: string
 *             example:
 *               data: '2025-10-06T10:00:00.000Z'
 *     responses:
 *       200:
 *         description: A consulta foi atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Consulta não encontrada
 */
consultasRouter.put('/:id', editConsulta);

/**
 * @swagger
 * /consultas/{id}:
 *   delete:
 *     summary: Deleta uma consulta pelo ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da consulta
 *     responses:
 *       204:
 *         description: A consulta foi deletada com sucesso (sem conteúdo)
 *       404:
 *         description: Consulta não encontrada
 */
consultasRouter.delete('/:id', removeConsulta);

export default consultasRouter;
