# Documentação da API Backend

Este é o serviço backend para o projeto full-stack test, implementando uma API REST com autenticação de usuário e operações CRUD.

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeORM
- PostgreSQL
- JWT para autenticação

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL
- Docker (opcional)

## Instruções de Configuração

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` no diretório raiz com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_seu_banco
JWT_SECRET=seu_segredo_jwt
```

3. Inicie o banco de dados:
   Se estiver usando Docker:

```bash
docker-compose up -d
```

Caso contrário, certifique-se de que sua instância do PostgreSQL esteja em execução.

4. Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`

## Endpoints da API

### Status

- GET `/api/status`

  - Retorna status da API

### Autenticação

- POST `/api/auth/login`

  - Login com username e senha
  - Corpo: `{ "username": "João Silva", "password": "senha123" }`

### Usuários

- POST `/api/users`

  - Criar novo usuário
  - Corpo: `{ "username": "João Silva", "password": "senha123" }`

- GET `/api/users`

  - Listar todos os usuários
  - Requer autenticação

- GET `/api/users/:id`

  - Buscar usuário por ID
  - Requer autenticação

- PUT `/api/users`

  - Atualizar usuário
  - Requer autenticação
  - Corpo: `{ "username": "João Silva Atualizado" }`

- DELETE `/api/users`

  - Deletar usuário
  - Requer autenticação

### Rotas de Cerveja (Endpoints Protegidos)

- GET `/api/beers`
  - Obter cervejas da Punk API
  - Requer autenticação
  - Parâmetros de consulta:
    - page (default: 1)

## Autenticação

Todos os endpoints protegidos requerem um token JWT no header Authorization:

```
Authorization: Bearer <token_jwt>
```

## Scripts Disponíveis

- `npm run dev`: Iniciar servidor de desenvolvimento com recarga automática
- `npm start`: Iniciar servidor de produção
