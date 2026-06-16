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

## Funcionalidades

- Cadastro e autenticação de usuários
- Cadastro de livros (título, autor, páginas, gênero)
- Registro de progresso de leitura com página atual
- Status automático: quero ler → lendo → lido
- Avaliação e opinião ao concluir um livro
- Relatório em PDF com resumo das leituras
- Interface em português, inglês e espanhol

## ToDo

- Metas anuais de leitura
- Estatísticas por gênero com gráficos
