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
- **Knex.js** como query builder

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

## Autor
