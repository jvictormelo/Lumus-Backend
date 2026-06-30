# Lumus - Backend API

## Sobre
O Lumus é uma API backend desenvolvida para gerenciamento de leitura pessoal.
O sistema permite que usuários organizem seus livros, acompanhem seu progresso
de leitura, avaliem obras concluídas e gerem relatórios personalizados.

## Objetivo
Projeto desenvolvido com foco em:

* Gerenciar o catálogo de livros do usuário
* Acompanhar o progresso de leitura página por página
* Calcular ritmo de leitura e previsão de conclusão
* Avaliar livros concluídos com nota e opinião
* Gerar relatórios em PDF com estatísticas de leitura
* Suporte a múltiplos idiomas de forma automática

## Tecnologias

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Sequelize ORM](https://sequelize.org/)
* [MySQL](https://www.mysql.com/)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [express-session](https://www.npmjs.com/package/express-session)
* [i18next](https://www.i18next.com/)
* [pdfkit](https://pdfkit.org/)
* [JSDoc](https://jsdoc.app/)

## ⚙ Funcionalidades

### 👤 Autenticação
* Cadastro de usuário com senha criptografada (bcrypt)
* Login com sessão via cookie seguro
* Logout com destruição de sessão
* Rotas privadas protegidas por middleware de autenticação

### 📖 Livros
* Cadastrar livro (título, autor, páginas, gênero, capa)
* Listar todos os livros
* Buscar livro por ID
* Atualizar livro (PUT e PATCH)
* Remover livro

### 📊 Progresso de Leitura
* Iniciar leitura de um livro
* Atualizar página atual com transição automática de status:
  * `quero_ler` → `lendo` → `lido`
* Preenchimento automático de data de início e conclusão
* Cálculo de percentual de progresso
* Cálculo de ritmo de leitura (páginas/dia)
* Projeção de data estimada de conclusão
* Avaliação com nota (1-5) e opinião ao concluir

### 📄 Relatório
* Geração de relatório em PDF com:
  * Total de livros lidos
  * Total de páginas lidas
  * Gênero favorito
  * Nota média
  * Lista completa de livros lidos com avaliações

### 🌍 Internacionalização
* Suporte a múltiplos idiomas:
  * Português (pt)
  * Inglês (en)
  * Espanhol (es)
* Detecção automática via header `Accept-Language`
* Mensagens de erro internacionalizadas

### 📝 Documentação
* Documentação completa das funções via JSDoc
* Gerada com `npm run docs` em `/docs`

## Instalação

1. Clonar o projeto:
```bash
git clone https://github.com/jvictormelo/Lumus-Backend.git
```

2. Acessar diretório:
```bash
cd Lumus-Backend
```

3. Instalar dependências:
```bash
npm install
```

4. Copiar e configurar variáveis de ambiente:
```bash
cp .env.example .env
```

5. Configurar o `.env`:

DB_HOST=localhost
DB_NAME=lumus
DB_USER=root
DB_PASS=sua_senha
SESSION_SECRET=sua_chave_secreta
PORT=3000

6. Criar o schema no MySQL:
```sql
CREATE SCHEMA lumus;
```

7. Iniciar o servidor (as tabelas são criadas automaticamente):
```bash
npm run dev
```

##  Endpoints

* `/api/users` — autenticação (register, login, logout)
* `/api/books` — gerenciamento de livros
* `/api/reading` — progresso de leitura
* `/api/reading/report/pdf` — relatório em PDF

##  Arquitetura do projeto

O projeto segue arquitetura em camadas:

* **Controllers** → controle das requisições HTTP
* **Services** → regras de negócio (cálculos, lógica de status)
* **Models** → camada de persistência com Sequelize
* **Middlewares** → autenticação e i18n
* **Locales** → arquivos de tradução (pt, en, es)

##  ToDo

* Validação de exclusão de livros com leituras vinculadas
* Notificações por email
* Testes automatizados (unitários e integração)
