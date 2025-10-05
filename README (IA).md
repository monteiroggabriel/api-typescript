# API de Clínica Médica - Projeto Faculdade

Este projeto é uma API RESTful para um sistema de agendamento de consultas em uma clínica médica, desenvolvido com TypeScript, Node.js, Express, Prisma e PostgreSQL.

---

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados na sua máquina:

- [Node.js](https://nodejs.org/) (que inclui o npm)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

---

## Guia de Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clonar o Repositório

Abra um terminal e clone o projeto do GitHub para a sua máquina.

```shell
git clone <URL_DO_REPOSITORIO_NO_GITHUB>
```

### 2. Entrar na Pasta do Projeto

Navegue para o diretório recém-criado.

```shell
cd api-typescript
```

### 3. Instalar as Dependências

Este comando irá baixar todas as bibliotecas que o projeto utiliza (Express, Prisma, Zod, etc.).

```shell
npm install
```

### 4. Configurar o Banco de Dados

- Abra seu programa de gerenciamento de banco de dados (DBeaver, pgAdmin, etc.).
- Crie um novo banco de dados vazio. Sugestão de nome: `api_clinica`.

### 5. Criar o Arquivo de Ambiente (`.env`)

- Na raiz do projeto, crie um novo arquivo chamado `.env`.
- Copie e cole a linha abaixo dentro dele, substituindo `SUA_SENHA` pela senha do seu usuário do PostgreSQL e o nome do banco de dados, se for diferente.

```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/api_clinica"
```

### 6. Rodar a Migração do Banco de Dados

Este comando usa o Prisma para criar todas as tabelas (`medicos`, `pacientes`, `consultas`) no seu banco de dados, com base no schema definido.

```shell
npx prisma migrate dev
```

---

## Como Rodar e Testar o Projeto

### 1. Iniciar o Servidor

Com tudo configurado, inicie o servidor em modo de desenvolvimento.

```shell
npm run dev
```

O terminal deverá exibir mensagens indicando que o servidor está no ar e a rota da documentação.

### 2. Acessar a Documentação da API (Swagger)

A melhor forma de conhecer e testar a API é através da documentação interativa do Swagger.

- Abra seu navegador e acesse: **http://localhost:3000/api-docs**

Nesta página, você pode ver todos os endpoints, os dados que eles esperam e os que eles retornam. Você também pode testá-los diretamente pela interface clicando no botão "Try it out".
