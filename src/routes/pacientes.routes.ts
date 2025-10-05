import { Router } from 'express';
import pacienteController from '../controllers/paciente.controller';

const pacientesRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - cpf
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente para o paciente
 *         nome:
 *           type: string
 *           description: O nome do paciente
 *         email:
 *           type: string
 *           description: O email do paciente (deve ser único)
 *         cpf:
 *           type: string
 *           description: O CPF do paciente (deve ser único)
 *         telefone:
 *           type: string
 *           description: O telefone do paciente
 *       example:
 *         id: clxkz228e000008l3g2f6d4h7
 *         nome: João da Silva
 *         email: joao.silva@example.com
 *         cpf: '12345678901'
 *         telefone: '11987654321'
 */

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: API para gerenciamento de Pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Retorna a lista de todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: A lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
pacientesRouter.get('/', pacienteController.findAll);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *           example:
 *             nome: João da Silva
 *             email: joao.silva@example.com
 *             cpf: '12345678901'
 *             telefone: '11987654321'
 *     responses:
 *       201:
 *         description: O paciente foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Erro de validação
 *       409:
 *         description: Conflito, email ou CPF já existe
 */
pacientesRouter.post('/', pacienteController.create);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Busca um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do paciente
 *     responses:
 *       200:
 *         description: Os dados do paciente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 */
pacientesRouter.get('/:id', pacienteController.findOne);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualiza um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *           example:
 *             telefone: '11912345678'
 *     responses:
 *       200:
 *         description: O paciente foi atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Paciente não encontrado
 *       409:
 *         description: Conflito, email ou CPF já existe
 */
pacientesRouter.put('/:id', pacienteController.update);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Deleta um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do paciente
 *     responses:
 *       204:
 *         description: O paciente foi deletado com sucesso (sem conteúdo)
 *       404:
 *         description: Paciente não encontrado
 */
pacientesRouter.delete('/:id', pacienteController.delete);

export default pacientesRouter;