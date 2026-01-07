# 🌐 Projeto PUCRS - Cadastro e Busca de ONGs

## 📑 Sumário
- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Banco de Dados](#banco-de-dados)
- [Validação e Sanitização de Dados](#validação-e-sanitização-de-dados)
  - [Validação](#validação)
  - [Sanitização](#sanitização)
- [Estrutura do Projeto](#estrutura-do-projeto)


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
- [DOMPurify](https://dompurify.com/) - 

---

## Funcionalidades
- Cadastro de usuários responsáveis por ONGs.
- Cadastro de ONGs com informações principais.
- Associação de uma ONG a um ou mais dados complementares:
  - Endereço
  - Imagens
  - Redes sociais
- Listagem e busca de ONGs por critérios como nome, categoria e localização.
- Integração com o frontend por meio de endpoints REST.

---

## Banco de Dados
O banco de dados foi modelado para refletir o relacionamento entre usuários e ONGs.
- A tabela `users` armazena os usuários responsáveis pelo cadastro.
- A tabela `ongs` armazena as informações principais das ONGs.
- Cada ONG pode possuir informações adicionais armazenadas em tabelas específicas:
  - `addressOng`
  - `imageOngs`
  - `socialMediaOng`
---

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

---


## Validação e Sanitização de Dados
### Validação

O backend possui funções utilitárias para validação dos dados recebidos, garantindo integridade e consistência antes do processamento ou armazenamento.

As validações incluem:
- Verificação de campos obrigatórios (existsOrError)
- Comparação de valores (equalsOrError, notEqualsOrError)
- Validação de formato de e-mail (isEmailOrError)
- Regras de segurança para senhas (passwordContainsCharacOrError):
  - Mínimo de 8 caracteres
  - Letras maiúsculas e minúsculas
  - Números
  - Caracteres especiais

### Sanitização

Todos os campos do tipo string recebidos pela API passam por um processo de sanitização utilizando o DOMPurify, removendo scripts e códigos maliciosos. Também é aplicado trim() para eliminar espaços em branco desnecessários.

---

## Estrutura do Projeto
[Projeto Back-end](https://github.com/MateusBU/site-ongs-backend)
```bash
├── backend/         # Código do servidor Node.js/Express
   ├── migrations/  # Arquivos de migração do Knex
   ├── index.js     # Arquivo principal do backend
   ├── package.json
   └── README.md
```
