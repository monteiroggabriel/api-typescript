import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clínica Médica',
      version: '1.0.0',
      description: 'Documentação da API para o sistema de agendamento de consultas em uma clínica médica.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Arquivos que contêm a documentação dos endpoints
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
