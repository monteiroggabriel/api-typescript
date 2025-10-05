# API de Sistema de Clínica Médica

**Tecnologias**:
- Servidor: ExpressJS
- Linguagem: TypeScript 
- Banco de Dados: PostgreSQL 
- ORM (Object-Relational Mapping): Prisma 
- Validação de Dados: Zod 
- Documentação da API: SwaggerV

---

### Parte 1: Fundação
- Configuração do Ambiente:
    - Criar repositório no GitHub.
    - Iniciar o projeto (`npm init -y`) e instalar dependências: Express, TypeScript, ts-node, nodemon,...
    - Configurar `tsconfig.json` e os scripts (build, start, dev) no `package.json`.
    - Criar a estrutra de diretórios (src, controllers, routes, services).
- Conexão com Banco de Dados:
    - Configurar o Prisma (npx prisma init).
    - Criar o arquivo `.env` com a string de conexão o PostgreSQL.
    - Definir todos os três modelos (Médicos, Pacientes, Consultas) e suas relações no arquivo `prisma/schema.prisma`.
    - Executar a primeira migração para criar as tabelas no banco (npx prisma migrate dev).
- Implementação do Resource Medicos:
    - Criar o model, as rotas (com os 5 endpoints), o controller e o service para Medicos.
    - Criar as validações com Zod para a criação e atualização de médicos.
    - Implementar a documentação completa do Swagger para todos os endpoints de Medicos.

### Parte 2: Resource Pacientes
- Implementação do Resource Pacientes:
    - Seguindo o padrão da parte 1, criar os arquivos de rotas, controller e service para Pacientes.
    - Implementar os 5 endpoints (findOne, findAll, create, update, delete).
    - Criar as validações com Zod para os dados de entrada para pacientes.
    - Adicionar a documentação Swagger para todos os endpoints de Pacientes.

### Parte 3: Resource Consultas
- Implementação do Resource Consultas:
    - Criar os arquivos de rota, controller e service para Consultas.
    - Implementar os 5 endpoints. A criação de uma consulta deverá receber o ID de um médico e de um paciente.
    - Criar as validações com Zod para os dados de entrada para consultas.
- Implementação da Relação (Requisto 3)
    - No endpoint GET (findOne e findAll) de Consultas, utilizar o { include: { ... } } do Prisma para retornar os dados completos do médico e do paciente associados àquela consulta.
    - Documentar todos os endpoints de Consultas no Swagger, detalhando como as relações funcionam.

### Final: Documentação da API e Revisão/Gravação
- Revisão e Testes: Todos devem testar os endpoints uns dos outros usando o Wagger para garantir que tudo está funcinando corretamente.
- Gravação do Vídeo: Ghabriel vulgo William Bonner. Roteiro:
    - Apresentar rapidamente o `schema.prisma` para mostrar as relações.
    - Abrir o Swagger UI no navegador.
    - Para cada resource (Medicos, Pacientes, Consultas):
        - Usar o endpoint POST para criar um novo registro.
        - Abrir a ferramenta de acesso ao banco (ex: DBeaver, pgAdmin) e mostrar o registro na tabela.
        - Usar o GET (findAll) para listar os registros.
        - Usar o GET (findOne) para buscar o registro recém-criado.
        - Demonstrar o include ao buscar uma consulta, mostrando que os dados do médico e do paciente vêm juntos.
        - Usar o PUT para atualizar o registro e mostrar a alteração no banco.
        - Usar o DELETE para apagar o registro e mostrar que ele foi removido do banco.
    - Explicar verbalmente o que está sendo feito durante a toda a demonstração.