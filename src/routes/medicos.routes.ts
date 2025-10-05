import { Router } from 'express';
import medicoController from '../controllers/medicos.controller';

const medicosRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Medico:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - crm
 *         - especialidade
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente para o médico
 *         nome:
 *           type: string
 *           description: O nome do médico
 *         email:
 *           type: string
 *           description: O email do médico (deve ser único)
 *         crm:
 *           type: string
 *           description: O CRM do médico (deve ser único e ter 6 caracteres)
 *         especialidade:
 *           type: string
 *           description: A especialidade do médico
 *       example:
 *         id: clxkz228e000008l3g2f6d4h7
 *         nome: Dr. House
 *         email: house@example.com
 *         crm: '123456'
 *         especialidade: Infectologia
 */

/**
 * @swagger
 * tags:
 *   name: Medicos
 *   description: API para gerenciamento de Médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Retorna a lista de todos os médicos
 *     tags: [Medicos]
 *     responses:
 *       200:
 *         description: A lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medico'
 */
medicosRouter.get('/', medicoController.findAll);

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Cria um novo médico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medico'
 *           example:
 *             nome: Dr. House
 *             email: house@example.com
 *             crm: '123456'
 *             especialidade: Infectologia
 *     responses:
 *       201:
 *         description: O médico foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       400:
 *         description: Erro de validação
 *       409:
 *         description: Conflito, email ou CRM já existe
 */
medicosRouter.post('/', medicoController.create);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Busca um médico pelo ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do médico
 *     responses:
 *       200:
 *         description: Os dados do médico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       404:
 *         description: Médico não encontrado
 */
medicosRouter.get('/:id', medicoController.findOne);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Atualiza um médico pelo ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medico'
 *           example:
 *             especialidade: Cirurgia Geral
 *     responses:
 *       200:
 *         description: O médico foi atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Médico não encontrado
 *       409:
 *         description: Conflito, email ou CRM já existe
 */
medicosRouter.put('/:id', medicoController.update);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Deleta um médico pelo ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do médico
 *     responses:
 *       204:
 *         description: O médico foi deletado com sucesso (sem conteúdo)
 *       404:
 *         description: Médico não encontrado
 */
medicosRouter.delete('/:id', medicoController.delete);

export default medicosRouter;