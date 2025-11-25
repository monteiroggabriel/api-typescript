# Frontend (LEMBRAR DE APAGAR AQUI DEPOIS)

```
Mensagem do professor no BB:

Envie aqui o link do frontend na plataforma em que foi deployado e o link do repositório público do github - garanta que está acessível pois, caso contrário, não conseguirei avaliar o projeto. Requisitos:
- Frontend, Backend e Banco de dados rodando na nuvem (deployados)
- Frontend e Backend escritos em Typescript
- Front e back integrados utilizando a biblioteca axios
- Conexão com Banco de dados utilizando Prisma
- Validação de dados no front e back com Zod
- Telas para realizar o CRUD
- Funcionalidades extras além do CRUD
```

**Tecnologias:**
-   **Framework:** React com TypeScript (usando Vite para setup)
-   **Comunicação com API:** Axios
-   **Validação de Dados:** Zod
-   **Estilização:** Sugestão: Material-UI (MUI) para componentes prontos e estilização rápida.
-   **Roteamento:** React Router DOM

## Setup Inicial

Antes de ir pras tarefas, configurar o ambiente base:

1.  **Inicializar o Projeto:**
    ```bash
    # Cria um novo projeto React com TypeScript usando Vite
    npm create vite@latest frontend-clinica -- --template react-ts
    cd frontend-clinica
    ```

2.  **Instalar Dependências:**
    ```bash
    # Dependências principais
    npm install axios react-router-dom zod

    # Sugestão: Material-UI para acelerar o desenvolvimento da UI
    npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
    ```

3.  **Estrutura de Pastas (Qualquer coisa a gente muda):**
    ```
    src/
    ├── components/   # Componentes reutilizáveis (Tabelas, Modais, Inputs)
    ├── pages/        # Telas principais da aplicação (Home, Medicos, Pacientes, Consultas)
    ├── services/     # Configuração e chamadas da API (Axios)
    ├── schemas/      # Esquemas de validação do Zod
    ├── hooks/        # Hooks customizados (ex: useApi)
    └── App.tsx       # Configuração das rotas
    ```

4.  **Configurar Axios (em `src/services/api.ts`):**
    Criar um arquivo para a instância base do Axios. Isso centraliza a URL da API.
    ```typescript
    import axios from 'axios';

    export const api = axios.create({
      // A URL base do seu backend deployado
      baseURL: 'https://sua-api-na-nuvem.com',
    });
    ```

## Divisão de Tarefas

**Parte 1 > Entidades Principais e Dashboard**

Responsável pela gestão de médicos e pacientes, que possuem uma lógica de CRUD muito similar, e pela criação de uma página inicial com informações gerais. Tarefas:

1. CRUD Completo de Médicos (`/medicos`):
    - Listagem: Criar uma tela que exibe todos os médicos em uma tabela.
    - Criação/Edição: Desenvolver um formulário (pode ser em um modal ou outra página) para criar e editar médicos, usando Zod para validar os campos.
    - Deleção: Implementar a funcionalidade de remover um médico, incluindo uma caixa de diálogo de confirmação.

2. CRUD Completo de Pacientes (`/pacientes`):
    - Seguir a mesma estrutura do CRUD de Médicos, reaproveitando componentes como a tabela e o formulário.

3. Funcionalidade Extra: Dashboard (`/`):
    - Criar a página inicial da aplicação.
    - Nesta página, exibir cards com estatísticas simples obtidas da API, como:
        - Número total de médicos cadastrados.
        - Número total de pacientes.
        - Número de consultas agendadas para o dia/semana (se a API permitir essa consulta).

**Parte 2 > Agendamentos e Funcionalidades Avançadas**

Responsável pela funcionalidade mais complexa de agendamento de consultas (que depende das outras entidades) e por adicionar melhorias de usabilidade, tipo filtros. Tarefas:

1. CRUD Completo de Consultas (`/consultas`):
    - Listagem: Exibir todas as consultas em uma tabela, mostrando o nome do médico e do paciente (em vez de apenas os IDs).
    - Criação/Edição: Criar um formulário para agendar ou editar uma consulta. Este formulário deve ter:
        - Campos de seleção (`<select>`) para escolher um Médico e um Paciente a partir de listas carregadas da API.
        - Um seletor de data e hora.
        - Validação com Zod para garantir que todos os campos foram preenchidos corretamente.
    - Deleção: Implementar a remoção (cancelamento) de uma consulta.

2. Funcionalidade Extra: Filtro e Busca:
    - Adicionar uma barra de busca ou campos de filtro nas telas de listagem de Médicos, Pacientes e Consultas.
    - Exemplos:
        - Buscar médico por nome ou especialidade.
        - Filtrar consultas por um período de data.

## Deploy e Outros Pontos

- Git: Melhor usar branches, Ex: `feat/crud-medicos`, `feat/filtro-consultas`. E o pull da `main` com frequência para evitar conflitos.
- Componentes: Criar componentes genéricos mesmo, por exemplo a tabela e o modal de confirmação podem ser reutilizados em todos os CRUDs.
- Deploy: Fazer o deploy do frontend em alguma plataforma (Vercel ou Netlify). Lembrar também de configurar as "Environment Variables" no painel da plataforma para adicionar a `VITE_API_URL` do backend.