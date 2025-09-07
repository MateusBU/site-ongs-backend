# 🌐 Projeto PUCRS - Cadastro e Busca de ONGs

## 📑 Sumário
- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autor](#autor)

<br>

## Descrição
Este projeto foi desenvolvido como parte da **Pós-Graduação em Desenvolvimento Full-Stack na PUCRS**.  
O objetivo é criar um site onde usuários possam **cadastrar ONGs** e **procurar por organizações** de acordo com seus interesses.  

A aplicação é **full-stack**, utilizando:
- **Frontend** em Vue.js  
- **Backend** em Node.js com Express  
- **Banco de Dados** PostgreSQL  
- **Knex.js** serve para escrever consultas SQL (SELECT, INSERT, UPDATE, DELETE) usando JavaScript

---

## Tecnologias Utilizadas
- [Vue.js](https://vuejs.org/) – Frontend
- [Node.js](https://nodejs.org/) – Backend
- [Express](https://expressjs.com/) – Framework backend
- [Knex.js](https://knexjs.org/) – Query builder
- [PostgreSQL](https://www.postgresql.org/) – Banco de dados relacional

---

## Funcionalidades
- Cadastro de ONGs com informações relevantes (nome, área de atuação, contato, etc.).
- Busca de ONGs por nome, categoria ou localização.
- Listagem das ONGs cadastradas.
- API REST para integração entre frontend e backend.

---

## Estrutura do Projeto
```bash
meu-projeto/
├── backend/         # Código do servidor Node.js/Express
│   ├── migrations/  # Arquivos de migração do Knex
│   ├── index.js     # Arquivo principal do backend
│   └── package.json
├── frontend/        # Código do Vue.js
│   ├── src/         
│   └── package.json
└── README.md
```

## Banco de Dados
O projeto contém um banco de dados que armazena informações relacionadas a usuários e ONGs.

Os usuários que desejam cadastrar uma ONG são armazenados na tabela `users`. Cada usuário pode cadastrar uma ou mais ONGs, que são registradas na tabela `ongs`.

As demais tabelas (`addressOng`, `imageOngs`, `socialMediaOng`) contêm dados complementares vinculados a cada ONG, como endereço, imagens e redes sociais

                    Lista de de tabelas
    Esquema |         Nome         |  Tipo  |   Dono
    --------+----------------------+--------+----------
    public  | addressOng           | tabela | postgres
    public  | imageOngs            | tabela | postgres
    public  | knex_migrations      | tabela | postgres
    public  | knex_migrations_lock | tabela | postgres
    public  | ongs                 | tabela | postgres
    public  | socialMediaOng       | tabela | postgres
    public  | users                | tabela | postgres

### Validação dos Dados
Este projeto inclui funções utilitárias para garantir que os dados recebidos dos usuários estejam corretos e seguros antes de serem processados ou armazenados.

#### Funções de Validação
As funções de validação cobrem:
- Verificação de campos obrigatórios (existsOrError)
- Comparação de valores (equalsOrError, notEqualsOrError)
- Validação de formato de e-mail (isEmailOrError)
- Regras de complexidade para senhas (passwordContainsCharacOrError), incluindo:
  - Mínimo de 8 caracteres
  - Presença de letras maiúsculas e minúsculas
  - Números e caracteres especiais

### Satinização dos Dados
Usamos `DOMPurify` para sanitizar todos os campos do tipo string em objetos recebidos, removendo scripts e códigos maliciosos, além de aplicar trim() para limpar espaços em branco.
## Autor
