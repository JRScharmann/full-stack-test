# Catálogo de Cervejas - Aplicação Full Stack

Esta é uma aplicação full stack de um catálogo de cervejas com sistema de autenticação. A aplicação permite que usuários visualizem uma lista de cervejas após fazer login, com uma interface responsiva e moderna.

## Inicializando a Aplicação para Desenvolvimento

Inicializando o Banco de Dados
```sh
docker compose up db -d
```

Inicialize o Frontend

```sh
cd frontend && npm install && npm start
```

Aplicação rodando no http://localhost:3000

Inicialize o Backend

```sh
cd backend && npm install && npm run dev
```

Aplicação rodando no http://localhost:3001/api/status

### Inicializando a aplicação com Docker

```sh
docker compose up --build
```

## Visão Geral

### Frontend

O frontend é uma aplicação React moderna com Material-UI que oferece:

- Interface responsiva e amigável
- Sistema de autenticação completo
- Catálogo de cervejas com cards informativos
- Página 404 personalizada
- Feedback visual para todas as ações

Para mais detalhes sobre o frontend, incluindo scripts disponíveis e configurações, consulte o [README do Frontend](./frontend/README.md).

### Backend

O backend é uma API REST em Node.js que fornece um sistema completo de autenticação e endpoints protegidos para o catálogo de cervejas.

Para documentação completa, incluindo:

- Lista detalhada de tecnologias utilizadas
- Documentação completa dos endpoints da API
- Instruções de configuração e execução

Consulte o [README do Backend](./backend/README.md).

:warning: O Frontend está sendo servido pelo Backend após o build para simplificar a aplicação, em produção outras opções podem ser utilizadas

### Catálogo de Cervejas

- Listagem paginada de cervejas
- Exibição de detalhes como:
  - Nome da cerveja
  - Imagem
  - Teor alcoólico (ABV)
  - Descrição
  - Tagline
- Cards responsivos com layout adaptável
- Tooltip para nomes longos e descrições completas

### Interface

- Design responsivo para diferentes tamanhos de tela
- Página 404 personalizada para rotas não encontradas
- Barra de navegação com estado de autenticação
- Feedback visual para carregamento e erros
- Grid centralizado com cards de tamanho uniforme

## Estrutura do Projeto

```
/
├── backend/
│   └── src/
│       ├── entity/         # Entidades do TypeORM
│       ├── routes/         # Rotas da API
│       ├── data-source.js  # Configuração do banco de dados
│       ├── middleware.js   # Middlewares da aplicação
│       └── index.js        # Entrada da aplicação
│
└── frontend/
    ├── public/
    └── src/
        ├── components/     # Componentes React
        ├── contexts/       # Contextos globais
        ├── services/       # Serviços e APIs
        └── App.js          # Componente principal
```
