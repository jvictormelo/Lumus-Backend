# Lumus 

Sistema web de gestão de leitura pessoal. Acompanhe seus livros, registre seu progresso e avalie suas leituras.

## Como instalar

```bash
git clone <url-do-repo>
cd Lumus-Backend
npm install
cp .env.example .env
# Preencha o .env com suas credenciais
npm run dev
```

## Funcionalidades implementadas

- Cadastro e autenticação de usuários (sessão + senha criptografada)
- CRUD completo de livros
- Registro de progresso de leitura com página atual
- Status automático: quero ler → lendo → lido
- Cálculo de ritmo de leitura (páginas/dia) e previsão de conclusão
- Avaliação (nota 1-5 e opinião) ao concluir um livro
- Rotas de leitura protegidas por autenticação
- Documentação da API gerada via JSDoc

## ToDo (não implementado)

- Frontend em React + Vite + Tailwind CSS
- Geração de relatório em PDF
- Aplicação da internacionalização nas mensagens de resposta
  da API (estrutura já configurada com i18next)
- Testes automatizados (unitários/integração)
