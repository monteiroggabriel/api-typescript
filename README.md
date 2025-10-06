# API de Agendamento de Consultas

API RESTful que gerencia o agendamento de consultas médicas, permitindo o cadastro e controle de pacientes, médicos e de consultas associadas.

## Tecnologias

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Zod**: Biblioteca para validação de schemas.
- **Swagger**: Para documentação e teste de endpoints.

---

## Como Começar

Basta seguir as instruções abaixo para configurar e executar o projeto no seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [NPM](https://www.npmjs.com/)
- Uma instância de banco de dados **PostgreSQL** em execução.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd api-typescript
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no exemplo abaixo, e configure a URL de conexão com seu banco de dados PostgreSQL.

    ```env
    # Exemplo de .env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

4.  **Execute as migrações do banco de dados:**
    O comando abaixo irá sincronizar o schema do Prisma com seu banco de dados, criando as tabelas necessárias.
    ```bash
    npx prisma migrate dev
    ```

### Executando a Aplicação

-   **Modo de Desenvolvimento (com auto-reload):**
    ```bash
    npm run dev
    ```

-   **Modo de Produção:**
    ```bash
    npm run build
    npm run start
    ```

A API estará disponível por padrão em `http://localhost:3000` (ou na porta configurada).

---

## Estrutura do Banco de Dados

O schema do banco de dados é gerenciado pelo Prisma e consiste em três modelos principais:

### `Paciente`

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `String` | Chave Primária | ID único do paciente. |
| `nome` | `String` | - | Nome completo do paciente. |
| `email` | `String` | Único | Endereço de e-mail do paciente. |
| `cpf` | `String` | Único | CPF do paciente. |

### `Medico`

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `String` | Chave Primária | ID único do médico. |
| `nome` | `String` | - | Nome completo do médico. |
| `email` | `String` | Único | Endereço de e-mail do médico. |
| `crm` | `String` | Único | CRM do médico (6 caracteres). |
| `especialidade`| `String` | - | Especialidade médica. |

### `Consulta`

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `String` | Chave Primária | ID único da consulta. |
| `data` | `DateTime`| - | Data e hora da consulta. |
| `pacienteId` | `String` | Chave Estrangeira | ID do paciente associado. |
| `medicoId` | `String` | Chave Estrangeira | ID do médico associado. |

---

## Endpoints da API

A API fornece endpoints para gerenciar pacientes, médicos e consultas. A documentação completa e interativa, gerada pelo Swagger, fica disponível na rota:

-   **`/api-docs`**

Abaixo está um resumo dos endpoints disponíveis.

### Pacientes (`/pacientes`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Lista todos os pacientes. |
| `GET` | `/:id` | Busca um paciente específico por ID. |
| `POST` | `/` | Cria um novo paciente. |
| `PUT` | `/:id` | Atualiza os dados de um paciente. |
| `DELETE`| `/:id` | Remove o registro de um paciente. |

### Médicos (`/medicos`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Lista todos os médicos. |
| `GET` | `/:id` | Busca um médico específico por ID. |
| `POST` | `/` | Cria um novo médico. |
| `PUT` | `/:id` | Atualiza os dados de um médico. |
| `DELETE`| `/:id` | Remove o registro de um médico. |

### Consultas (`/consultas`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Lista todas as consultas agendadas. |
| `GET` | `/:id` | Busca uma consulta específica por ID. |
| `POST` | `/` | Agenda uma nova consulta. |
| `PUT` | `/:id` | Atualiza os dados de uma consulta. |
| `DELETE`| `/:id` | Cancela (remove) uma consulta. |

---

## Estrutura de Pastas

```
.
├── prisma/
│   ├── schema.prisma      # Define os modelos do banco de dados
│   └── migrations/        # Histórico de migrações do banco
├── src/
│   ├── controllers/       # Controladores (lógica de requisição/resposta)
│   ├── lib/               # Configuração de bibliotecas (ex: Prisma Client)
│   ├── routes/            # Definição das rotas da API
│   ├── services/          # Lógica de negócio e acesso a dados
│   ├── index.ts           # Ponto de entrada da aplicação
│   └── swaggerConfig.ts   # Configuração do Swagger
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```
