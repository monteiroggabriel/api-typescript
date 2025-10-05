import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';
import medicosRouter from './routes/medicos.routes';

const app = express();
const port = 3000;

// Middleware para interpretar o corpo da requisição como JSON
app.use(express.json());

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota principal de médicos
app.use('/medicos', medicosRouter);

// Rota de "health check" para verificar se a API está no ar
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});